-- =====================================================================
-- Wajjahni · Step 3 of 4: clean the `services` table
-- =====================================================================
-- Why this is needed:
--   Open map data is messy. Two problems showed up when we explored it:
--   1) The same city is written in many ways ('الرياض', 'Riyadh', 'AL RIYADH' ...).
--   2) Some services are in the wrong category. For example, KFC and Hardee's
--      were listed as pharmacies, and car repair shops as gas stations.
--
-- What this file does:
--   Adds two new columns and fills them:
--     city_clean : one standard spelling for the big cities
--     is_valid   : 1 = keep the service, 0 = wrong category, don't use it
--   Nothing is deleted. Flagged rows stay in the table, so we can review them.
--
-- How to run:
--   Run it ONCE, right after step 1. (Step 1 rebuilds the table without these
--   columns. Running this file twice gives "Duplicate column name", because
--   the columns already exist.)
-- =====================================================================

USE wajjahni;
SET NAMES utf8mb4;

-- Workbench's "safe update mode" blocks UPDATEs that don't filter on the primary key,
-- to protect you from changing a whole table by mistake. Here we do want to update
-- many rows at once, so we turn it off for this session.
SET SQL_SAFE_UPDATES = 0;


-- =====================================================================
-- Part 1: standardize city names
-- =====================================================================

-- Add an empty column for the cleaned name. We keep the original `city` column
-- untouched, so we can always compare before and after.
ALTER TABLE services ADD COLUMN city_clean VARCHAR(100);

-- Start by copying every city as it is. Cities we don't fix below keep their original spelling.
UPDATE services
SET city_clean = city;

-- Riyadh has the most spellings, so it gets its own UPDATE.
-- `IN (...)` is a short way to write: city = 'a' OR city = 'b' OR city = 'c' ...
UPDATE services
SET city_clean = 'Riyadh'
WHERE city IN ('الرياض', 'Riyadh', 'AL RIYADH', 'ALRIYADH', 'Al-Riyadh',
               'Ar Riyadh', 'Al Riyadh', 'Riyadh City', 'Riyadh.',
               'Riyadh, Saudi Arabia', 'Riyadh الرياض', 'الرياض Riyadh',
               'Riyadh | الرياض', 'Riyadh - الرياض');

-- The other big cities in one UPDATE.
-- CASE works like if / else if / else: MySQL checks each WHEN in order and uses
-- the first one that matches. ELSE city_clean = "no match, keep the current value".
UPDATE services
SET city_clean = CASE
    WHEN city IN ('جدة','جده','Jeddah','Jiddah','Western | Jeddah','Jeddah - جدة','محافظة جدة',
                  'North Jeddah','جدة jeddah','Jeddah..جدة','جده | jeddah','Jeddah جده') THEN 'Jeddah'
    WHEN city IN ('مكة','مكه','مكة المكرمة','Mecca','Makkah','Makkah Al Mukarramah',
                  'مكة المكرمة Makkah','مكة..','Makkah | مكة المكرمة','مكة Makkah') THEN 'Makkah'
    WHEN city IN ('المدينة','المدينة المنورة','Medina','AL MADINA AL MUNAWWRA','Madinah','Madina',
                  'Al Madinah','AlMadinah','Al Madinah Al Munawwarah','Western | Madinah',
                  'Al Madina Al Monearah','Al - Madinah','Al-Madina Al-Munawwara','AlMadina') THEN 'Madinah'
    WHEN city IN ('الدمام','Dammam','AL DAMMAM','Eastern/ Dammam','Ad Dammam','محافظة الدمام','Dammam City') THEN 'Dammam'
    WHEN city IN ('الخبر','Al Khobar','Khobar','Al-Khobar','Al khobar الخبر','Al-Khobar / الخبر','Eastern/ khobar') THEN 'Al Khobar'
    WHEN city IN ('الأحساء','الاحساء','Al Hofuf','Al Ahsa','الهفوف','محافظة الأحساء','Hofuf',
                  'الهفوف و المبرز','Hofuf/Hassa','Alahsa') THEN 'Al-Ahsa'
    WHEN city IN ('الطائف','AL TAIF','Taif','At Taif','الطائف | Taif') THEN 'Taif'
    WHEN city IN ('ابها','أبها','Abha') THEN 'Abha'
    WHEN city IN ('تبوك','Tabuk','محافظة تبوك') THEN 'Tabuk'
    WHEN city IN ('بريدة','Buraydah','Buraidah','Buraida','بريدة | Buraydah') THEN 'Buraydah'
    ELSE city_clean
END;


-- =====================================================================
-- Part 2: flag services that are in the wrong category
-- =====================================================================

-- New column. DEFAULT 1 means every existing row starts as valid (1).
-- The UPDATEs below set the wrong ones to 0.
ALTER TABLE services ADD COLUMN is_valid TINYINT DEFAULT 1;

-- How the rules work:
--   REGEXP checks if the name contains a pattern. The | sign means "or", so
--   'صيدل|pharm' matches any name containing "صيدل" OR "pharm".
--   NOT REGEXP = the name contains NONE of the words.
--   Matching ignores upper/lower case (because of the _ci collation from step 1).
--   Known brand names (Nahdi, Al Rajhi, Sasco ...) are in the lists, so real
--   branches whose name is only the brand are not flagged by mistake.

-- Pharmacies: flag the ones whose name doesn't look like a pharmacy (698 rows).
UPDATE services
SET is_valid = 0
WHERE service_type = 'pharmacy'
  AND name NOT REGEXP 'صيدل|pharm|دواء|nahdi|نهدي|نهدى|whites|وايتس|boots|drug|chemist';

-- Gas stations: flag the ones whose name doesn't look like a station or a fuel brand (147 rows).
UPDATE services
SET is_valid = 0
WHERE service_type = 'fuel'
  AND name NOT REGEXP 'محط|بنزين|وقود|fuel|gas|petrol|station|ساسكو|sasco|دريس|drees|نفط|أرامكو|aramco|نفل|naft|shell|adnoc|ادنوك|enoc|اينوك|sahel|ساهل|سهل|total|توتال|oomco|اورانج';

-- Banks/ATMs: flag the ones whose name doesn't look like a bank, an ATM, or a money-exchange brand (68 rows).
UPDATE services
SET is_valid = 0
WHERE service_type = 'bank'
  AND name NOT REGEXP 'بنك|مصرف|bank|صراف|atm|الراجحي|rajhi|الأهلي|الاهلي|snb|ncb|alinma|الإنماء|الانماء|البلاد|bilad|riyad|ساب|sabb|الجزيرة|jazira|anb|العربي|fransi|الفرنسي|bsf|nbd|stc pay|urpay|samba|سامبا|enjaz|انجاز|إنجاز|western union|ويسترن|tahweel|تحويل|express|exchange|صرافة|telemoney';

-- Restaurants and cafes are not filtered: their categories were accurate when we checked.


-- =====================================================================
-- Check the result
-- =====================================================================
-- For each service type: how many are valid and how many were flagged.
-- SUM(is_valid) counts the 1s. SUM(is_valid = 0) counts the rows where the condition
-- is true, because in MySQL a true condition equals 1 and a false one equals 0.
SELECT service_type,
       SUM(is_valid)     AS valid,
       SUM(is_valid = 0) AS flagged
FROM services
GROUP BY service_type;
