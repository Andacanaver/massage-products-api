const { requireAuth } = require('../middleware/jwt-auth')
const express = require('express')
const xss = require('xss')
const WishlistService = require('./wishlist-service')

const wishlistRouter = express.Router()
const jsonParser = express.json()

const serializeWishlist = wishlist => ({
    id: wishlist.id,
    wishlist_name: xss(wishlist.wishlist_name),
    user_id: wishlist.user_id
})
const serializeProduct = product => ({
    id: product.id,
    product_name: product.product_name,

})

wishlistRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        WishlistService.getAllWishlistsForUser(req.app.get('db'), req.user.id)
            .then(wishlist => {
                res.json(wishlist.map(serializeWishlist));
            })
            .catch(next)
    })
    
wishlistRouter
    .route('/:wishlist_id')
    .get(requireAuth, (req, res, next) => {
        if(req.user.id) {
            WishlistService.getWishlistProducts(
				req.app.get("db"),
				req.params.wishlist_id,
				req.user.id
			)
				.then(product => {
					res.json(product.map(serializeProduct));
				})
				.catch(next);
        }
    })


module.exports = wishlistRouter