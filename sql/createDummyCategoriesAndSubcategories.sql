TRUNCATE TABLE business_category 
CASCADE;

INSERT INTO business_category (name) VALUES ('Tienda de Abarrotes'), ('Refaccionarias'), ('Ferreterias'), ('Tecnología'), ('Ropa'), ('Productos de Belleza');

INSERT INTO business_type (business_category_id, name)
SELECT 
(SELECT Id FROM business_category WHERE name = 'Tienda de Abarrotes') business_category_id,
business_type as name
FROM unnest(
    ARRAY[
        'Abarrotes',
        'Frutas y Verduras',
        'Minisuper',
        'Carnicería',
        'Vinatería'
    ]) as business_type;

INSERT INTO business_type (business_category_id, name)
SELECT Id, concat('dummy type of ', name) as business_type 
FROM business_category 
WHERE name <> 'Tienda de Abarrotes';

SELECT * FROM business_type;