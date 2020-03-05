const { requireAuth } = require('../middleware/jwt-auth')
const express = require('express')
const xss = require('xss')
const WishlistService = require('./wishlist-service')

const wishlistRouter = express.Router()
const jsonParser = express.json()

const serializeWishlist = wishlist => ({
    id: wishlist.id,
    wishlist_name: xss(wishlist.wishlist_name),
    user_id: wishlist.user_id,
    number_of_products: wishlist.number_of_products
})
const serializeProduct = product => ({
    product_name: product.product_name,
    wishlist_id: product.wishlist_id,
    user_id: product.user_id,
    product_id: product.product_id,
    price: product.price,
    product_description: product.product_description,
    product_image: product.product_image,
    product_type: product.product_type

})

wishlistRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        WishlistService.getAllWishlistsForUser(req.app.get('db'), req.user.id)
            .then(wishlist => {
                res.json(wishlist.map(serializeWishlist));
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { wishlist_name, user_id } = req.body
        for (const field of ['wishlist_name']) {
            if(!req.body[field]) {
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                });
            }
        }
        const newWishlist = {
            wishlist_name,
            user_id: req.user.id
        }
        WishlistService.insertWishlist(req.app.get('db'), newWishlist)
            .then(wishlist => {
                
                res.status(201)
                    .json(serializeWishlist(wishlist))
            })
            .catch(next)

    })
    
wishlistRouter
    .route('/:wishlist_id')
    .all(requireAuth)
    .get((req, res, next) => {
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
    .post(jsonParser, (req, res, next) => {
        const { product_id, wishlist_id } = req.body
        WishlistService.checkProductInWishlist(req.app.get('db'), product_id, wishlist_id)
            .then(checkProductInWishlist => {
                if(checkProductInWishlist) {
                    return res.status(400).json({
                        error: 'Product already in wishlist'
                    })
                }
                return WishlistService.getProductId(
					req.app.get("db"),
					product_id
				).then(productId => {
					const newProduct = {
						product_id: productId.id,
						wishlist_id
					}
					return WishlistService.insertProduct(
						req.app.get("db"),
						newProduct
					).then(product => {
						res.status(201)
							.json(serializeProduct(product));
							
					});
				});
            }).catch(next)
    })


module.exports = wishlistRouter