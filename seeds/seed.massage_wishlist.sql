TRUNCATE 
    massage_wishlist,
    massage_wishlist_users,
    massage_wishlist_products
RESTART IDENTITY CASCADE;

INSERT INTO massage_wishlist (wishlist_name)
VALUES 
    ('Wishlist One'), ('Wishlist Two'), ('Wishlist Three'), ('Wishlist Four'), ('Wishlist Five');

INSERT INTO massage_wishlist_users (user_id, wishlist_id)
VALUES
    (1, 1), (1, 2), (2, 3), (2, 4);

INSERT INTO massage_wishlist_products (product_id, wishlist_id)
VALUES
    (1, 1), (2, 1), (3, 1), (7, 1), (1, 2), (2, 2), (7, 3), (4, 3);