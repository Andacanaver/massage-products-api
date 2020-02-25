TRUNCATE massage_wishlist RESTART IDENTITY CASCADE;

INSERT INTO massage_wishlist (user_id, wishlist_name, product_id)
VALUES 
    (1, 'Wishlist One', 1),(1, 'Wishlist One', 2),(1, 'Wishlist One', 3),(1, 'Wishlist One', 4),(1, 'Wishlist One', 5),(1, 'Wishlist One', 6),(1, 'Wishlist One', 7),(2, 'Wishlist One', 1),(2, 'Wishlist One', 2),(2, 'Wishlist One', 3),(3, 'Wishlist One', 1),(3, 'Wishlist One', 2),(3, 'Wishlist One', 3),(3, 'Wishlist One', 7),(4, 'Wishlist One', 1),(4, 'Wishlist One', 6),(5, 'Wishlist One', 1),(5, 'Wishlist One', 3),(2, 'Wishlist One', 6),(3, 'Wishlist One', 5);