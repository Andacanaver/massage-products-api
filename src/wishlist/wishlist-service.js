const WishlistService = {
    getAllWishlistsForUser(knex, id) {
        console.log(id)
        return knex
            .from('massage_wishlist_users')
            .where('massage_wishlist_users.user_id', id)
            .select('massage_wishlist_users.user_id', 'massage_wishlist_users.wishlist_id', 'massage_wishlist.wishlist_name')
            .leftJoin('massage_wishlist', 'massage_wishlist.id', 'massage_wishlist_users.wishlist_id')
    },
    getWishlistProducts(knex, id, userId) {
        console.log(id)
        console.log(userId)
        return knex
			.from("massage_wishlist AS wl")
			.where("wl.id", id)
			.select(
				"wl.wishlist_name",
				"wlp.wishlist_id",
				"wlp.product_id",
				"wlu.user_id"
			)
			.distinct("mp.product_name")
			.leftJoin(
				"massage_wishlist_products AS wlp",
				"wl.id",
				"wlp.wishlist_id"
			)
			.leftJoin("massage_products AS mp", "wlp.product_id", "mp.id")
			.join("massage_wishlist_users AS wlu", "wlu.user_id", userId);
            
            
    }
}

module.exports = WishlistService