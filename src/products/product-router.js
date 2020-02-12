const path = require('path')
const express = require('express')
const xss = require('xss')
const ProductsService = require('./product-service')

const productsRouter = express.Router();
const jsonParser = express.json();

const serializedProduct = product => ({
    id: product.id,
    product_name: product.product_name,
    product_type: product.product_type,
    product_description: product.product_description,
    price: product.price,
    image: product.image,
    date_created: product.date_created
})

productsRouter 
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        ProductsService.getAllProducts(knexInstance)
            .then(products => {
                res.json(products.map(serializedProduct))
            })
            .catch(next)
    })

module.exports = productsRouter