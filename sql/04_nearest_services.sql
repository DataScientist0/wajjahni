-- =====================================================================
-- Wajjahni · Step 4 of 4: the 3 nearest services of each type for every place
-- =====================================================================
-- What this file does:
--   For each of the 72 tourist places, finds the 3 closest gas stations,
--   pharmacies, restaurants, cafes, and banks/ATMs, and saves them in a new
--   table `nearest_services` (72 places x 5 types x 3 = up to 1,080 rows).
--
-- How to run:
--   Run it after steps 1, 2 and 3. Re-run it whenever places or services change.
--   Then export the result grid to data/clean/nearest_services.csv; the website's
--   services.js file is built from that CSV.
-- =====================================================================

USE wajjahni;


-- Start fresh: remove the old result table if it exists.
DROP TABLE IF EXISTS nearest_services;

-- CREATE TABLE ... AS SELECT: run a query and save its result as a new table.
CREATE TABLE nearest_services AS

-- ---------------------------------------------------------------------
-- OUTER query: keep only the top 3 of each group, and tidy the columns.
-- It reads from the inner query below, which we named `ranked`.
-- ---------------------------------------------------------------------
SELECT place_id, place_name, service_type, service_name,
       latitude, longitude,
       ROUND(dist_m / 1000, 1) AS distance_km,   -- meters -> kilometers, 1 decimal (e.g. 2.4)
       rank_num
FROM (

    -- -----------------------------------------------------------------
    -- INNER query (a subquery): pair each place with the services around it,
    -- measure every distance, and number the services from nearest to farthest.
    -- -----------------------------------------------------------------
    SELECT
        p.place_id,
        p.place_name,
        s.service_type,
        s.name AS service_name,
        s.latitude,
        s.longitude,

        -- Distance in meters between the place and the service.
        -- ST_Distance_Sphere measures along the Earth's curve (not a flat line).
        -- POINT takes (longitude, latitude), in that order: x first, then y.
        ST_Distance_Sphere(POINT(p.longitude, p.latitude),
                           POINT(s.longitude, s.latitude)) AS dist_m,

        -- ROW_NUMBER() is a window function: it numbers rows 1, 2, 3 ... inside groups.
        --   PARTITION BY place_id, service_type -> a separate group for each place AND
        --     each service type, so the numbering starts again at 1 for "Masmak + cafes",
        --     "Masmak + pharmacies", "Ithra + cafes", and so on.
        --   ORDER BY distance -> inside each group, the nearest service gets number 1.
        -- (We repeat the distance formula here because SQL doesn't let you use the
        --  alias dist_m in the same SELECT where it is created.)
        ROW_NUMBER() OVER (
            PARTITION BY p.place_id, s.service_type
            ORDER BY ST_Distance_Sphere(POINT(p.longitude, p.latitude),
                                        POINT(s.longitude, s.latitude))
        ) AS rank_num

    FROM places p          -- p and s are short aliases for the table names
    JOIN services s

      -- Only pair a place with services less than 2 degrees away (about 220 km).
      -- Without this, MySQL would measure 72 x 32,500 = 2.3 million distances and
      -- fill up the disk with temporary data. The 3 nearest services are always
      -- much closer than 220 km, so the result is the same, just much faster.
      ON  ABS(s.latitude  - p.latitude)  < 2
      AND ABS(s.longitude - p.longitude) < 2

    -- Skip services flagged as wrong category in step 3.
    WHERE s.is_valid = 1

) AS ranked                -- MySQL requires every subquery in FROM to have a name

-- Keep numbers 1, 2 and 3 only = the 3 nearest of each type.
-- (This filter has to be in the outer query: WHERE runs before window functions,
--  so rank_num doesn't exist yet inside the inner query's WHERE.)
WHERE rank_num <= 3;


-- ---------------------------------------------------------------------
-- Show the result, ready to export.
-- LIMIT 5000: without a LIMIT, Workbench shows only the first 1,000 rows, and we have
-- 1,110, so the exported CSV would be missing the last places.
-- ---------------------------------------------------------------------
SELECT *
FROM nearest_services
ORDER BY place_id, service_type, rank_num
LIMIT 5000;
