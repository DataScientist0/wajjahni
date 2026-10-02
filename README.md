# Wajjahni · وجّهني

**Explore Saudi Arabia, one place at a time.**

Wajjahni (Arabic for *"guide me"*) is an interactive website that helps you discover tourist places across all 13 regions of Saudi Arabia: heritage sites, desert cliffs, Red Sea islands, mountain villages, holy sites, and city landmarks. You can browse places, filter them, see them on a map, check how busy they usually are, and get directions.

> 🚧 **This project is still being built.** I'm developing it step by step and adding features as I learn. Check the [Progress](#-progress) section to see what's done and what's coming next.

👉 **Live site:** https://datascientist0.github.io/wajjahni/

---

## ✨ What the website does

| Feature | What it does |
|---|---|
| 🏠 **Home page** | Introduces the project and the kinds of places you'll find |
| 🔎 **Search & filters** | Search by place name, and filter by region and by type (Historical, Natural, Religious, Cultural, Entertainment) |
| 🗺️ **Interactive map** | Shows every place as a pin, colored by type. Click a pin to see its photo, rating, and description |
| 📍 **Distance from me** | Uses your location (only if you allow it) to sort places from nearest to farthest |
| 🧭 **Directions** | Draws a route to a place on the map, or opens it in Google Maps |
| ⏰ **Peak hours** | A bar chart showing how busy a place usually is at each hour, and whether it's busy right now |
| 🌐 **Arabic & English** | Switch the whole interface between English and Arabic (right-to-left) |
| 🌙 **Light & dark mode** | Switch themes. Your choice is remembered next time |
| 📱 **Responsive design** | Works on phones, tablets, and desktops |

---

## 📄 Pages

| Page | Description |
|---|---|
| `index.html` | Home page |
| `places.html` | All places as cards, with search, filters, distance sorting, peak hours, and directions |
| `map.html` | Interactive map with a list of places beside it |
| `contact.html` | Contact page for suggestions and corrections |

---

## 🛠️ Languages & tools used, and why

### Programming languages

| Language | Used for | Why I chose it |
|---|---|---|
| **HTML** | The structure of every page: header, sections, cards, buttons | It's the standard language of the web, and every browser understands it |
| **CSS** | All the styling: colors, fonts, layout, light/dark themes, mobile layout | It controls how the site looks. CSS variables made light/dark mode easy, and media queries make the site work on phones |
| **JavaScript** | Everything interactive: search, filters, map, distance, peak hours chart, language and theme switching | It runs in the browser, so the site works without a server and is fast for users |

### Libraries & services

| Tool | Used for | Why |
|---|---|---|
| **Leaflet** | The interactive map | A free, lightweight, open-source map library that's easy to use |
| **Leaflet Routing Machine** | Drawing routes and directions on the map | Works directly with Leaflet, so routes appear on the same map |
| **OpenStreetMap** | The map tiles (the map images) | Free and open map data, with no API key needed |
| **Google Maps link** | Opening directions in Google Maps | Most people already use Google Maps on their phones |
| **Google Fonts** (Fraunces & Inter) | The fonts | Free fonts that make the site look clean and modern |

### Browser features

| Feature | Used for |
|---|---|
| **Geolocation API** | Getting the user's location for "Distance from me" (always asks permission first) |
| **localStorage** | Remembering the user's language and theme choice |

### Math

- **Haversine formula**: calculates the real distance in kilometers between the user and each place, taking the Earth's curve into account.

---

## 📊 Data

The dataset (`data.js`) contains **56 places across 13 regions**. Each place has:

`region` · `place_name` · `type` · `latitude` & `longitude` · `short_description` · `rating` · `num_reviews` · `visitors_per_year` · `best_season` · `best_for` · `image_url` · `peak_hours`

> ⚠️ **About the data:** the places are real, but the **ratings, review counts, visitor numbers, peak hours, and photos are sample data** used to build and test the website. Wajjahni is a student project, not an official tourism source. Replacing these with real data is on the to-do list below.

---

## 📁 Project structure

```
wajjahni/
├── index.html      # Home page
├── places.html     # Places list with search and filters
├── map.html        # Interactive map
├── contact.html    # Contact page
├── styles.css      # All styles, themes, and mobile layout
├── app.js          # Shared logic: language, theme, distance, peak hours, popups
├── data.js         # The places dataset
└── README.md
```

---

## 🚀 Run it locally

1. Download or clone this repository
2. Open `index.html` in your browser

No installation needed. An internet connection is required for the map, fonts, and photos.

---

## ✅ Progress

**Done**
- [x] Dataset of 56 places across 13 regions
- [x] Home, places, map, and contact pages
- [x] Search and filters by region and type
- [x] Interactive map with colored pins
- [x] Distance from me
- [x] Directions
- [x] Peak hours chart
- [x] Arabic and English
- [x] Light and dark mode
- [x] Mobile-friendly design

**Coming next**
- [ ] Replace sample numbers with real data from official sources
- [ ] Real photos for each place
- [ ] Translate place names and descriptions into Arabic
- [ ] A data analysis page with charts by region, type, and season
- [ ] A real contact email or form

---

## 👩‍💻 About

Built by a data analysis student as a portfolio project, to practice web development and working with data.

📂 More of my work: [github.com/DataScientist0](https://github.com/DataScientist0)

---

## © Copyright

© 2026 Najla. All rights reserved.

This project is shared for viewing only. Please don't copy, reuse, or redistribute the code, design, or data without permission.
