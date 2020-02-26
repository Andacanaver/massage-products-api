const WishlistService = {
    getAllWishlistsForUser(knex, id) {
        return knex
            .from('massage_wishlist')
            .where('massage_wishlist.user_id', id)
            .select('massage_wishlist.user_id', 'massage_wishlist.wishlist_name', 'massage_wishlist.id')
            
	},
    getWishlistProducts(knex, id, userId) {
        return knex
			.from("massage_wishlist AS wl")
			.where({"wl.id": id, "wl.user_id": userId})
			.select(
				"wl.wishlist_name",
				"wlp.wishlist_id",
				"wlp.product_id",
				"wl.user_id",
				'mp.id'
			)
			.distinct("mp.product_name")
			.leftJoin(
				"massage_wishlist_products AS wlp",
				"wl.id",
				"wlp.wishlist_id"
			)
			.leftJoin("massage_products AS mp", "wlp.product_id", "mp.id")
			
	},
	insertWishlist(knex, newWishlist) {
		return knex
			.insert(newWishlist)
			.into('massage_wishlist')
			.returning('*')
			.then(([wishlist]) => wishlist)
	},
	insertProduct(knex, newProduct){
		return knex
			.insert(newProduct)
			.into('massage_wishlist_products')
			.returning('*')
			.then(([wishlistProduct]) => wishlistProduct)
	},
	getProductId(knex, id) {
		return knex
			.from('massage_products')
			.select('id')
			.where('id', id)
			.first();
	}
}

module.exports = WishlistService