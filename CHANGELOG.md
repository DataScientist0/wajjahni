# Changelog · Wajjahni

This file explains every change to Wajjahni in detail: **what changed, why, and in which file**.
The newest changes are at the **top**. Every new update adds a section at the start of the file.

---

## October 21, 2026: More accurate voice search 🎤

### Why did it get things wrong?
- The speech recognition engine (Google in Chrome, Apple in Safari) **doesn't know our place names**, like "زعبل" (Zaabal), "فهرين" (Fihrayn), or "الحجر" (Hegra), so it writes the closest word it knows, e.g. "الحجز" instead of "الحجر".
- The site took **only the first guess** and put it in the search box as it was, so one wrong letter or an extra word (like "ابي اروح…", "I want to go to…") meant the search found nothing.

### What changed?
- We ask the engine for its **top 5 guesses** instead of one.
- We remove extra words like "ابي، اروح، وين، دور على" and "take me to, where is".
- If the normal search finds nothing, we compare the guesses with the 74 place names (the full name and each part of it, e.g. "حافة العالم" and "جبل فهرين") and pick the **closest place**.
- The comparison is **by sound**: letters that sound alike count as half a mistake (س/ص/ث, ذ/ز/ظ/ض, ت/ط, ق/ك, and long vowels).
- When we correct the words, a message appears under the search, e.g.: **Heard “الحجز”, showing the closest place: الحِجر (مدائن صالح)**.
- In newer Chrome, we give the engine **the place names before it listens** (`SpeechRecognitionPhrase`), so it expects them and writes them correctly from the start.
- If the words don't sound like any place, they stay as they are, and the usual "Did you mean…?" suggestions appear.

### Testing
24 examples in Arabic and English, all correct. For example:
- "جبل الكاره" → جبل القارة (Jabal Al-Qarah)
- "قريه زي عين" → قرية ذي عين (Dhee Ain Village)
- "jabal al lose" → Jabal al-Lawz
- "taroot castle" → Tarout Castle

### Note
The engine listens in the site's language: if the site is in Arabic, say the name in Arabic; if it's in English, say it in English.

### Files changed
| File | Change |
|---|---|
| `app.js` | The five guesses, cleaning the words, comparing by sound, and the "Heard…" message |

---

## October 21, 2026: Trip cost estimator with real prices 💰 (hotels, food, fuel, tickets), and a Jazan Corniche photo 📷

### What changed in the trip cost estimator?
We tested the estimator with real trips, found calculation errors, and fixed them:

**1) The total now equals the breakdown**
- Before: the breakdown added up to 3,770 SAR, but the total at the top said 3,750, because each number was rounded on its own.
- Now: each part is rounded to the nearest 10 SAR, and the total is exactly their sum.

**2) No flights to places without flights**
- Before: Riyadh to Diriyah (10 km) "by plane" came out at about 1,500 SAR in flights!
- Now: if the place is closer than 400 km, the trip is calculated by car, and the page tells the user.

**3) Rooms count children**
- Before: 2 adults and 4 children = one room, and adding children didn't change the suggested rooms.
- Now: each room is for 2 adults and fits up to 4 people with children, and the suggestion updates when the number of children changes.

**4) Prices for each region from official data**
- Before: every region had the same prices.
- Now: each region has a "price level" calculated from the 2024 Tourism Authority data: the region's average tourist spending per night ÷ the national average (214 SAR).
  - For example, Riyadh 128%, Makkah 110%, Jazan 79%.
  - The data includes people staying with family (who spend very little), so the lowest value is set to 75% to avoid unrealistically cheap prices.
- Applied to hotels, food, and activities.

**5) "How is this calculated?" now matches the calculation**
- Before: it showed the base food and activity prices, while the calculation used the region's prices.
- Now: it shows the region's actual prices, with a new line explaining the region's price level.

**6) Warning for long day trips**
- With zero nights and more than 4 hours of driving each way, a warning suggests adding a night.

**7) Real entry prices for every place 🎟️**
- Before: "activities" was a fixed sample number per person per day (e.g. 90 SAR), the same for every place.
- Now: a new file, **`prices.js`**, has the ticket price for each of the 74 places, and the estimator calculates: **ticket price × adults + child price × children**, for one visit.
- Every price comes with its **source** and **how sure we are about it**:
  - **Official (2):** from the operator's own site, e.g. the Hegra tour 95 SAR (Experience AlUla), and the Sky Bridge 138 SAR for adults and 69 for children (Visit Saudi).
  - **From travel guides (7):** e.g. Diriyah 100, Qiddiya 325 for adults and 275 for children, Jabal Al-Qarah 58, Rijal Almaa 20, Abha cable car 80, Al-Habala cable car 70, Jubbah 25.
  - **Free (46):** beaches, corniches, mountains, mosques, markets, the National Museum, Masmak, Al-Ukhdood, and others.
  - **Unknown (19):** no reliable price found, e.g. Tabuk Castle, Qishlah Palace, Shubra Palace, and the Clock Tower Museum. These are **not added** to the total, and the page tells the user to check before going.
- Under the breakdown, a new **"Entry price"** box shows the price, its source (with a link), and any note, e.g. that the ferry to the Farasan Islands is free but needs a ticket.
- We removed the sample "activities" cost, and added "Other activities and tours" to the "Not included" list.

**8) Real prices for hotels, food, and fuel 📊**
Instead of sample numbers, the estimator now uses real data:

| Item | Source | Before | Now (example: Riyadh, comfortable level) |
|---|---|---|---|
| 🏨 Hotel | **GASTAT** (General Authority for Statistics): Tourism Establishments Statistics, Q1 2026 (Ministry of Tourism data) | 550 SAR sample × region level | 783 SAR + 15% VAT = **900 SAR** |
| 🍽️ Food | **Numbeo** (October 2026, prices added by people who live in each city) | 170 SAR sample | Two simple meals (30) + a mid-range dinner (122) + coffee + water = **201 SAR** per person per day |
| ⛽ Fuel | **Aramco** (October 2026) | 2.33 for all | **91 = 2.18** and **95 = 2.33**, and the user chooses |

**How does each place get its prices?**
- **Hotel:** the nearest city in GASTAT's table (16 cities) within 150 km. Places farther than that (e.g. AlUla and the Red Sea islands) use the "Other cities" row of the same table.
  - **Budget** = furnished apartment average, **comfortable** = hotel average, **luxury** = twice the hotel average (an estimate, because GASTAT doesn't split prices by star rating; the page says so).
- **Food:** the nearest Numbeo city with 20 or more contributors within 100 km (Riyadh, Jeddah, Makkah, Dammam, Al Khobar); other places use the national average (289 contributors).
- A new script, **`scripts/build_place_costs.py`**, reads the original files and produces:
  - `data/clean/place_costs.csv`: a table you can check, with each place, its nearest city, the distance, and the prices.
  - `place_costs.js`: the same numbers for the website.
- The original files are in `data/raw/gastat/` and `data/raw/numbeo/`, and are never edited by hand.
- We removed the "region price level" calculated from spending data, because real hotel prices are more accurate.
- "How is this calculated?" now shows the source of the hotel and food prices, and the city they come from.
- The "sample numbers" warning was removed, and the notice at the top of the page now lists the sources.

**What we looked for and didn't find:**
- **Restaurant meal prices** aren't published by GASTAT (its average prices table only has grocery items and hotels), so we used Numbeo.
- **Kaggle:** has "Global Cost of Living" data from Numbeo, but from 2022, with only 5 reliable Saudi cities, so we used current Numbeo data instead.
- **Domestic flight tickets:** no open data found, so they're still an estimate.

**9) Travel month 📅, taxis 🚕, and flight tickets ✈️**

**Travel month:**
- New "Travel month" option (or "Not sure" = year average).
- We downloaded 4 quarters from GASTAT (Q3 2025 to Q2 2026), which have **the room price for each region in every month**: 12 months in a row for each of the 13 regions.
- For each region and month: **that month's price ÷ the year average**. Examples from the data:
  - Makkah in May (Hajj): **2.5×**
  - Aseer in August (summer): **1.6×**, and 0.8 in February
  - Riyadh in February (Riyadh Season): **1.3×**
- City prices are now **a full-year average** instead of Q1 only.
- New table `data/clean/hotel_seasons.csv` with each region's factor for every month.

**Taxis (flying trips):**
- Instead of the sample number (220 SAR a day), we use the **official Transport General Authority tariff**: 6.40 SAR to start the meter + 2.10 SAR per km, with a 10 SAR minimum.
- Rides: the airport and back, 4 rides a day (about 10 km each), and a trip to the place and back if it's outside the city (e.g. Edge of the World, 69 km from Riyadh).
- Each taxi takes 4 people, so bigger groups need more than one taxi.

**Flight tickets:**
- The flight now goes from **the airport nearest your city** to **the airport nearest the place** (17 domestic airports, e.g. Riyadh RUH → AlUla ULH).
- A new box where the user types the **real ticket price**, and a **"Check flights on Google Flights"** button that opens the search for the same route and month.
- If it's left empty, we use the estimate, and the page says it's an estimate.
- "Flights & local transport" was split into two items: **Flight tickets** and **Taxis there**.

**Still to do:**
- **Flights:** if the user doesn't type the price, it's still an estimate.
- **Cities within the same region** use the region's season. For example, Taif uses the Makkah region's season (which rises during Hajj), even though Taif's high season is summer.
- **Municipal fees** on rooms: we didn't find a recent source confirming the rate, so they aren't added.
- The 19 places whose ticket price is unknown.

### New photo 📷
- **Jazan Corniche:** a sunset photo from the southern corniche, from Wikimedia Commons (MrJoker07, CC BY-SA 3.0).
- We now have photos for **64 places**, with **10** left. We searched Wikimedia Commons and Wikipedia and found no free photos of them.

### Files changed
| File | Change |
|---|---|
| `planner.html` | Calculation fixes, warnings, and texts |
| `costs.js` | Region price levels, room and day-trip settings |
| `prices.js` | New: entry price for each place and its source |
| `place_costs.js` | New: real hotel and food prices for each place |
| `scripts/build_place_costs.py` | New: builds the prices from the original files |
| `data/raw/gastat/`, `data/raw/numbeo/` | New: original source files |
| `data/clean/place_costs.csv` | New: price table for each place |
| `data/clean/hotel_seasons.csv` | New: season factor for each region and month |
| `styles.css` | Style for the entry price box |
| `data.js` | Jazan Corniche photo |
| `README.md` | Photo count and estimator description |

---

## October 16, 2026: 🔊 Reads only the place name, and natural human-sounding audio 🎙️

### What changed?
- The **🔊 Listen** button now says **only the place name**, without the region and description. If we want the description back later, it's one line in `placeSpeechText`.
- The site now **plays a ready-made recording** if there is one:
  - `audio/ar/<place number>.mp3` for Arabic
  - `audio/en/<place number>.mp3` for English
- If a place has no recording, it reads the name **with the device's voice** as before. So the site works now, and gets better automatically as recordings are added.
- A new script, **`scripts/make_audio.py`**, creates the recordings with **Azure Neural** voices, which are very natural AI voices:
  - Arabic: **Zariyah** (`ar-SA-ZariyahNeural`), a Saudi voice
  - English: **Jenny** (`en-US-JennyNeural`)
  - 74 places × 2 languages = **148 files**
- The script takes the Azure key from the **terminal** (environment variables), so the key is never saved in a file or uploaded to GitHub.

### Recordings ready ✅
- We created an **Azure** account and a **Speech** service on the free tier (**Free F0**), and ran the script.
- It produced **148 audio files** (74 Arabic + 74 English), **2.4 MB** in total, each 2 to 4 seconds long.
- Tested on the site: the 🔊 button plays the human-sounding recording in Arabic and English, and goes back to "🔊 Listen" when it finishes.
- **New folders:** `audio/ar/` and `audio/en/`.

### Files changed
| File | Change |
|---|---|
| `app.js` | Read only the name, and play the recordings with the device voice as a fallback |
| `scripts/make_audio.py` | New: creates the recordings with Azure |
| `README.md` | The `scripts/` folder |

---

## October 16, 2026: Accessibility: read aloud and voice search ♿🔊🎤

### What changed?
**1) 🔊 Listen button:** for people who find reading hard
- On every place card (places page and map) and in the place window on the map.
- Reads out loud: **the place name, region, type, and description**.
- In the **nearby services** window: reads the nearest gas station, pharmacy, restaurant, cafe, and bank, and the distance to each.
- The button turns into **"⏹ Stop"** while reading, and pressing it again stops.
- Reads **in Arabic or English** depending on the site's language, a little slower than normal to be clear.

**2) 🎤 Speak button:** for people who find typing hard
- Inside the search box on the places page and the map.
- The user presses it and says a place name; the words become text in the search and the results appear right away.
- While listening, the button turns **red and pulses**, with **"Listening… say a place name"** under it.
- If the microphone isn't allowed or nothing was heard, a message explains the problem.
- Works with **"Did you mean…?"**, so if the recognition has a small mistake, suggestions appear.

**3) Clear icons:**
- Every button has **an icon + a word** ("🔊 Listen" and "🎤 Speak"), not an icon alone.
- Every button has a **label** (`aria-label`) that screen readers read for blind users, and a **tooltip** (`title`) that appears on mouse hover.

### How does it work?
- Both use the browser's **Web Speech API**: free, no API key, and no server.
  - Reading: `speechSynthesis`
  - Voice search: `SpeechRecognition`
- **Voice search doesn't work in Firefox**, so the button **doesn't appear** in browsers that don't support it, instead of appearing and breaking.

### Fix: reading was hard to understand
- **The problem:** the browser loads its list of voices a moment after the page opens. So the first click read the Arabic text **with an English voice**, and it sounded like nonsense.
- Also, the Arabic voice on Mac (**Majed**) is registered as `ar-001`, not `ar-SA`, so it didn't match the language we asked for.
- **The fix:**
  - The code now **waits for the voices to load**.
  - It picks **any Arabic voice** on the device, and uses that voice's own language code.
  - If the device **has no Arabic voice at all**, the button shows "⚠️ No Arabic voice on this device", instead of reading with the wrong voice.

### Improvement: clearer, more natural speech
- The site now picks **the best voice** on the device. High-quality voices come first:
  - **Premium** and **Enhanced** on Apple devices
  - **Neural** and **Natural** from Microsoft
  - **Google** in Chrome and Android
  - Then the Saudi dialect (`ar-SA`)
- **Preparing the text before reading** (`speechFriendly`):
  - Brackets and symbols (· | —) become a short pause instead of being read out
  - "90 كم" is read as "90 **kilometers**"
  - "64.0" is read as "64"
  - Repeated commas are cleaned up
  - Each language uses its own comma (، for Arabic and , for English)
- The speed is a little slower (0.9) to be clearer.

### Files changed
| File | Change |
|---|---|
| `app.js` | Read-aloud and voice search functions, the 🔊 button in the place and nearby services windows, and translations |
| `places.html`, `map.html` | 🔊 button on place cards |
| `styles.css` | Button styles, and the pulsing "listening" state |
| `README.md` | The new feature |

---

## October 14, 2026: Smarter search and clearer messages when nothing is found 🔎

### What changed?
**1) "Did you mean…?" for spelling mistakes:**
- If the user types a name with a mistake and nothing is found, the **3 closest places** to what they typed appear, and clicking one corrects the search. Examples:
  - "hegre" → **Hegra (Mada'in Salih)**
  - "جبل الوز" → **جبل اللوز (Jabal al-Lawz)**
  - "tabok" → **Tabuk Castle**
- If nothing is close, it shows: "Check the spelling, or try another name".
- The "Suggest this place" and "Search on Google Maps" buttons are still there as before.

**2) Search that doesn't depend on how a word is written:**
- The search now **treats these as the same**:
  - أ / إ / آ / ا
  - ة / ه
  - ى / ي
  - ؤ / و, and ئ / ي
  - **Diacritics**, and upper and lower case
- For example, "الطايف" finds **الطائف** (Taif), "العُلا" finds **العلا** (AlUla), and "مكه" finds **مكة** (Makkah).

**3) A message when what was typed isn't a name at all:**
- If the user types **only numbers or symbols** (like "123" or "@@") or a single letter, it shows: "… doesn't look like a place name. Try the name of a place or a city, e.g. AlUla or Abha."

### How does "Did you mean" work?
- For each place, we count **how many letters need to change** (add, remove, or replace) for what the user typed to appear inside the place name. This is the idea of **Levenshtein distance**.
- We allow about one mistake for every 3 letters, and show the closest first.
- It searches the English and Arabic names, the city, and the region.

### Files changed
| File | Change |
|---|---|
| `app.js` | `normalizeSearch`, `matchesSearch`, `fuzzyDistance`, `suggestPlaces`, and the new search messages in Arabic and English |
| `places.html`, `map.html` | Use the new search function |
| `styles.css` | Style for the suggestions |

---

## October 14, 2026: Arabic numerals in the Arabic interface 🔢

### What changed?
- When the site is **in Arabic**, all numbers are now **Arabic numerals** (٠١٢٣٤٥٦٧٨٩) instead of Western ones: the number of places, ratings, distances, prices, peak hours, estimator numbers, and more.
- The decimal point is now **٫** (e.g. ★ ٤٫٧), and the thousands separator is **٬** (e.g. ٤٬٢٠٠ SAR).
- When the user switches back **to English**, the numbers go back to Western numerals.

### How?
- Numbers are written in many places in the code, so instead of changing each one, we added a function in `app.js` that **converts the numbers in the page text itself** depending on the language.
- A **MutationObserver** watches the page, and any new or changed text (like an estimator result or a map window) is converted automatically.
- **Not converted:**
  - Input boxes, so users can type numbers normally
  - Photo licenses like "CC BY 2.0"
  - The map's attribution line

### Files changed
| File | Change |
|---|---|
| `app.js` | Converting numbers depending on the language |

---

## October 14, 2026: New Arabic font (Amiri) 🔤

### What changed?
- The Arabic font was **Tahoma**, an ordinary system font that didn't match the English fonts.
- It's now **Amiri**, an elegant **classic Naskh** font that matches **Fraunces** (the current English heading font), because both have a classic style.
- We compared **13 options** before choosing (Readex Pro, IBM Plex, Alexandria, Rubik, Changa, Aref Ruqaa, and others).
- The English fonts didn't change: **Fraunces** for headings and **Inter** for text.

### How we set it up
- We added Amiri **after** the English font in every font list, e.g. `'Fraunces', 'Amiri Arabic', serif`. English letters come from the English font; Arabic letters aren't in it, so the browser takes them from Amiri automatically. That way every text uses the right font, even when Arabic and English are mixed.
- Amiri looks **smaller** than the English fonts at the same size, so we enlarged its Arabic letters by **18%** (`size-adjust` in `@font-face`) to even out the size.
- We added more space between lines of Arabic headings, because Amiri's letters are tall.
- `unicode-range` makes the font file load only for Arabic letters.

### Files changed
| File | Change |
|---|---|
| `styles.css` | `@font-face` for Amiri, adding it to the font lists, and spacing |

---

## October 14, 2026: Arabic translation in the masculine form ✍️

### What changed?
- The Arabic texts addressed the user in the **feminine** form (like "ابحثي", "افتحي الخريطة", "وش بتلقين").
- They're now all in the **masculine** form, the usual form for addressing someone we don't know. For example:
  - "ابحثي، فلتري، أو رتبي" → **"ابحث، فلتر، أو رتّب"** (search, filter, or sort)
  - "وش بتلقين" → **"وش بتلقى"** (what you'll find)
  - "ناوية تزورين منطقة ثانية؟" → **"ناوي تزور منطقة ثانية؟"** (planning to visit another region?)
  - "تواصلي وياني" → **"تواصل معنا"** (contact us)
- The change covers: the home page, places, map, contact, the whole trip cost estimator, and the description of **Al-Habala Village** ("توصلين" → "توصل").

### Files changed
| File | Change |
|---|---|
| `app.js` | Shared Arabic translations |
| `planner.html` | Trip cost estimator translations |
| `data.js` | Al-Habala Village description |

---

## October 14, 2026: Navy touches to match the sky photo 🌙

### What changed?
- The icons in the **"What you'll find"** section on the home page (historical, natural, religious, entertainment) each had a different light color.
- They're now all **navy gradients** like the sky in the header photo, with **small white dots like stars**, and a soft shadow.
- They look good in both **light and dark** mode.
- **Then we brought navy into 3 more places:**
  1. **The statistics numbers** on the home page (74, 13, 5): now navy (a little lighter in dark mode so they show).
  2. **The placeholder image** for places without a photo (like City Walk): instead of a colored box, it's now **a navy sky with stars** and the icon in the middle.
  3. **The step numbers 1, 2, 3** in the trip cost estimator: now navy circles.
- **The rule:** orange for main buttons (like "Browse places" and "Directions"), and navy for decoration and information. So the site uses two colors that match the header photo: **a navy sky and orange rocks**.
- The navy colors are now **CSS variables** (`--navy-text`, `--sky`, `--sky-large`), so they can be changed in one place.

### Files changed
| File | Change |
|---|---|
| `index.html` | Removed the colors written inside the icons |
| `styles.css` | Navy variables, icons, statistics, placeholder image, and estimator steps |

---

## October 12, 2026: Sharper home page photo 🌌

### What changed?
- The night sky photo on the home page was a **full-screen background** with the text on top, so it was stretched and looked **blurry**. The reason is that the original file is small (2374 × 960) and compressed.
- It's now a **banner at the top**, as wide as the page with rounded corners, with the title and text **under it**:
  - It's shown **in full**, without cropping or stretching, so it looks **much sharper**.
  - **The photographer's signature is visible** under the photo.
  - It no longer flips in Arabic (before, it flipped, and the signature flipped with it).
- **Fix:** the text at the top in the menu ("74 places across 13 regions") showed in English even in Arabic. It's now translated: **"٧٤ مكان في ١٣ منطقة"**.

### Note
- If we get **the original, higher-resolution file** from the photographer, the photo will be even sharper.

### Files changed
| File | Change |
|---|---|
| `index.html` | The photo is now an `<img>` above the title, and the menu text is translated |
| `contact.html` | Menu text translated |
| `styles.css` | New banner design instead of the background |
| `app.js` | Translation for `nav.meta` |

---

## October 12, 2026: Suggest places by budget 🎯

### What changed?
- The estimator now has **two choices** at the top:
  - **📍 I know where I'm going:** the same estimator as before, the full cost of one trip.
  - **💰 I have a budget:** the user types their **total budget** for all travelers, and the estimator shows **every place that fits it**.
- In budget mode:
  - You can filter by **region** and **type of place** (historical, natural, ...).
  - The same choices affect the result: starting city, travelers, nights, rooms, car or plane, and travel style.
  - Places are sorted **from cheapest to most expensive**, and each one shows its photo, approximate cost, and **how much of the budget is left**.
  - If nothing fits, it gives advice (fewer nights, budget style, or a closer region) and the **3 closest options** with how much they go over budget.
  - Clicking a place switches the estimator to **"I know where I'm going"** with that place, so the user can pick a hotel and see the details.
- **How it works:** the same calculation function (`estimate`) runs for all 74 places, and keeps those whose total is under the budget. In this mode we use the estimated hotel price, because the user hasn't picked a hotel yet.

### Note
- With the current sample numbers, fuel costs little compared to hotels and food, so the difference between places by car is small. Once we add official numbers for each region (`regionFactor` and hotel prices), the difference will be clearer.

### Files changed
| File | Change |
|---|---|
| `planner.html` | Budget mode, filters, and the list of places that fit |
| `styles.css` | Design of the two mode buttons and the list of places |
| `README.md` | The new feature |

---

## October 12, 2026: Full trip calculation in the estimator + all hotels 🏨

### What changed?
**1) More accurate travelers:**
- Instead of "number of travelers", there are now **adults** and **children (under 12)**.
- A child counts as **half** for food and activities, and **75%** of a plane ticket.
- The user now sets the **number of rooms** themselves. The estimator suggests a number (one room for every two adults), and if the user changes it, their choice is kept.
- The **number of cars** is calculated automatically: one car for every 5 people, so 8 travelers = 2 cars = twice the fuel.

**2) All hotels around the destination:**
- A new **"Where you'll stay"** section lists **all the hotels** around the chosen place, from nearest to farthest:
  - All hotels within 30 km
  - At least the nearest 10 for remote places (like Jabal al-Lawz)
  - Up to 1,000 hotels in big cities
- There's a **search by name** (e.g. "hilton"), and a "Show more hotels" button.
- When a hotel is chosen, a **"Check the price on Google Maps"** button appears. The user checks the real price for their dates and types it in the **"Price per room per night"** box, and the estimator uses it.
- If no price is typed, the estimator uses the **estimated price** and shows how much it is.

**3) Why didn't we get hotel prices automatically?**
- Hotel prices **change every day** with the date and season, and no free source provides them.
- Booking and Google don't allow their prices to be collected automatically.
- The official alternative: **GASTAT** publishes the average room price for each region every quarter. That's what we'll use later for the estimated price.

### Hotel data (new data pipeline)
- We pulled **5,276 hotels, resorts, and serviced apartments** from Overture Maps (a new cell in `services.ipynb`) → `data/raw/hotels_overture.csv`.
- **Three new SQL files** (explained with comments):

| File | What it does |
|---|---|
| `05_import_hotels.sql` | Creates the `hotels` table and fills it |
| `06_clean_hotels.sql` | Adds `is_valid` and marks rows that aren't hotels (443 rows) |
| `07_hotels_near_places.sql` | Finds the hotels around each place → `place_hotels` table |

- **Cleaning rules** in `06`:
  1. Source confidence below 0.4 (235 rows)
  2. Booking offices and companies, like "حجوزات فنادق مكة" (Makkah hotel bookings) (20 rows)
  3. Names of something else: a restaurant, workers' housing (compound), a street, a neighborhood, or an address like "Yanbu, Saudi Arabia" (218 rows). **Unless** the name has the word hotel, like "Clarion Hotel Jeddah Airport"
- **4,833 valid hotels** remained, **4,425** of them around our places.
- The result is in `data/clean/place_hotels.csv` (17,809 rows) → `hotels.js` (about 380 KB).
- We calculated it in Python with the same logic as the SQL. You can run `05` → `06` → `07` in Workbench to check.

### Note
- Some hotels are duplicated in the Overture data (e.g. DoubleTree twice with slightly different coordinates). We can remove the duplicates later.

### Files changed
| File | Change |
|---|---|
| `planner.html` | Adults and children, rooms, cars, the hotels section, and the price box |
| `costs.js` | `childFactor` and `peoplePerCar` |
| `hotels.js` | New file: hotels around each place |
| `styles.css` | Design of the hotel list |
| `services.ipynb` | Cell to pull the hotels |
| `sql/05`, `sql/06`, `sql/07` | New files |
| `data/raw/hotels_overture.csv`, `data/clean/place_hotels.csv` | New data |
| `README.md` | The feature and the files |

---

## October 12, 2026: Trip cost estimator page 💰

### What changed?
- **New page `planner.html`** ("Trip cost" in the top menu) for anyone who wants to know **roughly** how much their trip will cost.
- **The top of the page** has:
  - **A clear notice** that it's **a rough estimate, not a final price**, and that the numbers are currently **sample values**
  - **3 steps** explaining how to use it
- **The user chooses:**
  - Where they're starting from (17 cities)
  - Where they're going (any of the 74 places, grouped by region)
  - Number of nights and travelers
  - Car or plane, and the type of car
  - Travel style: budget, comfortable, or luxury
- **The result appears right away** with any change:
  - The approximate total, the expected range (e.g. "Usually between 3,600 and 5,300 SAR"), and the cost per person
  - Distance, driving time, and number of rooms
  - **A cost breakdown** with bars: getting there, hotel, food, and activities
  - A **"How is this calculated?"** section that explains each formula with the numbers
- A warning if the place is close and the user chose a plane, or if the place is in their own city.
- A **What's included / not included** section (e.g. shopping and seasonal price rises are not included).
- All **the numbers are in one file, `costs.js`**, so they can easily be replaced with real numbers later.
  - Such as the average spending per night for each region from the Tourism Authority data.
  - It has a `regionFactor` for each region (currently all 1), and `isSample: true`, which shows the "sample numbers" notice. When the numbers are real, we set it to `false` and the notice disappears.
- The page works **in Arabic and English** and **on phones**.
- A "Trip cost" link was added to the menu on every page.

### Files changed
| File | Change |
|---|---|
| `planner.html` | New page |
| `costs.js` | New file with all the temporary numbers and cities |
| `styles.css` | Page design, and a bigger phone menu because it now has 5 links |
| `app.js` | Translation for the menu link |
| `index.html`, `places.html`, `map.html`, `contact.html` | Link to the new page in the menu |
| `README.md` | The new feature and the files |

---

## October 12, 2026: Clear explanations for the SQL files 📝

### What changed?
- All four SQL files now have **English comments explaining every query**:
  - **At the top of each file:** what it does, where the data comes from, and when and how to run it (Step 1 of 4 ... Step 4 of 4).
  - **`01` and `02`:** explanation of each column in the table, why `utf8mb4` and `SET NAMES`, and how to write the `'` character inside text.
  - **`03`:** why we need the cleaning, what `SQL_SAFE_UPDATES`, `IN`, `CASE`, and `REGEXP` with `|` do, why `DEFAULT 1`, and how `SUM(is_valid = 0)` counts rows.
  - **`04`:** explanation of the inner and outer query, `ST_Distance_Sphere` and the order `POINT(longitude, latitude)`, `ROW_NUMBER() OVER (PARTITION BY …)`, why the two-degree box, why the `rank_num <= 3` condition must be in the outer query, and why `LIMIT 5000`.
- **The queries themselves didn't change.** We checked that the code without the comments is exactly the same. The only thing removed was two duplicate `SELECT COUNT(*)` lines at the end of `02`.

### Why?
So you can study from them, and anyone who opens the project on GitHub understands every step.

### Files changed
| File | Change |
|---|---|
| `sql/01_import_services.sql` | Comments |
| `sql/02_import_places.sql` | Comments, and two duplicate lines removed |
| `sql/03_clean_services.sql` | Comments |
| `sql/04_nearest_services.sql` | Comments |

---

## October 12, 2026: Nearby services for the new places, and organized SQL files 🛠️

### What changed?
- **The 18 new places now have nearby services**, in the "Nearby services" window and on the map. We now have **1,110 services** (74 places × 15) instead of 840.
- **The SQL files now run in order from scratch:**

| File | What it does |
|---|---|
| `01_import_services.sql` | Imports the services (unchanged) |
| `02_import_places.sql` | Imports **all 74 places** (before: 56) |
| `03_clean_services.sql` | **New file**: all the cleaning commands we ran in Workbench (standardizing city names + `is_valid` for pharmacies, gas stations, and banks) |
| `04_nearest_services.sql` | Calculates the nearest services (was called `03_nearest_services.sql`) |

- The cleaning commands **weren't saved in any file**. We had only run them in Workbench, so if anyone ran the files from the start, the old `03` file would have failed because the `is_valid` column didn't exist. We collected them from the Workbench history into one file.
- We deleted `04_add_places.sql`, because the new places are now inside `02`.
- We added `LIMIT 5000` to the last query in the services file. Without it, Workbench shows **only the first 1,000 rows**, and the result is now 1,110 rows, so the export would have been incomplete.

### How did we check it's correct?
- We applied **exactly the same SQL logic** in Python to the same data (same cleaning rules, same two-degree box, same distance formula).
- We compared the result with the MySQL file we exported before: **839 of 840 rows match**. The only difference is two cafes at exactly the same distance, whose order is random.
- The rows for the old places in the CSV **didn't change** (same MySQL export), and the new places' rows were added below them.

### Files changed
| File | Change |
|---|---|
| `sql/02_import_places.sql` | 74 places |
| `sql/03_clean_services.sql` | New |
| `sql/04_nearest_services.sql` | New name, and `LIMIT 5000` |
| `sql/04_add_places.sql` | Deleted |
| `data/clean/nearest_services.csv` | 270 new rows |
| `services.js` | Services for all 74 places |
| `README.md` | Order of the SQL files |

---

## October 12, 2026: 18 new places 📍 (74 in total)

### What changed?
- **18 new places** were added, **17 of them with real photos** from Wikimedia Commons, each with the photographer's name and license:

| Region | New places |
|---|---|
| Riyadh | Masmak Fortress, Boulevard City |
| Makkah (Taif) | Al-Shafa, Al-Hada, Shubra Palace |
| Madinah (AlUla) | AlUla Old Town, Maraya |
| Eastern Province | Ithra (Dhahran), City Walk (Dhahran), Khobar Water Tower, Khobar Corniche, Ajdan Walk, Jabal Al-Qarah (Al-Ahsa) |
| Aseer | Al-Habala Village |
| Tabuk | Jabal al-Lawz |
| Hail | Aja Mountains |
| Jazan | Fayfa Mountains |
| Al-Jouf | Rajajil Columns |

- Each place has: its name and description **in Arabic and English**, the city, and the coordinates. We took the coordinates from Wikipedia and Overture Maps.
- **City Walk** has no licensed photo, so it shows a placeholder image based on its type.
- **Ratings and peak hours** for the new places are **sample data** like the rest.
- The number of places was updated on every page (from 56 to 74).
- The footer now says that **ratings and peak hours are sample data**, instead of saying the "place data is illustrative", because the places and photos are now real.
- A new SQL file, `sql/04_add_places.sql`, adds the new places to the `places` table in MySQL.

### Still to do
- **Al-Marfa (Al-Rakah)** and **the Emirate Palace in Najran**: we didn't find their exact coordinates; waiting for their Google Maps links.
- **Nearby services** for the new places: they'll appear after we run the data pipeline (`04` → `03` → export CSV → update `services.js`).

### Files changed
| File | Change |
|---|---|
| `data.js` | 18 new places |
| `data/clean/places.csv` | The same new places (numbers 57 to 74) |
| `sql/04_add_places.sql` | New file to add the places in MySQL |
| `index.html`, `places.html`, `map.html`, `contact.html` | Number of places and footer text |
| `app.js` | Footer text translation |
| `README.md` | Number of places and photos |

---

## October 12, 2026: Nearby services on the map 🗺️

### What changed?
- On the **map page**, when you choose a place (from the list or its pin), **its nearby services appear as icons on the map**:
  ⛽ Gas stations · 💊 Pharmacies · 🍽️ Restaurants · ☕ Cafes · 🏦 Banks and ATMs
- Each icon has **its own color**, different from the tourist place colors, so they don't get mixed up.
- Clicking an icon shows: **the service's name, its type, and how many kilometers away it is**, and a **"Directions"** link that opens Google Maps.
- The map **zooms automatically** so the place and the nearest service of each type are visible.
- A **small panel on the map** has checkboxes to **hide or show** any type (e.g. to see only gas stations).
- When you choose another place, the old place's services are cleared and the new one's appear.
- The panel and windows change with **the language** (Arabic/English).

### Why?
So visitors can see **exactly where** the services are around the place, not just a list of names and distances.

### Files changed
| File | Change |
|---|---|
| `map.html` | A layer for services (`serviceLayer`), the `showServicesOnMap` function, and the panel for the types |
| `styles.css` | Style for the service icons and the panel |

---

## October 12, 2026: Cleaning misclassified gas stations and banks

### What changed?
- The same way as the pharmacies, we used SQL to mark services **whose name doesn't match their type** as unreliable (`is_valid = 0`):
  - ⛽ **147 "gas stations"** turned out to be, for example, car service centers, workshops, car washes, dealerships, and even a restaurant, "Hashi Basha" 😄
  - 🏦 **68 "banks"** turned out to be, for example, oud shops, a bag shop, and a grocery store
- Names of **gas station chains** (Shell, ADNOC, SASCO, Aldrees…) and **banks** (Al Rajhi, SNB, SAB…) were added to the list so they don't get removed by mistake.
- We **re-ran** `sql/03_nearest_services.sql` (the same data pipeline), and exported the result again.
- **28 services changed** on the site (15 banks and 13 gas stations). For example:
  - The nearest "bank" to At-Turaif District was **"Almajed For Oud"** (an oud shop), and now it's **Riyad Bank**
  - The nearest "gas station" to Masjid al-Haram was **a wheel balancing center**, and now it's **a fuel station**

### Files changed
| File | Change |
|---|---|
| `data/clean/nearest_services.csv` | The new result after cleaning |
| `services.js` | Updated from the new file |

---

## October 12, 2026: Two more real photos

### What changed?
- **46 places** now have a real photo, with **10** left.
- **Unaizah Old Town:** a photo of the traditional Al-Musawkaf market (Heritage Commission, CC BY-SA 4.0)
- **Al-Ahsa Oasis:** a photo of Al-Ahsa's palm trees (FirasHaddad75, CC BY-SA 4.0)
- I searched again with different words in Arabic and English for the 12 places, and found no licensed photos that match the remaining 10.

### Places still without a photo (10)
Buraydah Central Market, Al-Asyah Lake, Jazan Corniche, Al Idabi Waterfall, Al-Baha Zipline, North Borders Museum, Al-Gharaba Nature Reserve, Linah Heritage Village, Abu Ali Island, and Karan Island.

### Files changed
| File | Change |
|---|---|
| `data.js` | `image_url` and `image_credit` for the two places |
| `README.md` | Updated photo count |

---

## October 11, 2026: Nearby services feature 🧭

### What changed?
- Every tourist place now has a **🧭 Nearby services** button on the places page and the map page.
- Clicking it opens a window with **the 3 nearest of each service**: ⛽ gas stations, 💊 pharmacies, 🍽️ restaurants, ☕ cafes, and 🏦 banks and ATMs.
- Next to each service is **the distance in kilometers**, and a **📍 Directions** button that opens Google Maps.
- In Arabic and English, with a note that the data is from Overture Maps and may not be complete.

### How were the distances calculated? (with SQL in MySQL)
1. **Lesson 3.5: cleaning the pharmacies:** we found that about **a third of the "pharmacies" in Overture were misclassified** (like KFC, Hardee's, and Subway!). So we added an `is_valid` column, and marked **698** of them as unreliable, because their name has neither the word pharmacy nor the name of a known pharmacy chain.
2. **Lesson 4: distances:**
   - `ST_Distance_Sphere` calculates the real distance on the globe
   - `ROW_NUMBER() OVER (PARTITION BY ...)` numbers the services from nearest to farthest for each place and each type
   - An outer query picks **only the first 3**
   - The first attempt failed because the computer didn't have enough space to calculate **1.8 million distances**, so we made the query lighter: we search only inside **a box around each place (about 220 km)** instead of all of Saudi Arabia
3. The result: a `nearest_services` table with **840 rows** (56 places × 5 types × 3), exported to a CSV file.

### Example
**Edge of the World:** the nearest gas station is **Aldrees (22.2 km)**, and the nearest pharmacy is **Nahdi (64 km)**.

### Files changed
| File | Change |
|---|---|
| `sql/03_nearest_services.sql` | New file: the query that finds the nearest services. You can re-run it any time the places or services change |
| `data/clean/nearest_services.csv` | The query result (840 rows) |
| `services.js` | New file: the same result in a format the site can read |
| `app.js` | New function `openNearbyModal()` that builds the window, and new translations |
| `places.html` and `map.html` | The "Nearby services" button, and loading `services.js` |
| `styles.css` | Design of the window and the list of services |
| `README.md` | The new feature in the features table |

---

## October 11, 2026: When the search finds nothing

### What changed?
- If a visitor **types something in the search and nothing is found**, they now see:
  - A message: **We couldn't find “place name” on Wajjahni**
  - A **📩 Suggest this place** button: opens a ready email to wajjahni.nj@gmail.com, with a subject and text that include the name they searched for
  - A **🗺️ Search on Google Maps** button: opens Google Maps searching for the same word in Saudi Arabia
- The message and buttons are **in Arabic and English**.
- If there are no results **only because of the filters** (nothing typed in the search), the old message "No places match these filters" stays.
- Works on the **places** page and the **map** page.

### Why?
Before, it only said "No results", and the visitor might leave the site. Now they can suggest the place (so we learn which places people look for), or find it on Google Maps.

### Files changed
| File | Change |
|---|---|
| `app.js` | New function `emptyStateHTML()` that builds the message and the two buttons, and 5 new translations in Arabic and English |
| `places.html` and `map.html` | Use `emptyStateHTML()` instead of the old message |
| `styles.css` | Design of the message title and the layout of the two buttons |

---

## October 11, 2026: Nearby services data (the start of the feature)

### What changed?
- **Pulled 32,566 services** in Saudi Arabia (restaurants, cafes, pharmacies, banks and ATMs, and gas stations) from **Overture Maps** with DuckDB in `services.ipynb`.
- Set up a **MySQL database** called `wajjahni` with two tables:
  - `services`: the services
  - `places`: the 56 tourist places
- **Cleaned the city names with SQL** in a new `city_clean` column: for example, "الرياض" (Riyadh) was written in 21 different ways, and became `Riyadh`, and the same for Jeddah, Makkah, Madinah, Dammam, Al Khobar, Al-Ahsa, Taif, Abha, Tabuk, and Buraydah.

### Why?
The goal is a **"nearest services"** feature: when you open any tourist place, you see the nearest pharmacy, gas station, restaurant, cafe, and ATM. The next step is calculating the distances with SQL.

### Files changed
| File | Change |
|---|---|
| `services.ipynb` | New file: pulls the services from Overture |
| `data/raw/services_overture.csv` | The raw services data |
| `data/clean/places.csv` | The tourist places with their coordinates, for importing into MySQL |
| `sql/01_import_services.sql` and `sql/02_import_places.sql` | Files that create the tables and fill them in MySQL |

---

## October 11, 2026: Real contact email

### What changed?
- The contact page now shows the project's real email, **wajjahni.nj@gmail.com**, instead of the fake one (`hello@wajjahni-example.com`).
- Clicking the email opens the email app, ready to send to that address.

### Why?
So anyone who notices a mistake in a place's information, or wants to suggest a new place, can actually get in touch.

### Files changed
| File | Change |
|---|---|
| `contact.html` | The new email in the link and the text |
| `README.md` | Updated Progress list and contact page description |

---

## October 7, 2026: Milky Way photo on the home page

### What changed?
- The background of the first section on the home page is now a photo of **the Milky Way over a rock arch** 🌌, with the photographer's permission.
- **The photographer's signature is on the photo itself** and wasn't removed; it's their right.
- **Quality improvements:** the photo was taken from Twitter and was low quality, so I:
  - Removed the thin black edges at the top and bottom
  - Enlarged it 1.5× (now 3547 × 1407 pixels)
  - Smoothed the noise in the sky, and sharpened the details of the rock and stars
  - Raised the contrast and colors a little
- **Adapts to the screen:**
  - In English: the text on the left, the arch on the right
  - In Arabic: the photo is mirrored so the arch is on the left, because the text is on the right
  - On phones: the text on top, the arch below
- A dark gradient layer behind the text keeps it readable.

### Files changed
| File | Change |
|---|---|
| `hero.jpg` | New file: the photo after the improvements |
| `index.html` | The first section is now `class="hero photo-hero"` |
| `styles.css` | New design for the section: the photo, the dark layer, mirroring in Arabic, and the phone layout |
| `README.md` | Note about the photographer's permission in the Photo credits section |

---

## October 7, 2026: Real photos for 8 more places

### What changed?
- **44 places** now have a real photo instead of 36, with **12 places** left.
- The new places: Wadi Hanifah, Al-Bassam Historic House, Qatif Old Town (Qatif Castle tower), Gulf of Aqaba Beaches (Haql beach), Disi Desert, Qishlah Palace, Raghadan Forest Park, and Dhee Ain Village.
- All photos are from **Wikimedia Commons** and licensed for free use, with the photographer's name and license under each photo.
- This time I searched **in Arabic and English**, and checked every photo to make sure it really shows the place itself.

### Places still without a photo (12)
Buraydah Central Market, Unaizah Old Town, Al-Asyah Lake, Al-Ahsa Oasis, Jazan Corniche, Al Idabi Waterfall, Al-Baha Zipline, North Borders Museum, Al-Gharaba Nature Reserve, Linah Heritage Village, Abu Ali Island, and Karan Island.
I didn't find licensed photos that match these places. For example, the "Buraydah market" photos were of the dates market, not the camel market, so I didn't use them.

### Files changed
| File | Change |
|---|---|
| `data.js` | `image_url` and `image_credit` for the eight places |
| `README.md` | Updated photo count in the Progress list |

---

## October 6, 2026: Fixing the top bar on small phones

### What changed?
- On small phones (screens 480 pixels wide or less), the top bar now **shrinks to fit the screen**:
  - The places count text ("56 of 56 places") is hidden from the bar
  - The spacing between the buttons and at the edges of the bar is smaller
- I tested it at **320 pixels** wide (the smallest iPhones) on all four pages, in Arabic and English, and nothing is cut off or goes off the screen anymore.

### Why?
On small phones, the ☰ menu button was cut off at the edge of the screen, and the page was slightly wider than the screen, so part of the text was cut off.

### Files changed
| File | Change |
|---|---|
| `styles.css` | A new rule for small screens (`@media (max-width: 480px)`) that hides `.nav-meta` and reduces the spacing in `.nav` and `.nav-right` |

---

## October 6, 2026: Adding the city for each place, and fixing the region of two islands

### What changed?
- Every place now shows **the city and the region** together, instead of the region only:
  - Before: `مكة المكرمة · طبيعي` (Makkah · Natural)
  - After: `جدة، منطقة مكة المكرمة · طبيعي` (Jeddah, Makkah Region · Natural)
  - And in English: `Jeddah, Makkah Region`
- Places without a specific city (like Edge of the World, Al-Gharaba Nature Reserve, and Shura and Shebara islands) show the full region name, like `منطقة الرياض` (Riyadh Region), so the region name isn't mistaken for a city name.
- **The search** now also looks in the city name, so typing "العلا" or "AlUla" finds Hegra and Elephant Rock.
- **Fix:** Shura Island and Shebara Island were listed in **the Makkah region**, but they're actually in **the Tabuk region** (Red Sea Project islands off the Tabuk coast). So the Tabuk region now has 5 places, and Makkah 6.

### Why?
The region name alone was confusing. For example, Jeddah Corniche showed "مكة المكرمة" (Makkah), so a visitor might think it's in the city of Makkah, even though Jeddah only belongs to the Makkah **region** administratively.

### Files changed
| File | Change |
|---|---|
| `data.js` | Two new fields for each place: `city` (the city in English) and `city_ar` (in Arabic), and the fixed region for Shura and Shebara islands |
| `app.js` | New function `tLocation(d)` that writes "city, … Region" depending on the language. It's now used in the peak hours window and in the map windows |
| `places.html` and `map.html` | Place cards show `tLocation(d)` instead of `tRegion(d.region)`, and the search includes the city |

---

## October 6, 2026: Translating place names and descriptions into Arabic

### What changed?
- When you choose **Arabic**, **place names** and **descriptions** now appear in Arabic, like: حافة العالم (جبل فهرين) and حي الطريف (الدرعية).
- The translation covers: place cards, map windows, the peak hours window, and directions messages.
- The "Open in Google Maps" button now appears in Arabic: "افتحي في خرائط Google".
- **The search works in both languages**: typing "جدة" (Jeddah) finds Al-Balad and Jeddah Corniche.

### Why?
Before, only the buttons and menus were in Arabic, while place names and descriptions stayed in English, so the site wasn't fully Arabic.

### Files changed
| File | Change |
|---|---|
| `data.js` | Two new fields for each place: `place_name_ar` and `short_description_ar` |
| `app.js` | Two new functions: `tName(d)` and `tDesc(d)`, which return the Arabic text if the language is Arabic, otherwise the English. And a new translation called `gmaps.open` |
| `places.html` and `map.html` | Replaced `d.place_name` with `tName(d)`, and `d.short_description` with `tDesc(d)`, and the search now also looks in the Arabic name |
| `README.md` | Updated Progress list |

---

## October 6, 2026: Tourism data analysis

### What changed?
- A new notebook, `analysis.ipynb`, analyzing the official tourism data (2015–2024): how tourism changed over the years, domestic vs. inbound, the most visited and highest-spending regions, length of stay, and the fastest-growing regions.
- Found a row with **fake zeros** (Al-Baha, 2017, inbound) and turned it into missing values (NaN).

### Files changed
| File | Change |
|---|---|
| `analysis.ipynb` | New file |

---

## October 3, 2026: Cleaning the official tourism data

### What changed?
- Added the official tourism data from the Tourism Authority: 26 files (13 regions × domestic and inbound) in `data/raw/tourism`.
- A new notebook, `data-cleaning.ipynb`, cleans the data:
  - Converting numbers written as text (`"1,041"`) into numbers
  - Short, clear column names, with the unit in them
  - Matching region names with the site
  - Separating region totals from cities
  - Removing a row copied by mistake into the Najran inbound 2024 file
- Output: `data/clean/tourism_by_region.csv` and `data/clean/tourism_by_destination.csv`

### Why didn't we use the merged file from Kaggle?
Because it has problems: the city column was dropped, plus 28 duplicate rows and 20 rows of all zeros.

### Files changed
| File | Change |
|---|---|
| `data/raw/` | The original data, never edited by hand |
| `data/clean/` | The clean data |
| `data-cleaning.ipynb` | New file |
| `README.md` | New section about the data and cleaning |

---

## October 2, 2026: Renaming two regions

### What changed?
- `Asir` became `Aseer`, and `Qassim` became `Al-Qassim`, to match the official spelling and the Tourism Authority data.

### Files changed
| File | Change |
|---|---|
| `data.js` | Region name for the eight places in Aseer and Al-Qassim |
| `app.js` | Arabic translation for the two regions |

---

## October 2, 2026: Real photos of the places

### What changed?
- **36 places** now have a real photo from Wikimedia Commons, instead of random photos.
- Under each photo are **the photographer's name and the license**, with a link to the original page.
- Places without a suitable photo (20 places) show a colored shape based on the type of place, with an icon and the text "Photo coming soon".

### Why?
The old photos were random and had nothing to do with the places (for example, the Edge of the World photo was a dog 🐶).

### Files changed
| File | Change |
|---|---|
| `data.js` | New photo links, and an `image_credit` field (photographer, license, and source) |
| `app.js` | Two functions: `placeImage()` for the photo or placeholder shape, and `photoCredit()` for the photographer's name |
| `places.html` and `map.html` | Use the new functions |
| `styles.css` | Design of the placeholder shape and the photographer line |
| `README.md` | Photo credits section |

---

## October 2, 2026: Copyright

### What changed?
- Added **© 2026 Najla. All rights reserved.** at the bottom of every page and in the README, and in Arabic: **© 2026 نجلاء. جميع الحقوق محفوظة.**
- The project has **no open license**, so it's protected: people can view it, but they aren't allowed to copy it without permission.

### Files changed
`README.md`, `index.html`, `places.html`, `map.html`, `contact.html`, and `app.js`

---

## October 2, 2026: First version of Wajjahni

### What's in it?
- 4 pages: home, places, map, and contact
- 56 tourist places across 13 regions
- Search and filters by region and type
- Interactive map (Leaflet)
- Sorting places by distance from you
- Directions
- Peak hours chart
- Arabic and English
- Light and dark mode
- Works on phones

---

## How is this file updated?
Every new change adds a section at the **start** of the file, with:
1. **The date and title**
2. **What changed?**
3. **Why?**
4. **Files changed**
