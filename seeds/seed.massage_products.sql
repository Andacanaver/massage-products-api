TRUNCATE
    massage_products
    RESTART IDENTITY CASCADE;

INSERT INTO massage_products (product_name, product_type, product_description, price, product_image)
VALUES
    ('Product One', 'Oil', 'This is one of the products that is available', 2.95, 'https://drive.google.com/open?id=1gELS_WepbCpS7plFs0By9TCPoK8pmSf4'),
    ('Product Two', 'Spray', 'This is product two of the products that is available', 2.95, 'https://drive.google.com/open?id=1zmsT1t9tzmy53XnJeUPA7i1uaEbpLXrp'),
    ('Product Three', 'Device', 'This is product three of the products that is available', 2.95, 'https://drive.google.com/open?id=1_RyFNEijO0kzPqzUG481yXrBqIuxyBf0'),
    ('Product Four', 'Cream', 'This is product four of the products that is available', 2.95, ''),
    ('Product Five', 'Oil', 'This is product five of the products that is available', 2.95, 'https://drive.google.com/open?id=1gELS_WepbCpS7plFs0By9TCPoK8pmSf4'),
    ('Product Six', 'Cream', 'This is product six of the products that is available', 2.95, 'https://drive.google.com/open?id=1_RyFNEijO0kzPqzUG481yXrBqIuxyBf0'),
    ('Product Seven', 'Spray', 'This is product seven of the products that is available', 2.95, '');