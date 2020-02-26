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
    wishlit_id: product.wishlist_id,
    user_id: product.user_id

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
    .post(requireAuth, jsonParser, (req, res, next) => {
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