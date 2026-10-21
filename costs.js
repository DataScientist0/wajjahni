// Numbers used by the trip cost estimator (planner.html).
// Real data:  hotel and food prices for each place (place_costs.js), entry tickets (prices.js), fuel (Aramco).
// Estimates:  flight tickets and transport at the destination, marked below.
// All prices are in Saudi riyals (SAR).

const COSTS = {
  isSample: false,         // true would show the "sample numbers" warning on the page

  // ---- Driving ----
  // Aramco's official prices, October 2026 (updated on the 10th of every month)
  fuelPricePerLiter: { "91": 2.18, "95": 2.33 },
  carLitersPer100km: { small: 7, sedan: 9, suv: 13 },
  roadFactor: 1.3,                        // roads are longer than a straight line, so straight-line km × 1.3
  avgDrivingSpeedKmh: 100,                // used for the rough driving time
  peoplePerCar: 5,                        // a bigger group needs more than one car

  // ---- Flying ----
  // The user can type the real ticket price (with a link to check it). If they don't, we use this
  // ESTIMATE (no open data for domestic ticket prices): round trip per person ≈ base + perKm × one-way km, × style
  flight: { base: 250, perKm: 0.5 },
  flightStyleFactor: { budget: 1, mid: 1.3, luxury: 3 },
  minFlightKm: 400,                       // closer than this, there are no flights, so the trip is calculated by car

  // ---- Taxis at the destination (flying trips) ----
  // Official Transport General Authority taxi tariff (March 2022 revision), daytime, standard 4-seat taxi
  taxi: { start: 6.40, perKm: 2.10, minimum: 10 },
  peoplePerTaxi: 4,
  airportKm: 25,                          // typical airport → hotel distance, each way
  taxiRidesPerDay: 4,                     // e.g. to a place and back, and out to eat and back
  taxiRideKm: 10,                         // typical ride inside the city
  maxDayTripDriveHours: 4,                // more driving than this each way is too much for a day trip

  // ---- At the destination ----
  // Hotel: the GASTAT price of a room per night near each place (place_costs.js), plus VAT.
  //   budget = serviced apartments, comfortable = hotels (both real averages).
  //   luxury = ESTIMATE: GASTAT doesn't split prices by star rating, so luxury = hotel average × 2.
  //   GASTAT's prices don't include the municipal fee either; we couldn't confirm its current rate, so it isn't added.
  vat: 0.15,
  luxuryHotelFactor: 2,
  adultsPerRoom: 2,                       // one room fits 2 adults and up to 4 people with children
  peoplePerRoom: 4,

  // Food per person per day, built from real Numbeo restaurant prices near each place (place_costs.js).
  // "cheap" = a meal at an inexpensive restaurant, "mid" = half of a mid-range meal for two.
  foodPlan: {
    budget: { cheap: 3, mid: 0, coffee: 0 },   // three simple meals
    mid:    { cheap: 2, mid: 1, coffee: 1 },   // two simple meals, a restaurant dinner, a coffee
    luxury: { cheap: 0, mid: 3, coffee: 2 }    // three restaurant meals, two coffees
  },
  waterPerDay: 1,                         // bottles of water (1.5 L) per person per day
  // Entry tickets come from each place's real price in prices.js

  // Children (under 12) cost less: share of an adult's price
  childFactor: { flight: 0.75, food: 0.5 },

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

// Airports with domestic flights (IATA code, coordinates). A flying trip goes from the airport nearest
// the starting city to the airport nearest the place, then by taxi.
const AIRPORTS = [
  { code: "RUH", en: "Riyadh",    ar: "الرياض",          lat: 24.9576, lon: 46.6988 },
  { code: "JED", en: "Jeddah",    ar: "جدة",             lat: 21.6796, lon: 39.1565 },
  { code: "DMM", en: "Dammam",    ar: "الدمام",          lat: 26.4712, lon: 49.7979 },
  { code: "MED", en: "Madinah",   ar: "المدينة المنورة", lat: 24.5534, lon: 39.7051 },
  { code: "AHB", en: "Abha",      ar: "أبها",            lat: 18.2404, lon: 42.6566 },
  { code: "TIF", en: "Taif",      ar: "الطائف",          lat: 21.4834, lon: 40.5443 },
  { code: "TUU", en: "Tabuk",     ar: "تبوك",            lat: 28.3654, lon: 36.6189 },
  { code: "HAS", en: "Hail",      ar: "حائل",            lat: 27.4379, lon: 41.6863 },
  { code: "ELQ", en: "Al-Qassim", ar: "القصيم",          lat: 26.3028, lon: 43.7744 },
  { code: "GIZ", en: "Jazan",     ar: "جازان",           lat: 16.9011, lon: 42.5858 },
  { code: "EAM", en: "Najran",    ar: "نجران",           lat: 17.6114, lon: 44.4192 },
  { code: "ABT", en: "Al-Baha",   ar: "الباحة",          lat: 20.2961, lon: 41.6343 },
  { code: "AJF", en: "Al-Jouf",   ar: "الجوف",           lat: 29.7851, lon: 40.1000 },
  { code: "RAE", en: "Arar",      ar: "عرعر",            lat: 30.9066, lon: 41.1383 },
  { code: "ULH", en: "AlUla",     ar: "العلا",           lat: 26.4834, lon: 38.1170 },
  { code: "HOF", en: "Al-Ahsa",   ar: "الأحساء",         lat: 25.2853, lon: 49.4852 },
  { code: "YNB", en: "Yanbu",     ar: "ينبع",            lat: 24.1442, lon: 38.0634 }
];
