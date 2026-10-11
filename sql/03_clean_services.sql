-- Wajjahni: clean the `services` table
-- Run this right after 01_import_services.sql (01 rebuilds the table, so the new columns don't exist yet).
-- It adds two columns:
--   city_clean : one spelling for each big city (the raw data has many spellings of the same city)
--   is_valid   : 0 for services whose name doesn't match their type (e.g. a restaurant listed as a pharmacy)

USE wajjahni;
SET NAMES utf8mb4;
SET SQL_SAFE_UPDATES = 0;   -- allow UPDATE without a key column in WHERE

-- ---------- 1) Clean city names ----------
ALTER TABLE services ADD COLUMN city_clean VARCHAR(100);

UPDATE services
SET city_clean = city;

UPDATE services
SET city_clean = 'Riyadh'
WHERE city IN ('الرياض', 'Riyadh', 'AL RIYADH', 'ALRIYADH', 'Al-Riyadh',
               'Ar Riyadh', 'Al Riyadh', 'Riyadh City', 'Riyadh.',
               'Riyadh, Saudi Arabia', 'Riyadh الرياض', 'الرياض Riyadh',
               'Riyadh | الرياض', 'Riyadh - الرياض');

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

-- ---------- 2) Flag misclassified services ----------
ALTER TABLE services ADD COLUMN is_valid TINYINT DEFAULT 1;

-- Pharmacies: the name must look like a pharmacy
UPDATE services
SET is_valid = 0
WHERE service_type = 'pharmacy'
  AND name NOT REGEXP 'صيدل|pharm|دواء|nahdi|نهدي|نهدى|whites|وايتس|boots|drug|chemist';

-- Gas stations: the name must look like a station or a known fuel brand
UPDATE services
SET is_valid = 0
WHERE service_type = 'fuel'
  AND name NOT REGEXP 'محط|بنزين|وقود|fuel|gas|petrol|station|ساسكو|sasco|دريس|drees|نفط|أرامكو|aramco|نفل|naft|shell|adnoc|ادنوك|enoc|اينوك|sahel|ساهل|سهل|total|توتال|oomco|اورانج';

-- Banks/ATMs: the name must look like a bank, an ATM, or a known bank/exchange brand
UPDATE services
SET is_valid = 0
WHERE service_type = 'bank'
  AND name NOT REGEXP 'بنك|مصرف|bank|صراف|atm|الراجحي|rajhi|الأهلي|الاهلي|snb|ncb|alinma|الإنماء|الانماء|البلاد|bilad|riyad|ساب|sabb|الجزيرة|jazira|anb|العربي|fransi|الفرنسي|bsf|nbd|stc pay|urpay|samba|سامبا|enjaz|انجاز|إنجاز|western union|ويسترن|tahweel|تحويل|express|exchange|صرافة|telemoney';

-- Check: how many services of each type are valid
SELECT service_type, SUM(is_valid) AS valid, SUM(is_valid = 0) AS flagged
FROM services
GROUP BY service_type;
