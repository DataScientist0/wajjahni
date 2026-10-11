-- =====================================================================
-- Wajjahni · Step 2 of 4: create and fill the `places` table
-- =====================================================================
-- What this file does:
--   Loads the 74 tourist places shown on the website.
--
-- Where the data comes from:
--   data/clean/places.csv, which is a copy of data.js (the website's dataset).
--   place_id = the place's position in data.js + 1, so the website can match
--   each place with its nearby services later.
--
-- How to run:
--   Run it after step 1 (it uses the same database).
--   Re-run it whenever places are added or changed, then run step 4 again.
-- =====================================================================


-- Same database settings as step 1 (safe to repeat).
CREATE DATABASE IF NOT EXISTS wajjahni CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wajjahni;
SET NAMES utf8mb4;


-- Start fresh: remove the old table if it exists.
DROP TABLE IF EXISTS places;

-- One row = one tourist place.
CREATE TABLE places (
  place_id      INT          PRIMARY KEY,  -- 1, 2, 3 ... (matches the order in data.js)
  place_name    VARCHAR(255) NOT NULL,     -- English name
  place_name_ar VARCHAR(255),              -- Arabic name
  city          VARCHAR(100),              -- nearest city (NULL if the place is far from any city)
  region        VARCHAR(100) NOT NULL,     -- one of the 13 regions of Saudi Arabia
  type          VARCHAR(50)  NOT NULL,     -- Historical, Natural, Religious, Cultural, or Entertainment
  latitude      DOUBLE       NOT NULL,
  longitude     DOUBLE       NOT NULL
);


-- Load the 74 places.
INSERT INTO places (place_id, place_name, place_name_ar, city, region, type, latitude, longitude) VALUES
(1, 'Edge of the World (Jabal Fihrayn)', 'حافة العالم (جبل فهرين)', NULL, 'Riyadh', 'Natural', 24.95, 45.9333),
(2, 'At-Turaif District (Diriyah)', 'حي الطريف (الدرعية)', 'Diriyah', 'Riyadh', 'Historical', 24.7332, 46.5749),
(3, 'National Museum', 'المتحف الوطني', 'Riyadh', 'Riyadh', 'Cultural', 24.6408, 46.7159),
(4, 'Kingdom Centre Tower', 'برج المملكة', 'Riyadh', 'Riyadh', 'Entertainment', 24.7116, 46.6753),
(5, 'Wadi Hanifah', 'وادي حنيفة', 'Riyadh', 'Riyadh', 'Natural', 24.65, 46.68),
(6, 'Masjid al-Haram', 'المسجد الحرام', 'Makkah', 'Makkah', 'Religious', 21.4225, 39.8262),
(7, 'Jabal al-Nour (Cave of Hira)', 'جبل النور (غار حراء)', 'Makkah', 'Makkah', 'Religious', 21.4578, 39.8592),
(8, 'Al-Balad (Historic Jeddah)', 'البلد (جدة التاريخية)', 'Jeddah', 'Makkah', 'Historical', 21.4858, 39.1925),
(9, 'Jeddah Corniche', 'كورنيش جدة', 'Jeddah', 'Makkah', 'Natural', 21.5433, 39.1579),
(10, 'King Fahd''s Fountain', 'نافورة الملك فهد', 'Jeddah', 'Makkah', 'Entertainment', 21.5769, 39.1039),
(11, 'Al-Masjid an-Nabawi', 'المسجد النبوي', 'Madinah', 'Madinah', 'Religious', 24.4672, 39.6111),
(12, 'Quba Mosque', 'مسجد قباء', 'Madinah', 'Madinah', 'Religious', 24.4394, 39.6172),
(13, 'Hegra (Mada''in Salih)', 'الحِجر (مدائن صالح)', 'AlUla', 'Madinah', 'Historical', 26.7944, 37.953),
(14, 'Elephant Rock', 'جبل الفيل', 'AlUla', 'Madinah', 'Natural', 26.6266, 37.9107),
(15, 'Mount Uhud', 'جبل أحد', 'Madinah', 'Madinah', 'Historical', 24.5024, 39.6094),
(16, 'Buraydah Central Market', 'سوق بريدة المركزي', 'Buraydah', 'Al-Qassim', 'Cultural', 26.3592, 43.9819),
(17, 'Unaizah Old Town', 'عنيزة القديمة', 'Unaizah', 'Al-Qassim', 'Historical', 26.0844, 43.9856),
(18, 'Al-Bassam Historic House', 'بيت البسام التراثي', 'Unaizah', 'Al-Qassim', 'Historical', 26.09, 43.98),
(19, 'Al-Asyah Lake', 'بحيرة الأسياح', 'Al-Asyah', 'Al-Qassim', 'Natural', 26.1667, 43.5333),
(20, 'Half Moon Bay', 'شاطئ نصف القمر', 'Al Khobar', 'Eastern Province', 'Natural', 26.122, 50.1),
(21, 'Qatif Old Town', 'القطيف القديمة', 'Qatif', 'Eastern Province', 'Historical', 26.5205, 50.0086),
(22, 'Tarout Castle', 'قلعة تاروت', 'Qatif', 'Eastern Province', 'Historical', 26.573, 50.052),
(23, 'Dammam Corniche', 'كورنيش الدمام', 'Dammam', 'Eastern Province', 'Entertainment', 26.4344, 50.1033),
(24, 'Al-Ahsa Oasis', 'واحة الأحساء', 'Al-Ahsa', 'Eastern Province', 'Natural', 25.3833, 49.5833),
(25, 'Abha Lake Park', 'منتزه بحيرة أبها', 'Abha', 'Aseer', 'Natural', 18.2465, 42.5117),
(26, 'Rijal Almaa Heritage Village', 'قرية رجال ألمع التراثية', 'Rijal Almaa', 'Aseer', 'Historical', 18.1667, 42.4167),
(27, 'Al-Soudah', 'السودة', 'Abha', 'Aseer', 'Natural', 18.2697, 42.3653),
(28, 'Abha Cable Car', 'تلفريك أبها', 'Abha', 'Aseer', 'Entertainment', 18.235, 42.49),
(29, 'Tabuk Castle', 'قلعة تبوك', 'Tabuk', 'Tabuk', 'Historical', 28.3993, 36.582),
(30, 'Gulf of Aqaba Beaches', 'شواطئ خليج العقبة', 'Haql', 'Tabuk', 'Natural', 28.0, 34.8),
(31, 'Disi Desert', 'صحراء الديسة', 'Disah', 'Tabuk', 'Natural', 28.5, 36.0),
(32, 'Qishlah Palace', 'قصر القشلة', 'Hail', 'Hail', 'Historical', 27.5136, 41.69),
(33, 'A''arif Fort', 'قلعة أعيرف', 'Hail', 'Hail', 'Historical', 27.5219, 41.6907),
(34, 'Jubbah Rock Art', 'الرسوم الصخرية في جبة', 'Jubbah', 'Hail', 'Historical', 28.0231, 40.8994),
(35, 'Al-Ukhdood Archaeological Site', 'موقع الأخدود الأثري', 'Najran', 'Najran', 'Historical', 17.4874, 44.1421),
(36, 'Najran Dam', 'سد نجران', 'Najran', 'Najran', 'Natural', 17.55, 44.15),
(37, 'Old Najran Mudbrick Houses', 'بيوت نجران الطينية القديمة', 'Najran', 'Najran', 'Historical', 17.49, 44.13),
(38, 'Farasan Islands', 'جزر فرسان', 'Farasan', 'Jazan', 'Natural', 16.7083, 41.9),
(39, 'Jazan Corniche', 'كورنيش جازان', 'Jazan', 'Jazan', 'Entertainment', 16.8892, 42.5511),
(40, 'Al Idabi Waterfall', 'شلال الإدابي', 'Fayfa', 'Jazan', 'Natural', 17.2333, 43.1),
(41, 'Raghadan Forest Park', 'منتزه غابة رغدان', 'Al-Baha', 'Al-Baha', 'Natural', 20.0129, 41.4677),
(42, 'Al-Baha Zipline', 'زيبلاين الباحة', 'Al-Baha', 'Al-Baha', 'Entertainment', 20.01, 41.46),
(43, 'Dhee Ain Village (Marble Village)', 'قرية ذي عين (القرية الرخامية)', 'Al-Makhwah', 'Al-Baha', 'Historical', 19.8926, 41.4694),
(44, 'Zaabal Castle', 'قلعة زعبل', 'Sakaka', 'Al-Jouf', 'Historical', 29.9697, 40.2064),
(45, 'Marid Castle', 'قلعة مارد', 'Dumat Al-Jandal', 'Al-Jouf', 'Historical', 29.8129, 39.8664),
(46, 'Dumat Al-Jandal Lake', 'بحيرة دومة الجندل', 'Dumat Al-Jandal', 'Al-Jouf', 'Natural', 29.81, 39.87),
(47, 'North Borders Museum', 'متحف الحدود الشمالية', 'Arar', 'Northern Borders', 'Cultural', 30.9756, 41.0388),
(48, 'Al-Gharaba Nature Reserve', 'محمية الغرابة', NULL, 'Northern Borders', 'Natural', 31.0, 41.5),
(49, 'Linah Heritage Village', 'قرية لينة التراثية', 'Rafha', 'Northern Borders', 'Historical', 31.6833, 38.65),
(50, 'Shura Island', 'جزيرة شورى', NULL, 'Tabuk', 'Natural', 25.0167, 36.9333),
(51, 'Shebara Island', 'جزيرة الشيبارة', NULL, 'Tabuk', 'Natural', 25.2, 36.85),
(52, 'Abu Ali Island', 'جزيرة أبو علي', 'Jubail', 'Eastern Province', 'Natural', 27.3667, 49.55),
(53, 'Karan Island', 'جزيرة كُرَان', 'Jubail', 'Eastern Province', 'Natural', 27.0333, 49.85),
(54, 'Farasan Al-Kabir Island', 'جزيرة فرسان الكبرى', 'Farasan', 'Jazan', 'Natural', 16.7, 41.9333),
(55, 'Qiddiya City', 'مدينة القدية', 'Riyadh', 'Riyadh', 'Entertainment', 24.5881, 46.3386),
(56, 'Clock Tower Museum', 'متحف برج الساعة', 'Makkah', 'Makkah', 'Cultural', 21.4187, 39.8256),
(57, 'Masmak Fortress', 'قصر المصمك', 'Riyadh', 'Riyadh', 'Historical', 24.6311, 46.7133),
(58, 'Boulevard City', 'بوليفارد سيتي', 'Riyadh', 'Riyadh', 'Entertainment', 24.7503, 46.6133),
(59, 'Al-Shafa', 'الشفا', 'Taif', 'Makkah', 'Natural', 21.0694, 40.3119),
(60, 'Al-Hada', 'الهدا', 'Taif', 'Makkah', 'Natural', 21.3686, 40.2847),
(61, 'Shubra Palace', 'قصر شبرا', 'Taif', 'Makkah', 'Historical', 21.2864, 40.415),
(62, 'AlUla Old Town', 'البلدة القديمة بالعلا', 'AlUla', 'Madinah', 'Historical', 26.6257, 37.9151),
(63, 'Maraya', 'مرايا', 'AlUla', 'Madinah', 'Entertainment', 26.7435, 37.8654),
(64, 'Ithra (King Abdulaziz Center for World Culture)', 'إثراء (مركز الملك عبدالعزيز الثقافي العالمي)', 'Dhahran', 'Eastern Province', 'Cultural', 26.3355, 50.1209),
(65, 'City Walk', 'سيتي ووك', 'Dhahran', 'Eastern Province', 'Entertainment', 26.3061, 50.1836),
(66, 'Khobar Water Tower', 'برج المياه بالخبر', 'Al Khobar', 'Eastern Province', 'Entertainment', 26.3076, 50.2317),
(67, 'Khobar Corniche', 'كورنيش الخبر', 'Al Khobar', 'Eastern Province', 'Natural', 26.3017, 50.2275),
(68, 'Ajdan Walk', 'أجدان ووك', 'Al Khobar', 'Eastern Province', 'Entertainment', 26.2835, 50.2194),
(69, 'Jabal Al-Qarah', 'جبل القارة', 'Al-Ahsa', 'Eastern Province', 'Natural', 25.41, 49.6885),
(70, 'Al-Habala Village', 'قرية الحبلة', 'Al-Habala', 'Aseer', 'Natural', 18.0381, 42.8727),
(71, 'Jabal al-Lawz', 'جبل اللوز', NULL, 'Tabuk', 'Natural', 28.654, 35.304),
(72, 'Aja Mountains', 'جبال أجا', 'Hail', 'Hail', 'Natural', 27.5, 41.6),
(73, 'Fayfa Mountains', 'جبال فيفاء', 'Fayfa', 'Jazan', 'Natural', 17.25, 43.1),
(74, 'Rajajil Columns', 'أعمدة الرجاجيل', 'Sakaka', 'Al-Jouf', 'Historical', 29.8125, 40.22);

-- Check: should return 74.
SELECT COUNT(*) AS rows_imported FROM places;
