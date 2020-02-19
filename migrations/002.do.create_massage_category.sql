CREATE TYPE product_category AS ENUM (
    'Oil',
    'Cream',
    'Spray',
    'Device'
);

ALTER TABLE massage_products
    ADD COLUMN
        product_type product_category;