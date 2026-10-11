-- Wajjahni: the 3 nearest services of each type for every tourist place
-- Run in MySQL Workbench after 01_import_services.sql and 02_import_places.sql.
-- Re-run it any time places or services change, then export the result to data/clean/nearest_services.csv.

USE wajjahni;

-- Only search services inside a ~220 km box around each place (2 degrees), which keeps the query light.
DROP TABLE IF EXISTS nearest_services;
CREATE TABLE nearest_services AS
SELECT place_id, place_name, service_type, service_name,
       latitude, longitude, ROUND(dist_m / 1000, 1) AS distance_km, rank_num
FROM (
    SELECT
        p.place_id,
        p.place_name,
        s.service_type,
        s.name AS service_name,
        s.latitude,
        s.longitude,
        ST_Distance_Sphere(POINT(p.longitude, p.latitude),
                           POINT(s.longitude, s.latitude)) AS dist_m,
        ROW_NUMBER() OVER (
            PARTITION BY p.place_id, s.service_type
            ORDER BY ST_Distance_Sphere(POINT(p.longitude, p.latitude),
                                        POINT(s.longitude, s.latitude))
        ) AS rank_num
    FROM places p
    JOIN services s
      ON  ABS(s.latitude  - p.latitude)  < 2
      AND ABS(s.longitude - p.longitude) < 2
    WHERE s.is_valid = 1
) AS ranked
WHERE rank_num <= 3;

SELECT * FROM nearest_services ORDER BY place_id, service_type, rank_num;
