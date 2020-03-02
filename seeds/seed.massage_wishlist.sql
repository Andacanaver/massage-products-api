TRUNCATE 
    massage_wishlist,
    massage_wishlist_products
RESTART IDENTITY CASCADE;

INSERT INTO massage_wishlist (wishlist_name, user_id)
VALUES 
    ('Wishlist One', 1), ('Wishlist Two', 1), ('Wishlist Three', 2), ('Wishlist Four', 2), ('Wishlist Five', 3);

INSERT INTO massage_wishlist_products (product_id, wishlist_id)
VALUES
    (1, 1), (2, 1), (3, 1), (7, 1), (1, 2), (2, 2), (7, 3), (4, 3);