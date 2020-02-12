const path = require('path')
const express = require('express')
const xss = require('xss')
const ProductsService = require('./product-service')

const productsRouter = express.Router();
const jsonParser = express.json();

productsRouter 
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        ProductsService.getAllProducts(knexInstance)
            .then(products => {
                res.json(products.map(ProductsService.serializeProduct))
            })
            .catch(next)
    })

productsRouter
    .route('/:product_id')
    .all(checkProductExists)
    .get((req, res) => {
        res.json(ProductsService.serializeProduct(res.product))
    })



async function checkProductExists(req, res, next) {
    try {
        const product = await ProductsService.getById(
            req.app.get('db'),
            req.params.product_id
        )

        if (!product) {
            return res.status(404).json({
                error: `Product doesn't exist`
            })
        }
        res.product = product
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = productsRouter