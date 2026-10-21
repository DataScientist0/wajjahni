"""
Wajjahni: build the real hotel and food prices for every place, used by the trip cost estimator.

Inputs (never edited by hand):
    data/raw/gastat/tourism_establishments_q3_2025.xlsx ... q2_2026.xlsx
        Official GASTAT workbooks (Ministry of Tourism data), the last 4 quarters = 12 months.
        Average price of a room per night, before VAT, for hotels and for serviced apartments:
          - by major city (Table 2.11, only in the 2026 files)
          - by region and month (Tables 2.5 / 2.6 in 2025, 2.9 / 2.10 in 2026)
    data/raw/numbeo/food_prices_2026-10.csv
        Restaurant prices from Numbeo (prices added by people who live there), October 2026.

How each place gets its prices:
    Hotel: the nearest GASTAT city within 150 km. Farther than that (e.g. AlUla, the Red Sea islands),
           GASTAT's "Other" row, which covers all the cities that aren't listed.
           City prices are only published for Jan-Jun 2026, so they're turned into a year average with
           the region's 12 months:  city Jan-Jun × (region 12-month average ÷ region Jan-Jun average).
    Season: for each region and month, region price that month ÷ region 12-month average.
           e.g. Aseer in August ≈ 1.8 (summer), Makkah in May ≈ 2.5 (Hajj).
    Food:  the nearest Numbeo city within 100 km that has at least 20 contributors.
           Otherwise the national average (289 contributors).

Outputs:
    data/clean/place_costs.csv     (one row per place, easy to check)
    data/clean/hotel_seasons.csv   (each region's price factor for every month)
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


city_sum = {}                                  # city → [apartment total, hotel total, quarters]
monthly = {"apartment": {}, "hotel": {}}       # type → region → {month: price}
for quarter, t_apartment, t_hotel in QUARTERS:
    wb = openpyxl.load_workbook(RAW.format(quarter), read_only=True, data_only=True)
    for kind, t in (("apartment", t_apartment), ("hotel", t_hotel)):
        ws = wb[t]
        header = next(c for c in ([x for x in r if x is not None] for r in ws.iter_rows(values_only=True))
                      if c and isinstance(c[0], str) and c[0].strip().lower().startswith("administrative"))
        months = header[1:4]
        for cells in table_rows(ws):
            region = cells[1].strip().lower()
            monthly[kind].setdefault(region, {}).update(zip(months, cells[2:5]))
    if "2.11" in wb.sheetnames and quarter.endswith("2026"):
        for _, name, apartment, hotel, *_ in table_rows(wb["2.11"]):
            s_ = city_sum.setdefault(name.strip(), [0, 0, 0])
            s_[0] += apartment; s_[1] += hotel; s_[2] += 1

rooms = {name: (a / n, h / n) for name, (a, h, n) in city_sum.items()}   # Jan-Jun 2026 average
missing = [n for n in list(GASTAT_CITIES) + ["Other (3)"] if n.strip() not in rooms]
assert not missing, f"Rows not found in Table 2.11: {missing}"
for kind in monthly:
    for region, by_month in monthly[kind].items():
        assert len(by_month) == 12, f"{kind} {region}: only {len(by_month)} months"

mean = lambda xs: sum(xs) / len(xs)
season = {}       # data.js region → {kind: [12 factors, January first]}
to_year = {}      # data.js region → {kind: year average ÷ Jan-Jun average}
for region, g in REGIONS.items():
    season[region], to_year[region] = {}, {}
    for kind in monthly:
        prices = [monthly[kind][g][m] for m in MONTHS]
        year = mean(prices)
        season[region][kind] = [round(p / year, 2) for p in prices]
        to_year[region][kind] = year / mean(prices[:6])

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
        apartment, hotel = rooms[city_key.strip()]
        place_km = round(dist)          # the hotel is in the city, the place is this far away
    else:
        hotel_en, hotel_ar = GASTAT_OTHER[1]
        apartment, hotel = rooms["Other (3)"]
        place_km = 0                    # hotels near the place itself
    apartment *= to_year[p["region"]]["apartment"]
    hotel *= to_year[p["region"]]["hotel"]

    fcity, fdist = nearest(lat, lon, food_points)
    f = food[fcity] if fdist <= FOOD_MAX_KM else national
    food_en = fcity if fdist <= FOOD_MAX_KM else "Saudi Arabia"
    food_ar = NUMBEO_AR[fcity] if fdist <= FOOD_MAX_KM else "المملكة"

    rows.append({
        "place_name": p["place_name"], "region": p["region"],
        "hotel_city": hotel_en, "hotel_city_ar": hotel_ar, "place_km": place_km,
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
    w.writerow(["region", "type"] + MONTHS)
    for region in season:
        for kind in ("hotel", "apartment"):
            w.writerow([region, kind] + season[region][kind])

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
    "// How room prices change through the year in each region: price that month ÷ year average.",
    "// 12 numbers, January first. From GASTAT's monthly prices by region, Jul 2025 - Jun 2026.",
    "const HOTEL_SEASONS = {",
    ",\n".join(f"  {json.dumps(r)}: {json.dumps(season[r])}" for r in season),
    "};",
    "",
]
open("place_costs.js", "w", encoding="utf8").write("\n".join(js))

print(f"{len(rows)} places → data/clean/place_costs.csv, data/clean/hotel_seasons.csv and place_costs.js")
for region in season:
    h = season[region]["hotel"]
    print(f"  {region:<17} hotel season: lowest {min(h)} ({MONTHS[h.index(min(h))][:3]}), highest {max(h)} ({MONTHS[h.index(max(h))][:3]})")
for r in rows[:6] + rows[60:64]:
    print(f"  {r['place_name'][:34]:<34} {r['hotel_city']:<22} {r['apartment_night']:>4} / {r['hotel_night']:>4} SAR  place {r['place_km']} km")
