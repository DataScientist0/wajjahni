-- =====================================================================
-- Wajjahni · Step 6: clean the `hotels` table
-- =====================================================================
-- Why this is needed:
--   Like the services, some "hotels" in the open data are not places you can stay:
--   booking agencies, workers' housing compounds, restaurants, streets and districts,
--   or entries the source itself isn't sure about.
--
-- What this file does:
--   Adds an `is_valid` column (1 = keep, 0 = don't show) and flags those rows.
--   Nothing is deleted, so flagged rows can still be reviewed.
--
-- How to run:
--   Run it ONCE, right after step 5 (running it twice gives "Duplicate column name").
-- =====================================================================

USE wajjahni;
SET NAMES utf8mb4;
SET SQL_SAFE_UPDATES = 0;   -- allow UPDATE on many rows at once (see step 3)

-- Every hotel starts as valid (1).
ALTER TABLE hotels ADD COLUMN is_valid TINYINT DEFAULT 1;


-- Rule 1: low confidence.
-- Overture gives each place a confidence score from 0 to 1. Below 0.4, many entries
-- turned out to be duplicates, closed places, or not hotels at all.
UPDATE hotels
SET is_valid = 0
WHERE confidence < 0.4;


-- Rule 2: booking agencies and companies, even if the name says "hotel".
-- Names like "حجوزات فنادق مكة" (Makkah hotel bookings) are agencies, not hotels.
UPDATE hotels
SET is_valid = 0
WHERE name REGEXP 'حجوزات|حجز|اسعار|أسعار|معتمرين|تنظيم|رحلات|لإدارة|تسويق|management|holding';


-- Rule 3: names that clearly belong to something else (a restaurant, a compound,
-- a street, a district, a hospital ...).
-- Unlike pharmacies, many real hotels have brand-only names ("Shaza Makkah"),
-- so we can't require the word "hotel". Instead we flag names that contain a
-- "not a hotel" word...
--   ^[A-Z0-9]{4}\\+  = names that are just a map code, like "F5PM+859"
--   saudi arabia, ksa, /  = names that are just an address, like "Ar-Rabiyah, Dhahran, Saudi Arabia"
-- ...unless the name ALSO contains a hotel word (second REGEXP), so that
-- "Clarion Hotel Jeddah Airport" or "Al Koot Heritage Hotel and Restaurant" stay valid.
UPDATE hotels
SET is_valid = 0
WHERE name REGEXP 'subway|صب واي|قاعة افراح|قاعة أفراح|travel|tours|turizm|سياحة|مكتب|office|company|شركة|factory|مصنع|commercial port|ميناء|compound|district|حي |street|شارع|^[A-Z0-9]{4}\\+|accommodation|accomodation|سكن عمال|labor|labour|for oud|divers|غوص|مطعم|restaurant|cafe|كافيه|صيدل|pharm|hospital|مستشفى|clinic|عياد|school|مدرس|salon|صالون|اللهم|المملكه|السعوديه|brgy|saudi arabia|\\bksa\\b|/'
  AND name NOT REGEXP 'hotel|فندق|فنادق|inn\\b|resort|منتجع|suite|سويت|أجنحة|اجنحة|residence|boudl|بودل|استراحة|شاليه|chalet|@home|tulip|ibis|tower|ابراج|أبراج';


-- Check: how many of each category are valid and how many were flagged.
SELECT category,
       SUM(is_valid)     AS valid,
       SUM(is_valid = 0) AS flagged
FROM hotels
GROUP BY category;
