// ---- Translations ----
const translations = {
  en: {
    "nav.home": "Home", "nav.places": "Places", "nav.map": "Map", "nav.contact": "Contact",
    "hero.title": "A map of every corner of Saudi Arabia worth the drive.",
    "hero.lede": "Heritage villages, mountain trails, Red Sea islands, and holy sites — filter by region or type, then see what's actually there.",
    "stat.places": "places mapped", "stat.regions": "regions", "stat.types": "place types",
    "cta.browse": "Browse places", "cta.map": "Open the map",
    "highlights.title": "What you'll find",
    "hl.historical.t": "Historical & heritage", "hl.historical.d": "From Hegra's Nabataean tombs to Diriyah's mud-brick walls — sites that trace the Kingdom's story.",
    "hl.natural.t": "Natural landscapes", "hl.natural.d": "Desert cliffs, Red Sea islands, and mountain peaks across every climate the Kingdom holds.",
    "hl.religious.t": "Religious sites", "hl.religious.d": "The Two Holy Mosques and the historic mosques that shaped early Islamic history.",
    "hl.entertainment.t": "Entertainment & culture", "hl.entertainment.d": "Corniches, cable cars, and city landmarks for an easy day out.",
    "photo.soon": "Photo coming soon",
    "footer.text": "Wajjahni — a student portfolio project. Place data is illustrative, not an official tourism source. © 2026 Najla. All rights reserved.",
    "page.places.title": "All places", "page.places.lede": "Search, filter, or sort by distance from you.",
    "page.map.title": "The map", "page.map.lede": "Every place plotted — filter, search, or click a pin for details.",
    "search.placeholder": "Search a place, e.g. Hegra, Farasan...",
    "locate.btn": "📍 Distance from me", "locate.btn.active": "📍 Sorted by distance",
    "locate.status": "Places below are now sorted nearest → farthest.",
    "locate.status.locating": "Locating you…",
    "locate.status.error": "Couldn't get your location — check your browser's location permission.",
    "chip.all": "All",
    "peak.btn": "🕐 Peak hours", "directions.btn": "📍 Directions", "gmaps.open": "📍 Open in Google Maps",
    "empty": "No places match these filters.",
    "peak.sub": "Typical crowd levels by hour (illustrative data)",
    "peak.notbusy": "Not too busy right now", "peak.bitbusy": "Usually a bit busy at this hour", "peak.verybusy": "Usually very busy right now",
    "peak.basedon": "based on hour",
    "list.head": "Places",
    "contact.title": "Get in touch", "contact.lede": "Spotted an error, or want to suggest a place that should be on this map? Reach out.",
    "route.hint.first": "Click \"Distance from me\" first to get driving directions to",
    "route.calculating": "Calculating route to",
    "route.to": "To", "route.drive": "min drive", "route.error": "Couldn't calculate a driving route to",
    "best.in": "best in", "km.away": "km away", "km.from.you": "km from you",
    "lang.toggle": "العربية"
  },
  ar: {
    "nav.home": "الرئيسية", "nav.places": "الأماكن", "nav.map": "الخريطة", "nav.contact": "تواصل",
    "hero.title": "خريطة تجمع كل ركن بالسعودية يستاهل الرحلة.",
    "hero.lede": "قرى تراثية، مسارات جبلية، جزر بالبحر الأحمر، ومواقع دينية — فلتري حسب المنطقة أو النوع، وشوفي وش فيها فعلاً.",
    "stat.places": "مكان على الخريطة", "stat.regions": "منطقة", "stat.types": "نوع مكان",
    "cta.browse": "تصفح الأماكن", "cta.map": "افتحي الخريطة",
    "highlights.title": "وش بتلقين",
    "hl.historical.t": "تاريخي وتراثي", "hl.historical.d": "من مقابر الحِجر النبطية إلى جدران الدرعية الطينية — مواقع تحكي قصة المملكة.",
    "hl.natural.t": "مناظر طبيعية", "hl.natural.d": "جروف صحراوية، جزر بالبحر الأحمر، وقمم جبلية بكل مناخات المملكة.",
    "hl.religious.t": "مواقع دينية", "hl.religious.d": "الحرمان الشريفان والمساجد التاريخية اللي شكّلت بدايات التاريخ الإسلامي.",
    "hl.entertainment.t": "ترفيه وثقافة", "hl.entertainment.d": "كورنيشات، تلفريك، ومعالم مدن ليوم خفيف وممتع.",
    "photo.soon": "الصورة قريباً",
    "footer.text": "وجّهني — مشروع طلابي شخصي. بيانات الأماكن توضيحية، مو مصدر سياحي رسمي. © 2026 نجلاء. جميع الحقوق محفوظة.",
    "page.places.title": "كل الأماكن", "page.places.lede": "ابحثي، فلتري، أو رتبي حسب المسافة منك.",
    "page.map.title": "الخريطة", "page.map.lede": "كل مكان موضّح على الخريطة — فلتري، ابحثي، أو اضغطي على أي نقطة للتفاصيل.",
    "search.placeholder": "ابحثي عن مكان، مثلاً حِجر، فرسان...",
    "locate.btn": "📍 المسافة مني", "locate.btn.active": "📍 مرتبة حسب المسافة",
    "locate.status": "الأماكن تحت مرتبة الحين من الأقرب للأبعد.",
    "locate.status.locating": "جاري تحديد موقعك…",
    "locate.status.error": "ما قدرنا نحدد موقعك — تأكدي من إذن الموقع بالمتصفح.",
    "chip.all": "الكل",
    "peak.btn": "🕐 أوقات الذروة", "directions.btn": "📍 الاتجاهات", "gmaps.open": "📍 افتحي في خرائط Google",
    "empty": "ما فيه أماكن مطابقة لهذي الفلاتر.",
    "peak.sub": "مستوى الازدحام المعتاد حسب الساعة (بيانات توضيحية)",
    "peak.notbusy": "مو مزدحم كثير الحين", "peak.bitbusy": "عادة يكون مزدحم شوي بهذا الوقت", "peak.verybusy": "عادة يكون مزدحم جدًا الحين",
    "peak.basedon": "بناءً على الساعة",
    "list.head": "الأماكن",
    "contact.title": "تواصلي معنا", "contact.lede": "لقيتِ خطأ، أو تبين تقترحين مكان ينضاف للخريطة؟ تواصلي وياني.",
    "route.hint.first": "اضغطي \"المسافة مني\" أول عشان أحسب لك مسار القيادة لـ",
    "route.calculating": "جاري حساب المسار لـ",
    "route.to": "إلى", "route.drive": "دقيقة بالسيارة", "route.error": "ما قدرنا نحسب مسار لـ",
    "best.in": "أفضل وقت", "km.away": "كم", "km.from.you": "كم منك",
    "lang.toggle": "English"
  }
};

const TYPE_LABELS = {
  en: { Historical: "Historical", Natural: "Natural", Religious: "Religious", Entertainment: "Entertainment", Cultural: "Cultural" },
  ar: { Historical: "تاريخي", Natural: "طبيعي", Religious: "ديني", Entertainment: "ترفيهي", Cultural: "ثقافي" }
};
const REGION_LABELS = {
  en: {}, // identity — region names stay as stored (English) for English mode
  ar: {
    "Riyadh": "الرياض", "Makkah": "مكة المكرمة", "Madinah": "المدينة المنورة", "Al-Qassim": "القصيم",
    "Eastern Province": "المنطقة الشرقية", "Aseer": "عسير", "Tabuk": "تبوك", "Hail": "حائل",
    "Najran": "نجران", "Jazan": "جازان", "Al-Baha": "الباحة", "Al-Jouf": "الجوف", "Northern Borders": "الحدود الشمالية"
  }
};
const SEASON_LABELS = {
  en: {}, // identity
  ar: { "Winter": "الشتاء", "Winter-Spring": "الشتاء والربيع", "Summer": "الصيف", "Year-round": "طول السنة" }
};

let currentLang = localStorage.getItem('wajjahni-lang') || 'en';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}
function tType(type) { return (TYPE_LABELS[currentLang] && TYPE_LABELS[currentLang][type]) || type; }
function tRegion(region) { return (REGION_LABELS[currentLang] && REGION_LABELS[currentLang][region]) || region; }
function tName(d) { return (currentLang === 'ar' && d.place_name_ar) || d.place_name; }
function tDesc(d) { return (currentLang === 'ar' && d.short_description_ar) || d.short_description; }
// "Jeddah, Makkah Region" / "جدة، منطقة مكة المكرمة"; just "Makkah Region" when there's no city
function tLocation(d) {
  const region = tRegion(d.region);
  const regionFull = currentLang === 'ar'
    ? (region.startsWith('المنطقة') ? region : 'منطقة ' + region)
    : (/Province|Borders/.test(region) ? region : region + ' Region');
  const city = currentLang === 'ar' ? d.city_ar : d.city;
  if (!city) return regionFull;
  return currentLang === 'ar' ? `${city}، ${regionFull}` : `${city}, ${regionFull}`;
}
function tSeason(season) { return (SEASON_LABELS[currentLang] && SEASON_LABELS[currentLang][season]) || season; }

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });

  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = t('lang.toggle');

  document.dispatchEvent(new CustomEvent('langchange'));
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const next = currentLang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('wajjahni-lang', next);
      applyLanguage(next);
    });
  }
});


const TYPE_COLORS = {
  "Historical": "#B5502A",
  "Natural": "#1F6F78",
  "Religious": "#C99A3C",
  "Entertainment": "#8A5FB5",
  "Cultural": "#4B7A3E"
};
const regions = [...new Set(DATA.map(d => d.region))].sort();
const types = [...new Set(DATA.map(d => d.type))].sort();

// ---- Theme toggle (light/dark) — runs on every page ----
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('wajjahni-theme');

  function apply(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    } else {
      root.removeAttribute('data-theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      btn.textContent = systemDark ? '☀️' : '🌙';
    }
  }
  apply(saved);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('wajjahni-theme', next);
    apply(next);
  });
})();

// ---- Mobile nav toggle — runs on every page ----
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
  // Highlight current page in nav
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('current');
    }
  });
});

// ---- Distance from user (shared across places.html and map.html) ----
let userLocation = null;

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceTo(place) {
  if (!userLocation) return null;
  return haversineKm(userLocation.lat, userLocation.lon, place.latitude, place.longitude);
}

function initLocateButton(onUpdate) {
  const locateBtn = document.getElementById('locateBtn');
  const locateStatus = document.getElementById('locateStatus');
  if (!locateBtn) return;

  locateBtn.addEventListener('click', () => {
    if (!('geolocation' in navigator)) {
      if (locateStatus) locateStatus.textContent = "Your browser doesn't support location.";
      return;
    }
    if (locateStatus) locateStatus.textContent = t('locate.status.locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocation = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        locateBtn.classList.add('active');
        locateBtn.textContent = t('locate.btn.active');
        if (locateStatus) locateStatus.textContent = t('locate.status');
        if (onUpdate) onUpdate();
      },
      () => {
        if (locateStatus) locateStatus.textContent = t('locate.status.error');
      }
    );
  });
}

// ---- Peak hours modal (shared across places.html and map.html) ----
function openPeakModal(i) {
  const d = DATA[i];
  const modal = document.getElementById('peakModal');
  if (!modal) return;
  document.getElementById('peakModalTitle').textContent = tName(d);
  document.getElementById('peakModalSub').textContent = `${tLocation(d)} · ${t('peak.sub')}`;

  const now = new Date().getHours();
  const maxVal = Math.max(...d.peak_hours);
  const barsEl = document.getElementById('peakBars');
  barsEl.innerHTML = d.peak_hours.map((v, h) => {
    const pct = Math.round((v / maxVal) * 100);
    const isNow = h === now;
    const label = [0,6,12,18,23].includes(h) ? `<span class="peak-hlabel">${h}</span>` : '';
    return `<div class="peak-bar-col">
      <div class="peak-bar ${isNow ? 'now' : ''}" style="height:${pct}%" title="${h}:00 — ${v}/100 busy"></div>
      ${label}
    </div>`;
  }).join('');

  const nowVal = d.peak_hours[now];
  const verdict = nowVal < 30 ? t('peak.notbusy') : nowVal < 65 ? t('peak.bitbusy') : t('peak.verybusy');
  document.getElementById('peakVerdict').textContent = `${verdict} (${t('peak.basedon')} ${now}:00)`;

  modal.classList.add('open');
}
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('peakClose');
  const modal = document.getElementById('peakModal');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target.id === 'peakModal') modal.classList.remove('open'); });
  }
});

function googleMapsUrl(place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}&travelmode=driving`;
}

// ---- Place photos: real photo with credit, or a placeholder by type ----
const TYPE_ICONS = { Historical: "🏛️", Natural: "🏞️", Religious: "🕌", Entertainment: "🎡", Cultural: "🎭" };

function placeImage(d, cls) {
  if (d.image_url) {
    return `<img class="${cls}" src="${d.image_url}" alt="${tName(d)}" loading="lazy">`;
  }
  return `<div class="${cls} img-placeholder" style="--tc:${TYPE_COLORS[d.type]}" role="img" aria-label="${tName(d)}">
    <span>${TYPE_ICONS[d.type] || "📍"}</span><small>${t('photo.soon')}</small></div>`;
}

function photoCredit(d) {
  if (!d.image_credit) return '';
  const c = d.image_credit;
  return `<a class="photo-credit" href="${c.source}" target="_blank" rel="noopener">📷 ${c.by} · ${c.license}</a>`;
}

function popupHTML(place, distanceKm) {
  const distLine = (distanceKm != null)
    ? `<div class="popup-meta pc-distance">${distanceKm.toFixed(0)} ${t('km.from.you')}</div>` : '';
  return `
    ${placeImage(place, "popup-img")}
    <div class="popup-title">${tName(place)}</div>
    <div class="popup-meta">${tLocation(place)} · ${tType(place.type)} · ★ ${place.rating}</div>
    ${distLine}
    <div class="popup-desc">${tDesc(place)}</div>
    ${photoCredit(place)}
    <a href="${googleMapsUrl(place)}" target="_blank" rel="noopener" class="gmaps-link">${t('gmaps.open')}</a>
  `;
}
