"""
Wajjahni: build the real hotel and food prices for every place, used by the trip cost estimator.

Inputs (never edited by hand):
    data/raw/gastat/tourism_establishments_q3_2025.xlsx ... q2_2026.xlsx
        Official GASTAT workbooks (Ministry of Tourism data), the last 4 quarters = 12 months.
        Average price of a room per night, before VAT, for hotels and for serviced apartments:
          - by major city and month (Tables 2.13 / 2.14, only in the 2026 files: Jan-Jun)
          - by region and month (Tables 2.5 / 2.6 in 2025, 2.9 / 2.10 in 2026: all 12 months)
    data/raw/numbeo/food_prices_2026-10.csv
        Restaurant prices from Numbeo (prices added by people who live there), October 2026.

How each place gets its prices:
    Hotel: the nearest GASTAT city within 150 km. Farther than that (e.g. AlUla, the Red Sea islands),
           GASTAT's "Other" row, which covers all the cities that aren't listed.
    Months: each city's own prices for Jan-Jun 2026. Jul-Dec has no city data, so it follows the
           region's shape at the city's level:  city Jan-Jun median × region that month ÷ region Jan-Jun median.
           (The median, so one odd month like Tabuk region's March, from Red Sea resorts, doesn't skew it.)
           The place's price = the average of its 12 months, and its season = each month ÷ that average.
           e.g. Makkah city in May ≈ 2.4 (Hajj), but Taif in May ≈ 1.0, because Taif doesn't follow Hajj.
    Food:  the nearest Numbeo city within 100 km that has at least 20 contributors.
           Otherwise the national average (289 contributors).

Outputs:
    data/clean/place_costs.csv     (one row per place, easy to check)
    data/clean/hotel_seasons.csv   (each city's price factor for every month)
    place_costs.js                 (the same numbers for the website)

How to run (from the wajjahni folder):
    python3 scripts/build_place_costs.py
"""
import csv, json, math
import openpyxl

HOTEL_MAX_KM = 150
FOOD_MAX_KM = 100
FOOD_MIN_CONTRIBUTORS = 20

# GASTAT city rows (Table 2.11) and their coordinates.
# Some rows cover more than one city, so they get more than one point.
GASTAT_CITIES = {
    "Riyadh city (1)":                          ("Riyadh",             "الرياض",            [(24.7136, 46.6753), (24.7333, 46.5749)]),  # + Diriyah
    "Makkah Al-Mukarramah city":                ("Makkah",             "مكة المكرمة",       [(21.3891, 39.8579)]),
    "Jiddah governorate":                       ("Jeddah",             "جدة",               [(21.5433, 39.1728)]),
    "Taif governorate":                         ("Taif",               "الطائف",            [(21.2703, 40.4158)]),
    "Al-Madinah Al-Munawwarah city":            ("Madinah",            "المدينة المنورة",   [(24.4672, 39.6024)]),
    "Bariduh city and  Unayzah governorate":    ("Buraydah & Unaizah", "بريدة وعنيزة",      [(26.3260, 43.9750), (26.0840, 43.9940)]),
    "Al-Ahsa governorate":                      ("Al-Ahsa",            "الأحساء",           [(25.3830, 49.5860)]),
    "Dammam metropolitan area (2)":             ("Dammam & Khobar",    "الدمام والخبر",     [(26.4207, 50.0888), (26.2172, 50.1971), (26.2361, 50.0393)]),
    "Abha city and Khamis Mushayt governorate": ("Abha & Khamis Mushait", "أبها وخميس مشيط", [(18.2164, 42.5053), (18.3000, 42.7333)]),
    "Tabuk city":                               ("Tabuk",              "تبوك",              [(28.3835, 36.5662)]),
    "Hail city":                                ("Hail",               "حائل",              [(27.5114, 41.7208)]),
    "Arar city":                                ("Arar",               "عرعر",              [(30.9753, 41.0381)]),
    "Jazan city":                               ("Jazan",              "جازان",             [(16.8892, 42.5511)]),
    "Najran city":                              ("Najran",             "نجران",             [(17.4917, 44.1322)]),
    "Al Bahah city":                            ("Al-Baha",            "الباحة",            [(20.0129, 41.4677)]),
    "Sakaka city":                              ("Sakaka",             "سكاكا",             [(29.9697, 40.2064)]),
}
GASTAT_OTHER = ("Other", ("the area (average of smaller cities)", "المنطقة (متوسط المدن الأصغر)"))

# Numbeo cities and their coordinates (the national row has none)
NUMBEO_POINTS = {
    "Riyadh": [(24.7136, 46.6753)], "Jeddah": [(21.5433, 39.1728)], "Makkah": [(21.3891, 39.8579)],
    "Dammam": [(26.4207, 50.0888)], "Al Khobar": [(26.2172, 50.1971)], "Madinah": [(24.4672, 39.6024)],
}
NUMBEO_AR = {"Riyadh": "الرياض", "Jeddah": "جدة", "Makkah": "مكة المكرمة", "Dammam": "الدمام",
             "Al Khobar": "الخبر", "Madinah": "المدينة المنورة"}


def km(lat1, lon1, lat2, lon2):
    """Haversine distance in km (same formula as the website)."""
    r = 6371
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = math.radians(lat2 - lat1), math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def nearest(lat, lon, points_by_name):
    """(name, km) of the closest named point."""
    best = min(((name, min(km(lat, lon, a, b) for a, b in pts)) for name, pts in points_by_name.items()),
               key=lambda x: x[1])
    return best


# ---- 1. GASTAT room prices: by city (Jan-Jun 2026) and by region and month (Jul 2025 - Jun 2026) ----
RAW = "data/raw/gastat/tourism_establishments_{}.xlsx"
QUARTERS = [  # file, region table for apartments, region table for hotels
    ("q3_2025", "2.5", "2.6"), ("q4_2025", "2.5", "2.6"), ("q1_2026", "2.9", "2.10"), ("q2_2026", "2.9", "2.10"),
]
MONTHS = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]
# data.js region → GASTAT region name (lower case, GASTAT spells "Eastern region" two ways)
REGIONS = {
    "Riyadh": "ar riyadh", "Makkah": "makkah al mukarramah", "Madinah": "al madinah al munawwarah",
    "Al-Qassim": "al qaseem", "Eastern Province": "eastern region", "Aseer": "aseer", "Tabuk": "tabuk",
    "Hail": "hail", "Northern Borders": "northern borders", "Jazan": "jazan", "Najran": "najran",
    "Al-Baha": "al bahah", "Al-Jouf": "al jawf",
}


def table_rows(ws):
    """Data rows of a GASTAT table: [number, name, value, value, ...]."""
    for row in ws.iter_rows(values_only=True):
        cells = [c for c in row if c is not None]
        if len(cells) >= 4 and isinstance(cells[0], (int, float)) and isinstance(cells[1], str):
            yield cells


city_monthly = {"apartment": {}, "hotel": {}}  # type → city → {month: price}   (Jan-Jun 2026)
monthly = {"apartment": {}, "hotel": {}}       # type → region → {month: price} (Jul 2025 - Jun 2026)


def read_monthly(ws, store, first_header, key):
    header = next(c for c in ([x for x in r if x is not None] for r in ws.iter_rows(values_only=True))
                  if c and isinstance(c[0], str) and c[0].strip().lower().startswith(first_header))
    for cells in table_rows(ws):
        store.setdefault(key(cells[1]), {}).update(zip(header[1:4], cells[2:5]))


for quarter, t_apartment, t_hotel in QUARTERS:
    wb = openpyxl.load_workbook(RAW.format(quarter), read_only=True, data_only=True)
    for kind, t in (("apartment", t_apartment), ("hotel", t_hotel)):
        read_monthly(wb[t], monthly[kind], "administrative", lambda n: n.strip().lower())
    if quarter.endswith("2026"):
        for kind, t in (("apartment", "2.13"), ("hotel", "2.14")):
            read_monthly(wb[t], city_monthly[kind], "major cities", lambda n: n.strip())

missing = [n for n in list(GASTAT_CITIES) + ["Other (3)"] if n.strip() not in city_monthly["hotel"]]
assert not missing, f"Rows not found in Tables 2.13 / 2.14: {missing}"
for kind in monthly:
    for region, by_month in monthly[kind].items():
        assert len(by_month) == 12, f"{kind} {region}: only {len(by_month)} months"
    for city, by_month in city_monthly[kind].items():
        assert len(by_month) == 6, f"{kind} {city}: only {len(by_month)} months"

mean = lambda xs: sum(xs) / len(xs)
median = lambda xs: sorted(xs)[len(xs) // 2] if len(xs) % 2 else mean(sorted(xs)[len(xs) // 2 - 1: len(xs) // 2 + 1])


def year_prices(city, region, kind):
    """12 monthly room prices (January first) for a GASTAT city, in a data.js region."""
    c = [city_monthly[kind][city.strip()][m] for m in MONTHS[:6]]
    r = [monthly[kind][REGIONS[region]][m] for m in MONTHS]
    return c + [median(c) * r[m] / median(r[:6]) for m in range(6, 12)]


seasons = {}      # season key ("city" or "Other (3) | region") → {kind: [12 factors]}
# ---- 2. Numbeo food prices ----
food = {r["city"]: r for r in csv.DictReader(open("data/raw/numbeo/food_prices_2026-10.csv", encoding="utf8"))}
national = food["Saudi Arabia (national average)"]
food_points = {c: pts for c, pts in NUMBEO_POINTS.items() if int(food[c]["contributors"]) >= FOOD_MIN_CONTRIBUTORS}

# ---- 3. Match every place ----
text = open("data.js", encoding="utf8").read()
places = json.loads(text[text.index("["): text.index("];") + 1])

rows = []
for p in places:
    lat, lon = p["latitude"], p["longitude"]

    city_key, dist = nearest(lat, lon, {k: v[2] for k, v in GASTAT_CITIES.items()})
    if dist <= HOTEL_MAX_KM:
        hotel_en, hotel_ar = GASTAT_CITIES[city_key][:2]
        place_km = round(dist)          # the hotel is in the city, the place is this far away
    else:
        city_key = "Other (3)"
        hotel_en, hotel_ar = GASTAT_OTHER[1]
        place_km = 0                    # hotels near the place itself
    # Year average and season, from the city's months (the "Other" row also depends on the region)
    season_key = city_key.strip() if city_key != "Other (3)" else f"Other (3) | {p['region']}"
    prices = {kind: year_prices(city_key, p["region"], kind) for kind in ("apartment", "hotel")}
    apartment, hotel = mean(prices["apartment"]), mean(prices["hotel"])
    seasons[season_key] = {kind: [round(x / mean(prices[kind]), 2) for x in prices[kind]] for kind in prices}

    fcity, fdist = nearest(lat, lon, food_points)
    f = food[fcity] if fdist <= FOOD_MAX_KM else national
    food_en = fcity if fdist <= FOOD_MAX_KM else "Saudi Arabia"
    food_ar = NUMBEO_AR[fcity] if fdist <= FOOD_MAX_KM else "المملكة"

    rows.append({
        "place_name": p["place_name"], "region": p["region"],
        "hotel_city": hotel_en, "hotel_city_ar": hotel_ar, "place_km": place_km, "season": season_key,
        "apartment_night": round(apartment), "hotel_night": round(hotel),
        "food_city": food_en, "food_city_ar": food_ar,
        "meal_cheap": float(f["meal_inexpensive_restaurant"]), "meal_mid_for_two": float(f["meal_for_two_mid_range"]),
        "cappuccino": float(f["cappuccino"]), "water": float(f["water_1_5l"]),
    })

with open("data/clean/place_costs.csv", "w", newline="", encoding="utf8") as out:
    w = csv.DictWriter(out, fieldnames=list(rows[0]))
    w.writeheader()
    w.writerows(rows)

with open("data/clean/hotel_seasons.csv", "w", newline="", encoding="utf8") as out:
    w = csv.writer(out)
    w.writerow(["city", "type"] + MONTHS)
    for key in sorted(seasons):
        for kind in ("hotel", "apartment"):
            w.writerow([key, kind] + seasons[key][kind])

js = [
    "// Real hotel and food prices for each place. Made by scripts/build_place_costs.py, don't edit by hand.",
    "// Hotel: GASTAT Tourism Establishments Statistics, Jul 2025 - Jun 2026 (average price of a room per night,",
    "//        before VAT, year average), from the nearest listed city within 150 km, or GASTAT's \"Other\" row.",
    "//        place_km = how far the place is from that city (0 = there are hotels at the place).",
    "// Food:  Numbeo restaurant prices, October 2026, from the nearest city with 20+ contributors, or the national average.",
    "// The key is the place_name in data.js.",
    "",
    "const PLACE_COSTS = {",
    ",\n".join(f"  {json.dumps(r['place_name'], ensure_ascii=False)}: "
               f"{json.dumps({k: v for k, v in r.items() if k != 'place_name'}, ensure_ascii=False)}"
               for r in rows),
    "};",
    "",
    "// How room prices change through the year near each place: price that month ÷ year average.",
    "// 12 numbers, January first. Key = PLACE_COSTS[...].season. Jan-Jun: the city's own GASTAT prices (2026);",
    "// Jul-Dec: the region's GASTAT prices (2025) at the city's level.",
    "const HOTEL_SEASONS = {",
    ",\n".join(f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(seasons[k])}" for k in sorted(seasons)),
    "};",
    "",
]
open("place_costs.js", "w", encoding="utf8").write("\n".join(js))

print(f"{len(rows)} places → data/clean/place_costs.csv, data/clean/hotel_seasons.csv and place_costs.js")
for key in sorted(seasons):
    h = seasons[key]["hotel"]
    print(f"  {key[:34]:<34} hotel season: lowest {min(h)} ({MONTHS[h.index(min(h))][:3]}), highest {max(h)} ({MONTHS[h.index(max(h))][:3]})")
for r in rows[:6] + rows[60:64]:
    print(f"  {r['place_name'][:34]:<34} {r['hotel_city']:<22} {r['apartment_night']:>4} / {r['hotel_night']:>4} SAR  place {r['place_km']} km")
