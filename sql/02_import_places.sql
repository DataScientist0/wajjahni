-- Wajjahni: create and fill the `places` table
-- Open this file in MySQL Workbench and run it with the lightning button.

CREATE DATABASE IF NOT EXISTS wajjahni CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wajjahni;
SET NAMES utf8mb4;

DROP TABLE IF EXISTS places;
CREATE TABLE places (
  place_id      INT          PRIMARY KEY,
  place_name    VARCHAR(255) NOT NULL,
  place_name_ar VARCHAR(255),
  city          VARCHAR(100),
  region        VARCHAR(100) NOT NULL,
  type          VARCHAR(50)  NOT NULL,
  latitude      DOUBLE       NOT NULL,
  longitude     DOUBLE       NOT NULL
);

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
(56, 'Clock Tower Museum', 'متحف برج الساعة', 'Makkah', 'Makkah', 'Cultural', 21.4187, 39.8256);

SELECT COUNT(*) AS rows_imported FROM places;
SELECT COUNT(*) FROM services;
SELECT COUNT(*) FROM places;