TRUNCATE
    massage_products
    RESTART IDENTITY CASCADE;

INSERT INTO massage_products (product_name, product_type, product_description, price, product_image)
VALUES
    ('Product One', 'Oil', 'This is one of the products that is available', 2.95, 'https://i.imgur.com/KAXS4UJ.jpg'),
    ('Product Two', 'Spray', 'This is product two of the products that is available', 2.95, 'https://i.imgur.com/OAvQvBu.jpg'),
    ('Product Three', 'Device', 'This is product three of the products that is available', 2.95, 'https://i.imgur.com/OAvQvBu.jpg'),
    ('Product Four', 'Cream', 'This is product four of the products that is available', 2.95, 'https://i.imgur.com/5IxjHVW.jpg'),
    ('Product Five', 'Oil', 'This is product five of the products that is available', 2.95, 'https://i.imgur.com/KAXS4UJ.jpg'),
    ('Product Six', 'Cream', 'This is product six of the products that is available', 2.95, 'https://i.imgur.com/5IxjHVW.jpg'),
    ('Product Seven', 'Spray', 'This is product seven of the products that is available', 2.95, 'https://i.imgur.com/OAvQvBu.jpg');