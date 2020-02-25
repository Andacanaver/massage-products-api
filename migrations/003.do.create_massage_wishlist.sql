CREATE TABLE massage_wishlist (
    user_id INTEGER REFERENCES massage_users(id) ON DELETE CASCADE NOT NULL,
    wishlist_name TEXT NOT NULL,
    product_id INTEGER REFERENCES massage_products(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id, product_id)
);
