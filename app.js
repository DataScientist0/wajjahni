// ---- Translations ----
const translations = {
  en: {
    "nav.home": "Home", "nav.places": "Places", "nav.map": "Map", "nav.planner": "Trip cost", "nav.contact": "Contact", "nav.meta": "74 places across 13 regions",
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
    "nearby.btn": "🧭 Nearby services", "nearby.title": "Nearby services", "nearby.sub": "The 3 closest of each service (straight-line distance)", "nearby.km": "km", "nearby.go": "Directions",
    "svc.fuel": "⛽ Gas stations", "svc.pharmacy": "💊 Pharmacies", "svc.restaurant": "🍽️ Restaurants", "svc.cafe": "☕ Cafes", "svc.bank": "🏦 Banks & ATMs",
    "nearby.source": "Service data © Overture Maps Foundation. It may be incomplete or out of date.", "nearby.none": "No nearby services found.",
    "footer.text": "Wajjahni — a student portfolio project. Ratings and peak hours are sample data, not an official tourism source. © 2026 Najla. All rights reserved.",
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
    "empty.notfound": "We couldn't find “{q}” on Wajjahni.",
    "listen.btn": "🔊 Listen", "listen.stop": "⏹ Stop", "listen.novoice": "⚠️ No English voice on this device", "listen.label": "Read this place out loud",
    "mic.btn": "🎤 Speak", "mic.label": "Search by voice", "mic.listening": "Listening… say a place name",
    "mic.stop": "⏹ Stop", "mic.error": "Couldn't use the microphone. Check that it's allowed for this site.",
    "mic.nothing": "Didn't catch that. Tap 🎤 and try again.",
    "mic.heard": "Heard “{h}”, showing the closest place: {p}",
    "listen.nearby": "Nearest {type}: {name}, {km} kilometers.",
    "svc1.fuel": "gas station", "svc1.pharmacy": "pharmacy", "svc1.restaurant": "restaurant", "svc1.cafe": "cafe", "svc1.bank": "bank or ATM",
    "empty.didyoumean": "Did you mean:", "empty.typo": "Check the spelling, or try another name.",
    "empty.invalid": "“{q}” doesn't look like a place name. Try the name of a place or a city, e.g. AlUla or Abha.", "empty.suggest": "📩 Suggest this place", "empty.gmaps": "🗺️ Search on Google Maps",
    "empty.mail.subject": "Place suggestion: {q}", "empty.mail.body": "Hi Wajjahni team,\n\nI searched for “{q}” but couldn't find it. Please consider adding it.\n\nThanks!",
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
    "nav.home": "الرئيسية", "nav.places": "الأماكن", "nav.map": "الخريطة", "nav.planner": "تكلفة الرحلة", "nav.contact": "تواصل", "nav.meta": "٧٤ مكان في ١٣ منطقة",
    "hero.title": "خريطة تجمع كل ركن بالسعودية يستاهل الرحلة.",
    "hero.lede": "قرى تراثية، مسارات جبلية، جزر بالبحر الأحمر، ومواقع دينية — فلتر حسب المنطقة أو النوع، وشوف وش فيها فعلاً.",
    "stat.places": "مكان على الخريطة", "stat.regions": "منطقة", "stat.types": "نوع مكان",
    "cta.browse": "تصفح الأماكن", "cta.map": "افتح الخريطة",
    "highlights.title": "وش بتلقى",
    "hl.historical.t": "تاريخي وتراثي", "hl.historical.d": "من مقابر الحِجر النبطية إلى جدران الدرعية الطينية — مواقع تحكي قصة المملكة.",
    "hl.natural.t": "مناظر طبيعية", "hl.natural.d": "جروف صحراوية، جزر بالبحر الأحمر، وقمم جبلية بكل مناخات المملكة.",
    "hl.religious.t": "مواقع دينية", "hl.religious.d": "الحرمان الشريفان والمساجد التاريخية اللي شكّلت بدايات التاريخ الإسلامي.",
    "hl.entertainment.t": "ترفيه وثقافة", "hl.entertainment.d": "كورنيشات، تلفريك، ومعالم مدن ليوم خفيف وممتع.",
    "photo.soon": "الصورة قريباً",
    "nearby.btn": "🧭 خدمات قريبة", "nearby.title": "خدمات قريبة", "nearby.sub": "أقرب ٣ من كل خدمة (المسافة بخط مستقيم)", "nearby.km": "كم", "nearby.go": "الاتجاهات",
    "svc.fuel": "⛽ محطات بنزين", "svc.pharmacy": "💊 صيدليات", "svc.restaurant": "🍽️ مطاعم", "svc.cafe": "☕ مقاهي", "svc.bank": "🏦 بنوك وصرافات",
    "nearby.source": "بيانات الخدمات من Overture Maps، وقد لا تكون كاملة أو محدثة.", "nearby.none": "ما لقينا خدمات قريبة.",
    "footer.text": "وجّهني — مشروع طلابي شخصي. التقييمات وأوقات الذروة بيانات تجريبية، مو مصدر سياحي رسمي. © 2026 نجلاء. جميع الحقوق محفوظة.",
    "page.places.title": "كل الأماكن", "page.places.lede": "ابحث، فلتر، أو رتّب حسب المسافة منك.",
    "page.map.title": "الخريطة", "page.map.lede": "كل مكان موضّح على الخريطة — فلتر، ابحث، أو اضغط على أي نقطة للتفاصيل.",
    "search.placeholder": "ابحث عن مكان، مثلاً حِجر، فرسان...",
    "locate.btn": "📍 المسافة مني", "locate.btn.active": "📍 مرتبة حسب المسافة",
    "locate.status": "الأماكن تحت مرتبة الحين من الأقرب للأبعد.",
    "locate.status.locating": "جاري تحديد موقعك…",
    "locate.status.error": "ما قدرنا نحدد موقعك — تأكد من إذن الموقع بالمتصفح.",
    "chip.all": "الكل",
    "peak.btn": "🕐 أوقات الذروة", "directions.btn": "📍 الاتجاهات", "gmaps.open": "📍 افتح في خرائط Google",
    "empty": "ما فيه أماكن مطابقة لهذي الفلاتر.",
    "empty.notfound": "ما لقينا «{q}» في وجّهني.",
    "listen.btn": "🔊 استمع", "listen.stop": "⏹ إيقاف", "listen.novoice": "⚠️ جهازك ما فيه صوت عربي", "listen.label": "اقرأ معلومات المكان بصوت عالي",
    "mic.btn": "🎤 تكلّم", "mic.label": "ابحث بصوتك", "mic.listening": "أسمعك… قل اسم المكان",
    "mic.stop": "⏹ إيقاف", "mic.error": "ما قدرنا نستخدم المايك. تأكد إنه مسموح لهالموقع.",
    "mic.nothing": "ما سمعت شي. اضغط 🎤 وجرب مرة ثانية.",
    "mic.heard": "سمعت «{h}»، وهذا أقرب مكان له: {p}",
    "listen.nearby": "أقرب {type}: {name}، على بعد {km} كيلو.",
    "svc1.fuel": "محطة بنزين", "svc1.pharmacy": "صيدلية", "svc1.restaurant": "مطعم", "svc1.cafe": "مقهى", "svc1.bank": "بنك أو صراف",
    "empty.didyoumean": "قصدك:", "empty.typo": "تأكد من الإملاء، أو جرب اسم ثاني.",
    "empty.invalid": "«{q}» ما يبدو اسم مكان. جرب تكتب اسم مكان أو مدينة، مثلاً العلا أو أبها.", "empty.suggest": "📩 اقترح هالمكان علينا", "empty.gmaps": "🗺️ دوّر عليه في خرائط Google",
    "empty.mail.subject": "اقتراح مكان: {q}", "empty.mail.body": "هلا فريق وجّهني،\n\nبحثت عن «{q}» وما لقيته. أتمنى تضيفونه.\n\nشكراً!",
    "peak.sub": "مستوى الازدحام المعتاد حسب الساعة (بيانات توضيحية)",
    "peak.notbusy": "مو مزدحم كثير الحين", "peak.bitbusy": "عادة يكون مزدحم شوي بهذا الوقت", "peak.verybusy": "عادة يكون مزدحم جدًا الحين",
    "peak.basedon": "بناءً على الساعة",
    "list.head": "الأماكن",
    "contact.title": "تواصل معنا", "contact.lede": "لقيت خطأ، أو تبي تقترح مكان ينضاف للخريطة؟ تواصل معنا.",
    "route.hint.first": "اضغط \"المسافة مني\" أول عشان أحسب لك مسار القيادة لـ",
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

// ---- Digits: Arabic numerals (٠١٢٣٤٥٦٧٨٩) in Arabic, Western (0123456789) in English ----
// The page builds its numbers in many places (counts, ratings, km, prices, hours...),
// so instead of changing each one, we convert the digits in the page text itself,
// and a MutationObserver converts anything added or changed later.
// Skipped: form inputs (people type numbers there), photo licenses like "CC BY 2.0",
// the map's attribution line, and anything marked data-keep-digits.
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const SKIP_DIGITS = 'script, style, input, textarea, select, .photo-credit, .leaflet-control-attribution, [data-keep-digits]';

function convertDigits(text, lang) {
  if (lang === 'ar') {
    return text
      .replace(/(\d)\.(\d)/g, '$1٫$2')      // decimal point: 4.7 → ٤٫٧
      .replace(/(\d),(\d)/g, '$1٬$2')        // thousands: 1,200 → ١٬٢٠٠
      .replace(/\d/g, d => AR_DIGITS[d]);
  }
  return text
    .replace(/[٠-٩]/g, d => AR_DIGITS.indexOf(d))
    .replace(/(\d)٫(\d)/g, '$1.$2')
    .replace(/(\d)٬(\d)/g, '$1,$2');
}

function convertDigitsIn(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    if (root.parentElement && root.parentElement.closest(SKIP_DIGITS)) return;
    const next = convertDigits(root.nodeValue, currentLang);
    if (next !== root.nodeValue) root.nodeValue = next;   // only write when something changed
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE || root.closest(SKIP_DIGITS)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(convertDigitsIn);
  root.querySelectorAll('[placeholder]').forEach(el => {
    const next = convertDigits(el.getAttribute('placeholder'), currentLang);
    if (next !== el.getAttribute('placeholder')) el.setAttribute('placeholder', next);
  });
}

const digitObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.type === 'characterData') convertDigitsIn(m.target);
    else if (m.type === 'attributes') {
      const v = m.target.getAttribute('placeholder') || '', next = convertDigits(v, currentLang);
      if (next !== v) m.target.setAttribute('placeholder', next);
    }
    else m.addedNodes.forEach(convertDigitsIn);
  });
});
document.addEventListener('langchange', () => convertDigitsIn(document.body));
document.addEventListener('DOMContentLoaded', () => {
  digitObserver.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] });
});

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

// Empty search results: when the visitor typed something, offer to suggest the place or look it up on Google Maps
// ---- Search ----
// Make text easy to compare: lower case, no Arabic diacritics, and one form for letters
// people often write differently (أ إ آ → ا, ة → ه, ى → ي, ؤ → و, ئ → ي), Arabic digits → 0-9.
function normalizeSearch(s) {
  return String(s || '').toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')          // tashkeel and tatweel
    .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();               // punctuation → space
}

// The texts a place can be found by
function searchFields(d) {
  return [d.place_name, d.place_name_ar, d.region, tRegion(d.region), d.city, d.city_ar];
}

function matchesSearch(d, query) {
  if (!String(query || '').trim()) return true;     // empty search box: show everything
  const q = normalizeSearch(query);
  if (!q) return false;                             // only symbols (e.g. "@@"): nothing matches
  return searchFields(d).some(v => normalizeSearch(v).includes(q));
}

// How many letter changes (add / remove / replace) it takes to make `q` appear somewhere inside `text`.
// 0 = q is in the text exactly. Used to catch spelling mistakes like "Hegre" → "Hegra".
function fuzzyDistance(q, text) {
  let prev = new Array(text.length + 1).fill(0);   // a match can start anywhere in the text
  for (let i = 1; i <= q.length; i++) {
    const cur = [i];
    for (let j = 1; j <= text.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (q[i - 1] === text[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return Math.min(...prev);                        // a match can end anywhere too
}

// The (up to 3) places whose names are closest to what was typed
function suggestPlaces(query) {
  const q = normalizeSearch(query);
  if (q.length < 3) return [];
  const maxMistakes = Math.max(1, Math.floor(q.length / 3));   // e.g. 1 mistake for 3–5 letters, 2 for 6–8
  return DATA.map((d, i) => ({
      i, dist: Math.min(...searchFields(d).filter(Boolean).map(v => fuzzyDistance(q, normalizeSearch(v))))
    }))
    .filter(s => s.dist <= maxMistakes)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3)
    .map(s => s.i);
}

// Clicking a suggestion puts that place's name in the search box
function useSuggestion(i) {
  const input = document.getElementById('searchInput');
  input.value = tName(DATA[i]);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function emptyStateHTML() {
  const input = document.getElementById('searchInput');
  const query = input ? input.value.trim() : '';
  if (!query) return `<div class="empty-state">${t('empty')}</div>`;
  const safe = query.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  // Only numbers or symbols, or a single letter: not a name at all
  if (!/\p{L}{2,}/u.test(query)) {
    return `<div class="empty-state"><p class="empty-title">${t('empty.invalid').replace('{q}', safe)}</p></div>`;
  }

  const ideas = suggestPlaces(query);
  const didYouMean = ideas.length ? `
    <div class="empty-suggest">
      <span>${t('empty.didyoumean')}</span>
      ${ideas.map(i => `<button type="button" class="chip" onclick="useSuggestion(${i})">${tName(DATA[i])}</button>`).join('')}
    </div>` : `<p class="empty-hint">${t('empty.typo')}</p>`;

  const subject = encodeURIComponent(t('empty.mail.subject').replace('{q}', query));
  const body = encodeURIComponent(t('empty.mail.body').replace('{q}', query));
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + ' Saudi Arabia')}`;
  return `<div class="empty-state">
    <p class="empty-title">${t('empty.notfound').replace('{q}', safe)}</p>
    ${didYouMean}
    <div class="empty-actions">
      <a class="btn-primary" href="mailto:wajjahni.nj@gmail.com?subject=${subject}&body=${body}">${t('empty.suggest')}</a>
      <a class="btn-secondary" href="${maps}" target="_blank" rel="noopener">${t('empty.gmaps')}</a>
    </div>
  </div>`;
}

// ---- Nearby services modal (built once, reused on places.html and map.html) ----
function openNearbyModal(i) {
  const d = DATA[i];
  const data = (typeof NEARBY !== 'undefined' && NEARBY[String(i + 1)]) || {};
  let modal = document.getElementById('nearbyModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'nearbyModal';
    modal.className = 'peak-modal';
    modal.innerHTML = '<div class="peak-modal-box nearby-box"><button class="peak-close" aria-label="Close">✕</button><div class="nearby-content"></div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.peak-close').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const order = ['fuel', 'pharmacy', 'restaurant', 'cafe', 'bank'];
  const groups = order.filter(k => data[k] && data[k].length).map(k => `
    <div class="nearby-group">
      <h4>${t('svc.' + k)}</h4>
      <ul>${data[k].map(s => `
        <li>
          <span class="nb-name">${esc(s.n)}</span>
          <span class="nb-km">${s.km.toFixed(1)} ${t('nearby.km')}</span>
          <a class="nb-go" href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lon}&travelmode=driving" target="_blank" rel="noopener">📍 ${t('nearby.go')}</a>
        </li>`).join('')}
      </ul>
    </div>`).join('');
  modal.querySelector('.nearby-content').innerHTML = `
    <h3 class="peak-title">${t('nearby.title')}: ${esc(tName(d))}</h3>
    <p class="peak-sub">${t('nearby.sub')}</p>
    ${nearbyListenButton(data)}
    ${groups || `<p>${t('nearby.none')}</p>`}
    <p class="nearby-source">${t('nearby.source')}</p>`;
  modal.classList.add('open');
}

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
    ${listenButton(DATA.indexOf(place))}
  `;
}


// =====================================================================
// Accessibility: read places out loud (🔊) and search by voice (🎤)
// Both use the browser's built-in Web Speech API: free, no API key, works offline for reading.
// =====================================================================

// ---- 🔊 Read out loud (speechSynthesis) ----
let speakingBtn = null;   // the button that started the current reading, so it can show "Stop"

// The device's voices load a moment after the page opens, so we wait for them.
// Without this, the first click can read Arabic text with an English voice, which sounds like nonsense.
function loadVoices() {
  return new Promise(resolve => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) return resolve(voices);
    const done = () => resolve(speechSynthesis.getVoices());
    speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, 1500);                  // don't wait forever
  });
}

// Best voice for the current language. Natural-sounding voices first:
// "Premium" / "Enhanced" (Apple), "Neural" / "Natural" (Microsoft), "Google" (Chrome, Android).
function pickVoice(voices) {
  const want = currentLang === 'ar' ? 'ar' : 'en';
  const norm = v => v.lang.replace('_', '-').toLowerCase();
  const mine = voices.filter(v => norm(v) === want || norm(v).startsWith(want + '-'));
  const score = v => {
    let s = 0;
    if (/premium|enhanced|neural|natural/i.test(v.name)) s += 4;   // high-quality voices
    if (/google/i.test(v.name)) s += 3;
    if (norm(v) === (currentLang === 'ar' ? 'ar-sa' : 'en-us')) s += 2;   // Saudi Arabic / US English
    if (v.localService === false) s += 1;                          // online voices usually sound better
    return s;
  };
  return mine.sort((a, b) => score(b) - score(a))[0];
}

// Tidy the text so the voice reads it more naturally
function speechFriendly(text) {
  const c = currentLang === 'ar' ? '،' : ',';     // Arabic or English comma = a short pause
  let s = String(text)
    .replace(/[()\[\]«»"]/g, c + ' ')          // brackets: a short pause instead of a symbol
    .replace(/\s*[·|•—]\s*/g, c + ' ');        // separators → pause
  if (currentLang === 'ar') {
    // "90 كم" → "90 كيلومتر" (\b doesn't work with Arabic letters, so we check what comes after)
    s = s.replace(/(\d|[٠-٩])\s*كم(?=$|[\s،.])/g, '$1 كيلومتر');
  } else {
    s = s.replace(/(\d)\s*km\b/gi, '$1 kilometers');
  }
  return s
    .replace(/(\d)\.0(?!\d)/g, '$1')                // "64.0" → "64"
    .replace(/\s+([،,])/g, '$1')                      // no space before a comma
    .replace(/([،,]\s*)+/g, c + ' ')                  // one comma at a time
    .replace(/[،,]\s*\./g, '.')                       // ", ." → "."
    .replace(/\s+/g, ' ').trim();
}

async function speak(text, btn) {
  if (!('speechSynthesis' in window)) return;
  const synth = window.speechSynthesis;
  // Pressing the same button again stops the reading
  if (speakingBtn === btn && (synth.speaking || synth.pending)) { synth.cancel(); return; }
  synth.cancel();

  const voice = pickVoice(await loadVoices());
  if (!voice) {
    // No voice for this language on the device: say so, instead of reading with the wrong voice
    if (btn) { const old = btn.textContent; btn.textContent = t('listen.novoice'); setTimeout(() => btn.textContent = old, 3500); }
    return;
  }

  const u = new SpeechSynthesisUtterance(speechFriendly(text));
  u.voice = voice;
  u.lang = voice.lang;      // use the voice's own language code (e.g. Majed on Mac is "ar-001")
  u.rate = 0.9;             // a little slower than normal, easier to follow
  u.pitch = 1;

  const reset = () => { if (speakingBtn) speakingBtn.textContent = t('listen.btn'); speakingBtn = null; };
  u.onend = reset; u.onerror = reset;
  reset();
  speakingBtn = btn;
  if (btn) btn.textContent = t('listen.stop');
  synth.speak(u);
}

// 🔊 in the nearby-services window: reads the closest service of each type
function nearbyListenButton(data) {
  if (!('speechSynthesis' in window)) return '';
  const text = ['fuel', 'pharmacy', 'restaurant', 'cafe', 'bank']
    .filter(type => data[type] && data[type][0])
    .map(type => t('listen.nearby').replace('{type}', t('svc1.' + type))
      .replace('{name}', data[type][0].n).replace('{km}', data[type][0].km.toFixed(1)))
    .join(' ');
  if (!text) return '';
  const safe = text.replace(/"/g, '&quot;');
  return `<button type="button" class="peak-btn listen-btn" data-speak="${safe}" aria-label="${t('listen.label')}">${t('listen.btn')}</button>`;
}

// What gets read for a place: for now just its name.
// (To read more later, e.g. the description: return [tName(d), tDesc(d)].join('. ');)
function placeSpeechText(d) {
  return tName(d);
}

// The 🔊 button (empty if the browser can't speak)
function listenButton(i) {
  if (!('speechSynthesis' in window) || i < 0) return '';
  return `<button type="button" class="peak-btn listen-btn" data-listen="${i}" aria-label="${t('listen.label')}" title="${t('listen.label')}">${t('listen.btn')}</button>`;
}

// One click handler for every 🔊 button on the page, even ones added later
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-listen], [data-speak]');
  if (!btn) return;
  e.stopPropagation();
  if (btn.dataset.listen !== undefined) playPlaceName(+btn.dataset.listen, btn);
  else speak(btn.dataset.speak, btn);
}, true);

// ---- Recorded human voice for place names ----
// audio/ar/12.mp3 and audio/en/12.mp3 = the name of place 12 (place_id = position in DATA + 1),
// made once with a natural (neural) voice by scripts/make_audio.py.
// If a file isn't there (or can't play), we fall back to the device's voice.
let currentAudio = null;

function stopAudio() {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
}

function playPlaceName(i, btn) {
  const wasThisButton = speakingBtn === btn;
  stopAudio();
  if (window.speechSynthesis) speechSynthesis.cancel();
  if (speakingBtn) speakingBtn.textContent = t('listen.btn');
  speakingBtn = null;
  if (wasThisButton) return;                        // second press = stop

  const audio = new Audio(`audio/${currentLang}/${i + 1}.mp3`);
  currentAudio = audio;
  speakingBtn = btn; btn.textContent = t('listen.stop');
  const done = () => { if (currentAudio === audio) currentAudio = null; if (speakingBtn === btn) { btn.textContent = t('listen.btn'); speakingBtn = null; } };
  audio.onended = done;
  audio.onerror = () => {                           // no recording yet → device voice
    if (currentAudio !== audio) return;
    currentAudio = null; speakingBtn = null; btn.textContent = t('listen.btn');
    speak(placeSpeechText(DATA[i]), btn);
  };
  audio.play().catch(() => audio.onerror());
}

// Stop reading when the language changes or the page is left
document.addEventListener('langchange', () => { stopAudio(); window.speechSynthesis && speechSynthesis.cancel(); });
window.addEventListener('pagehide', () => { stopAudio(); window.speechSynthesis && speechSynthesis.cancel(); });

// ---- 🎤 Search by voice (SpeechRecognition) ----
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

// Words people add around a place name ("I want to go to AlUla", "وين الحجر") that aren't part of it
const VOICE_FILLER = new Set(normalizeSearch(
  'ابي ابغى ابغا اريد ودي اروح نروح روح وين فين دور دورلي ابحث بحث عن على لي في الى ابيك ممكن مكان اسمه ' +
  'i want wanna to go take me show search for find where is the please'
).split(' '));

// The names a place can be said by: the full name and each part, e.g. "حافة العالم (جبل فهرين)"
// → "حافة العالم جبل فهرين", "حافة العالم", "جبل فهرين"
function voiceNames(d) {
  const names = [];
  for (const full of [d.place_name_ar, d.place_name]) {
    if (!full) continue;
    names.push(full, ...full.split(/[()]/));
  }
  return names.map(withoutFiller).filter(n => n.length >= 3);
}
const withoutFiller = s => normalizeSearch(s).split(' ').filter(w => !VOICE_FILLER.has(w)).join(' ');

// Letters that sound alike count as half a mistake when compared by ear: vowels, and close sounds
const SOUND_GROUPS = ['aeiouwy', 'اوي', 'sz', 'ckq', 'صسث', 'ذزظض', 'تط', 'هح', 'قك'];
const soundGroup = ch => SOUND_GROUPS.findIndex(g => g.includes(ch));
const isVowel = ch => 'aeiouwyاوي'.includes(ch);

// Mistakes needed to turn a into b (the whole of both), counted by how it sounds
function editDistance(a, b) {
  const swap = (x, y) => x === y ? 0 : (soundGroup(x) >= 0 && soundGroup(x) === soundGroup(y) ? 0.5 : 1);
  const addOrDrop = ch => isVowel(ch) ? 0.5 : 1;
  let prev = [0];
  for (let j = 1; j <= b.length; j++) prev[j] = prev[j - 1] + addOrDrop(b[j - 1]);
  for (let i = 1; i <= a.length; i++) {
    const cur = [prev[0] + addOrDrop(a[i - 1])];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + addOrDrop(a[i - 1]), cur[j - 1] + addOrDrop(b[j - 1]),
                        prev[j - 1] + swap(a[i - 1], b[j - 1]));
    }
    prev = cur;
  }
  return prev[b.length];
}

// The speech engine doesn't know most place names, so it often writes a word that sounds close
// ("الحجز" for "الحجر"). We take its top guesses and find the place whose name is closest.
// Returns { text, place } — place is a DATA index, or null when nothing is close enough.
function voiceBestMatch(guesses) {
  const cleaned = guesses.map(withoutFiller).filter(Boolean);
  if (!cleaned.length) return { text: guesses[0] || '', place: null };

  // 1. A guess that already finds places with the normal search (e.g. a region like "الرياض"): keep it
  const direct = cleaned.find(g => DATA.some(d => matchesSearch(d, g)));
  if (direct) return { text: direct, place: null };

  // 2. Otherwise the place whose name is closest to any guess (a few wrong letters allowed).
  //    Either the whole guess sounds like the whole name, or the name is said inside a longer guess.
  let best = null;
  DATA.forEach((d, i) => voiceNames(d).forEach(name => cleaned.forEach(g => {
    const score = Math.min(editDistance(g, name) / Math.max(g.length, name.length),
                           fuzzyDistance(name, g) / name.length);   // share of letters that differ
    if (!best || score < best.score) best = { score, i };
  })));
  if (best && best.score <= 0.34) return { text: tName(DATA[best.i]), place: best.i };
  return { text: cleaned[0], place: null };
}

function setupVoiceSearch() {
  const input = document.getElementById('searchInput');
  if (!SpeechRec || !input) return;          // browser can't do it (e.g. Firefox): no button

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'mic-btn';
  input.parentElement.appendChild(btn);
  const status = document.createElement('div');
  status.className = 'mic-status';
  status.setAttribute('aria-live', 'polite');   // screen readers announce changes
  input.closest('.search-row').insertAdjacentElement('afterend', status);

  let rec = null;
  const idle = () => {
    btn.textContent = t('mic.btn'); btn.classList.remove('listening');
    btn.setAttribute('aria-label', t('mic.label')); btn.title = t('mic.label');
  };
  idle();
  document.addEventListener('langchange', idle);

  btn.addEventListener('click', () => {
    if (rec) { rec.stop(); return; }          // pressing again stops listening
    rec = new SpeechRec();
    rec.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
    rec.interimResults = true;                // show words while the person is still talking
    rec.maxAlternatives = 5;                  // the engine's top 5 guesses, not just the first
    // Newer Chrome can be told which words to expect, so it hears our place names better
    if (window.SpeechRecognitionPhrase && 'phrases' in rec) {
      try {
        rec.phrases = DATA.map(d => new SpeechRecognitionPhrase(currentLang === 'ar' ? d.place_name_ar : d.place_name, 5));
      } catch (err) { /* not supported in this browser: listen normally */ }
    }
    let heard = '';

    rec.onstart = () => {
      btn.textContent = t('mic.stop'); btn.classList.add('listening');
      status.textContent = t('mic.listening');
    };
    rec.onresult = e => {
      const results = Array.from(e.results);
      heard = results.map(r => r[0].transcript).join(' ').replace(/[.،,!?؟]+$/, '').trim();
      let text = heard;
      if (results.every(r => r.isFinal)) {
        // Finished talking: try every guess the engine gave and pick the closest place
        const guesses = Array.from(results[results.length - 1]).map(a => a.transcript);
        if (results.length > 1) guesses.unshift(heard);
        const match = voiceBestMatch(guesses);
        text = match.text;
        status.textContent = match.place !== null && normalizeSearch(heard) !== normalizeSearch(text)
          ? t('mic.heard').replace('{h}', heard).replace('{p}', text) : '';
      }
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true })); // run the normal search
    };
    rec.onerror = e => {
      status.textContent = (e.error === 'not-allowed' || e.error === 'service-not-allowed') ? t('mic.error') : t('mic.nothing');
    };
    rec.onend = () => {
      if (!heard && !status.textContent.startsWith(t('mic.error'))) status.textContent = t('mic.nothing');
      else if (heard && status.textContent === t('mic.listening')) status.textContent = '';
      rec = null; idle();
    };
    status.textContent = '';
    rec.start();
  });
}
document.addEventListener('DOMContentLoaded', setupVoiceSearch);
