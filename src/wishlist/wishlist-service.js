const WishlistService = {
    getAllWishlistsForUser(knex, id) {
        return knex
            .from('massage_wishlist')
            .where('massage_wishlist.user_id', id)
            .select(
				'massage_wishlist.user_id', 'massage_wishlist.wishlist_name', 'massage_wishlist.id')
            
	},
	getById(knex, id, userId) {
		return WishlistService.getWishlistProducts(knex)
			.where({'wl.id': id, 'wl.user_id': userId})
			.first()
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
				'mp.id',
				'mp.product_name',
				'mp.price',
				'mp.product_description',
				'mp.product_image',
				'mp.product_type'
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
			.first()
			
	},
	checkProductInWishlist(knex, product_id, wishlist_id) {
		return knex
			.from('massage_wishlist_products')
			.where({ product_id, wishlist_id })
			.first()
			.then(product => !!product)
	}
	
}

module.exports = WishlistService