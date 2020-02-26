const WishlistService = {
    getAllWishlistsByUserId(knex, id) {
        return knex
            .select('*')
            .from('massage_wishlist')
            .where('user_id', id)
    },
    updateWishlist(knex, )
}

module.exports = WishlistService