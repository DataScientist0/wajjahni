// Numbers used by the trip cost estimator (planner.html).
// ⚠️ TEMPORARY: these are rough placeholder values, used only to build and test the page.
// They will be replaced with numbers calculated from real data
// (e.g. data/clean/tourism_by_region.csv → average spending per night in each region).
// All prices are in Saudi riyals (SAR).

const COSTS = {
  isSample: true,          // set to false once the numbers come from real data

  // ---- Driving ----
  fuelPricePerLiter: 2.33,               // SAR per liter of gasoline
  carLitersPer100km: { small: 7, sedan: 9, suv: 13 },
  roadFactor: 1.3,                        // roads are longer than a straight line, so straight-line km × 1.3
  avgDrivingSpeedKmh: 100,                // used for the rough driving time

  // ---- Flying ----
  // Round-trip ticket per person ≈ base + (perKm × one-way km), then × the style factor
  flight: { base: 250, perKm: 0.5 },
  flightStyleFactor: { budget: 1, mid: 1.3, luxury: 3 },
  localTransportPerDay: { budget: 120, mid: 220, luxury: 450 }, // car rental or taxis at the destination
  minFlightKm: 400,                       // closer than this, flying usually isn't worth it

  // ---- At the destination ----
  hotelPerRoomNight: { budget: 250, mid: 550, luxury: 1400 }, // one room fits 2 people
  foodPerPersonDay:  { budget: 90,  mid: 170, luxury: 380 },
  activitiesPerPersonDay: { budget: 30, mid: 90, luxury: 220 }, // tickets, tours, entry fees

  // Some regions cost more or less than average. 1 = average.
  // To be calculated later from the official tourism spending data.
  regionFactor: {
    "Riyadh": 1, "Makkah": 1, "Madinah": 1, "Eastern Province": 1, "Aseer": 1, "Tabuk": 1,
    "Hail": 1, "Al-Qassim": 1, "Najran": 1, "Jazan": 1, "Al-Baha": 1, "Al-Jouf": 1, "Northern Borders": 1
  },

  // The estimate is shown as a range: total × (1 − rangeLow) to total × (1 + rangeHigh)
  rangeLow: 0.15,
  rangeHigh: 0.25
};

// Starting cities (city center coordinates)
const START_CITIES = [
  { en: "Riyadh",    ar: "الرياض",          lat: 24.7136, lon: 46.6753 },
  { en: "Jeddah",    ar: "جدة",             lat: 21.5433, lon: 39.1728 },
  { en: "Makkah",    ar: "مكة المكرمة",     lat: 21.3891, lon: 39.8579 },
  { en: "Madinah",   ar: "المدينة المنورة", lat: 24.4672, lon: 39.6024 },
  { en: "Dammam",    ar: "الدمام",          lat: 26.4207, lon: 50.0888 },
  { en: "Al Khobar", ar: "الخبر",           lat: 26.2172, lon: 50.1971 },
  { en: "Al-Ahsa",   ar: "الأحساء",         lat: 25.3830, lon: 49.5860 },
  { en: "Taif",      ar: "الطائف",          lat: 21.2703, lon: 40.4158 },
  { en: "Abha",      ar: "أبها",            lat: 18.2164, lon: 42.5053 },
  { en: "Tabuk",     ar: "تبوك",            lat: 28.3835, lon: 36.5662 },
  { en: "Hail",      ar: "حائل",            lat: 27.5114, lon: 41.7208 },
  { en: "Buraydah",  ar: "بريدة",           lat: 26.3260, lon: 43.9750 },
  { en: "Jazan",     ar: "جازان",           lat: 16.8892, lon: 42.5511 },
  { en: "Najran",    ar: "نجران",           lat: 17.4917, lon: 44.1322 },
  { en: "Al-Baha",   ar: "الباحة",          lat: 20.0129, lon: 41.4677 },
  { en: "Sakaka",    ar: "سكاكا",           lat: 29.9697, lon: 40.2064 },
  { en: "Arar",      ar: "عرعر",            lat: 30.9753, lon: 41.0381 }
];
