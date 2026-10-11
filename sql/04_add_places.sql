-- Wajjahni: add the new places (Oct 2026) to the `places` table
-- Run this once, then re-run 03_nearest_services.sql and export the result again.

USE wajjahni;
SET NAMES utf8mb4;

INSERT INTO places (place_id, place_name, place_name_ar, city, region, type, latitude, longitude) VALUES
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

SELECT COUNT(*) AS total_places FROM places;
