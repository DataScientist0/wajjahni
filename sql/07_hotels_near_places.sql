-- =====================================================================
-- Wajjahni · Step 7: hotels around every tourist place
-- =====================================================================
-- What this file does:
--   For each of the 74 places, lists the hotels around it, nearest first,
--   and saves them in a new table `place_hotels`. The trip cost estimator shows
--   this list so travelers can choose where to stay.
--
-- Which hotels are kept for each place:
--   - every hotel within 30 km, so travelers see the whole choice, not just a few;
--   - but at least the 10 nearest, even if they are farther than 30 km
--     (remote places like Jabal al-Lawz have no hotels within 30 km);
--   - and at most the 1,000 nearest, to keep the website file a reasonable size
--     (only matters in big cities like Riyadh and Makkah).
--
-- How to run:
--   Run after steps 2, 5 and 6. Then export the result grid to
--   data/clean/place_hotels.csv; the website's hotels.js file is built from it.
-- =====================================================================

USE wajjahni;

DROP TABLE IF EXISTS place_hotels;

CREATE TABLE place_hotels AS

-- OUTER query: apply the "30 km / at least 10 / at most 1,000" rule.
SELECT place_id, place_name, hotel_id, hotel_name, category,
       latitude, longitude,
       ROUND(dist_m / 1000, 1) AS distance_km,    -- meters -> km
       rank_num
FROM (

    -- INNER query: pair each place with the hotels around it,
    -- measure the distance, and number the hotels from nearest to farthest.
    SELECT
        p.place_id,
        p.place_name,
        h.id   AS hotel_id,
        h.name AS hotel_name,
        h.category,
        h.latitude,
        h.longitude,
        ST_Distance_Sphere(POINT(p.longitude, p.latitude),
                           POINT(h.longitude, h.latitude)) AS dist_m,

        -- Same idea as step 4, but only PARTITION BY place_id:
        -- here we want one ranking per place (all hotels together),
        -- not one ranking per type.
        ROW_NUMBER() OVER (
            PARTITION BY p.place_id
            ORDER BY ST_Distance_Sphere(POINT(p.longitude, p.latitude),
                                        POINT(h.longitude, h.latitude))
        ) AS rank_num

    FROM places p
    JOIN hotels h
      -- Same ~220 km box as step 4, so MySQL doesn't measure every pair.
      ON  ABS(h.latitude  - p.latitude)  < 2
      AND ABS(h.longitude - p.longitude) < 2
    WHERE h.is_valid = 1                -- skip rows flagged in step 6

) AS ranked
WHERE (dist_m <= 30000 OR rank_num <= 10)   -- within 30 km, or one of the 10 nearest
  AND rank_num <= 1000;                     -- but never more than 1,000 per place


-- Show the result, ready to export.
-- LIMIT 50000: Workbench shows only 1,000 rows by default, and this table is much bigger.
SELECT *
FROM place_hotels
ORDER BY place_id, rank_num
LIMIT 50000;
