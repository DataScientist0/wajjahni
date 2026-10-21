"""
Wajjahni: rebuild the nearest services and the hotels around every place, in Python,
with exactly the same logic as the MySQL files (so you don't need to run Workbench after
changing a place's coordinates):
    sql/03_clean_services.sql   → which services are valid (is_valid)
    sql/04_nearest_services.sql → the 3 nearest of each service type for each place
    sql/06_clean_hotels.sql     → which hotels are valid
    sql/07_hotels_near_places.sql → hotels within 30 km (at least the 10 nearest, at most 1,000)

Inputs:  data/clean/places.csv, data/raw/services_overture.csv, data/raw/hotels_overture.csv
Outputs: data/clean/nearest_services.csv → services.js
         data/clean/place_hotels.csv     → hotels.js

How to run (from the wajjahni folder):
    python3 scripts/rebuild_nearby.py                  # rebuild everything
    python3 scripts/rebuild_nearby.py --places 1,49    # rebuild only these place_ids, keep the rest as they are
    python3 scripts/rebuild_nearby.py --check          # only compare with the current files, change nothing
"""
import csv, json, math, re, sys

check_only = "--check" in sys.argv
only = set(sys.argv[sys.argv.index("--places") + 1].split(",")) if "--places" in sys.argv else None

# MySQL's ST_Distance_Sphere uses a sphere with this radius (meters)
EARTH_M = 6370986


def distance_m(lat1, lon1, lat2, lon2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    a = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(math.radians(lon2 - lon1) / 2) ** 2
    return 2 * EARTH_M * math.asin(math.sqrt(a))


# ---- Cleaning rules (copied from the SQL files; MySQL REGEXP ignores upper/lower case) ----
SERVICE_OK = {
    "pharmacy": r"صيدل|pharm|دواء|nahdi|نهدي|نهدى|whites|وايتس|boots|drug|chemist",
    "fuel": r"محط|بنزين|وقود|fuel|gas|petrol|station|ساسكو|sasco|دريس|drees|نفط|أرامكو|aramco|نفل|naft|shell|adnoc|ادنوك|enoc|اينوك|sahel|ساهل|سهل|total|توتال|oomco|اورانج",
    "bank": r"بنك|مصرف|bank|صراف|atm|الراجحي|rajhi|الأهلي|الاهلي|snb|ncb|alinma|الإنماء|الانماء|البلاد|bilad|riyad|ساب|sabb|الجزيرة|jazira|anb|العربي|fransi|الفرنسي|bsf|nbd|stc pay|urpay|samba|سامبا|enjaz|انجاز|إنجاز|western union|ويسترن|tahweel|تحويل|express|exchange|صرافة|telemoney",
}
HOTEL_BOOKING = r"حجوزات|حجز|اسعار|أسعار|معتمرين|تنظيم|رحلات|لإدارة|تسويق|management|holding"
HOTEL_NOT_HOTEL = (r"travel|tours|turizm|سياحة|مكتب|office|company|شركة|factory|مصنع|commercial port|ميناء|compound|"
                   r"district|حي |street|شارع|^[A-Z0-9]{4}\+|accommodation|accomodation|سكن عمال|labor|labour|for oud|"
                   r"divers|غوص|مطعم|restaurant|cafe|كافيه|صيدل|pharm|hospital|مستشفى|clinic|عياد|school|مدرس|salon|"
                   r"صالون|اللهم|المملكه|السعوديه|brgy|saudi arabia|\bksa\b|/")
HOTEL_WORDS = (r"hotel|فندق|فنادق|inn\b|resort|منتجع|suite|سويت|أجنحة|اجنحة|residence|boudl|بودل|استراحة|شاليه|"
               r"chalet|@home|tulip|ibis|tower|ابراج|أبراج")
has = lambda pattern, text: re.search(pattern, text or "", re.IGNORECASE) is not None


def service_valid(s):
    rule = SERVICE_OK.get(s["service_type"])
    return rule is None or has(rule, s["name"])


def hotel_valid(h):
    if h["confidence"] and float(h["confidence"]) < 0.4:
        return False
    if has(HOTEL_BOOKING, h["name"]):
        return False
    if has(HOTEL_NOT_HOTEL, h["name"]) and not has(HOTEL_WORDS, h["name"]):
        return False
    return True


read = lambda path: list(csv.DictReader(open(path, encoding="utf8")))
places = read("data/clean/places.csv")
services = [s for s in read("data/raw/services_overture.csv") if service_valid(s)]
hotels = [h for h in read("data/raw/hotels_overture.csv") if hotel_valid(h)]
for rows in (places, services, hotels):
    for r in rows:
        r["lat"], r["lon"] = float(r["latitude"]), float(r["longitude"])


def near(p, rows):
    """Rows inside the 2-degree box around the place (same as the SQL JOIN), with their distance, nearest first."""
    out = [(distance_m(p["lat"], p["lon"], r["lat"], r["lon"]), r) for r in rows
           if abs(r["lat"] - p["lat"]) < 2 and abs(r["lon"] - p["lon"]) < 2]
    return sorted(out, key=lambda x: x[0])


# ---- Nearest services (sql/04): the 3 nearest of each type ----
service_rows = []
for p in places:
    for stype in sorted({s["service_type"] for s in services}):
        for rank, (d, s) in enumerate(near(p, [s for s in services if s["service_type"] == stype])[:3], start=1):
            service_rows.append({"place_id": p["place_id"], "place_name": p["place_name"], "service_type": stype,
                                 "service_name": s["name"], "latitude": s["latitude"], "longitude": s["longitude"],
                                 "distance_km": round(d / 1000, 1), "rank_num": rank})

# ---- Hotels around each place (sql/07) ----
hotel_rows = []
for p in places:
    for rank, (d, h) in enumerate(near(p, hotels), start=1):
        if rank > 1000 or (d > 30000 and rank > 10):
            break
        hotel_rows.append({"place_id": p["place_id"], "place_name": p["place_name"], "hotel_id": h["id"],
                           "hotel_name": h["name"], "category": h["category"], "latitude": h["latitude"],
                           "longitude": h["longitude"], "distance_km": round(d / 1000, 1), "rank_num": rank})


# ---- Compare with the current files: which places changed? ----
def by_place(rows, key):
    out = {}
    for r in rows:
        out.setdefault(str(r["place_id"]), []).append(key(r))
    return out


old_s = by_place(read("data/clean/nearest_services.csv"), lambda r: (r["service_type"], r["service_name"]))
new_s = by_place(service_rows, lambda r: (r["service_type"], r["service_name"]))
old_h = by_place(read("data/clean/place_hotels.csv"), lambda r: r["hotel_id"])
new_h = by_place(hotel_rows, lambda r: r["hotel_id"])
changed_s = [pid for pid in new_s if sorted(new_s[pid]) != sorted(old_s.get(pid, []))]
changed_h = [pid for pid in new_h if set(new_h[pid]) != set(old_h.get(pid, []))]
print(f"Services: {len(service_rows)} rows, {len(changed_s)} places different from the current file: {changed_s}")
print(f"Hotels:   {len(hotel_rows)} rows, {len(changed_h)} places different from the current file: {changed_h}")
if check_only:
    sys.exit()

# ---- Write the CSV files ----
# With --places, the lines of every other place are kept exactly as they are (ties at the same distance
# can come out in a different order, so this avoids changing places that didn't move)
def write_csv(path, rows):
    import io
    def lines_of(rs):
        buf = io.StringIO()
        csv.DictWriter(buf, fieldnames=list(rows[0]), lineterminator="\n").writerows(rs)
        return buf.getvalue().splitlines()
    header = ",".join(rows[0])
    if only:
        old = open(path, encoding="utf8").read().splitlines()
        header, body = old[0], old[1:]
        out, done = [], set()
        for line in body:
            pid = line.split(",", 1)[0]
            if pid not in only:
                out.append(line)
            elif pid not in done:            # put the new rows where the old ones were
                out += lines_of([r for r in rows if str(r["place_id"]) == pid])
                done.add(pid)
        body = out
    else:
        body = lines_of(rows)
    open(path, "w", encoding="utf8").write("\n".join([header] + body) + "\n")


write_csv("data/clean/nearest_services.csv", service_rows)
write_csv("data/clean/place_hotels.csv", hotel_rows)
# The website files are built from the CSV files as saved
service_rows, hotel_rows = read("data/clean/nearest_services.csv"), read("data/clean/place_hotels.csv")
for r in service_rows + hotel_rows:
    r["distance_km"] = float(r["distance_km"])

nearby = {}
for r in service_rows:
    nearby.setdefault(str(r["place_id"]), {}).setdefault(r["service_type"], []).append(
        {"n": r["service_name"], "lat": round(float(r["latitude"]), 6), "lon": round(float(r["longitude"]), 6), "km": r["distance_km"]})
open("services.js", "w", encoding="utf8").write(
    "// Nearest services for each tourist place (key = place_id = position in DATA + 1).\n"
    "// Built from data/clean/nearest_services.csv, which comes from the SQL query in sql/04_nearest_services.sql.\n"
    f"const NEARBY = {json.dumps(nearby, ensure_ascii=False, separators=(',', ':'))};\n")

hotel_index, hotel_list, place_hotels = {}, [], {}
for r in hotel_rows:
    if r["hotel_id"] not in hotel_index:
        hotel_index[r["hotel_id"]] = len(hotel_list)
        hotel_list.append([r["hotel_name"], round(float(r["latitude"]), 5), round(float(r["longitude"]), 5)])
    place_hotels.setdefault(str(r["place_id"]), []).append([hotel_index[r["hotel_id"]], r["distance_km"]])
open("hotels.js", "w", encoding="utf8").write(
    "// Hotels around each tourist place, used by the trip cost estimator (planner.html).\n"
    "// Built from data/clean/place_hotels.csv, which comes from sql/07_hotels_near_places.sql.\n"
    "// HOTELS: [name, latitude, longitude]. PLACE_HOTELS: place_id -> [[index in HOTELS, km], ...], nearest first.\n"
    f"const HOTELS = {json.dumps(hotel_list, ensure_ascii=False, separators=(',', ':'))};\n"
    f"const PLACE_HOTELS = {json.dumps(place_hotels, ensure_ascii=False, separators=(',', ':'))};\n")
print("Wrote data/clean/nearest_services.csv, data/clean/place_hotels.csv, services.js and hotels.js")
