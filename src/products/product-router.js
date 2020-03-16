const path = require('path')
const xss = require('xss')
const express = require('express')
const ProductsService = require('./product-service')

const productsRouter = express.Router();
const jsonParser = express.json();

const serializeProduct = product => ({
            id: product.id,
            product_name: xss(product.product_name),
            product_type: product.product_type,
            product_description: xss(product.product_description),
            price: product.price,
            product_image: xss(product.product_image),
            date_created: product.date_created
        })

productsRouter 
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        if(!req.query.name && !req.query.type) {
            ProductsService.getAllProducts(knexInstance)
				.then(products => {
					res.json(products.map(serializeProduct));
				})
				.catch(next);
        }
        if (req.query.name) {
			ProductsService.getAllSearchProducts(knexInstance, req.query.name)
				.then(products => {
					if (!products) {
						return res.status(400).json({
							error: `No products containing '${req.query.name}'.`
						});
					}
					return res.json(products.map(serializeProduct));
				})
				.catch(next);
		}

		if (req.query.type) {
			ProductsService.getType(knexInstance, req.query.type)
				.then(products => {
					res.json(products.map(serializeProduct));
				})
				.catch(next);
		}
        
    })
    .post(jsonParser, (req, res, next) => {
        const { product_name, product_type, product_description, price, product_image } = req.body;
        const newProduct = { product_name, product_type, product_description, price, product_image };

        for (const [key, value] of Object.entries(newProduct))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
            
        ProductsService.insertProduct(req.app.get('db'), newProduct)
                .then(product => {
                    res.status(201)
                        .location(path.posix.join(req.originalUrl + `/${product.id}`))
                        .json(serializeProduct(product));
                })
                .catch(next)
    })

	
productsRouter
    .route('/type')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        ProductsService.getType(knexInstance, req.params.product_type)
            .then(products => {
                res.json(products.map(serializeProduct))
            })
            .catch(next)
    })

productsRouter
	.route("/:product_id")
	.all((req, res, next) => {
		ProductsService.getById(req.app.get("db"), req.params.product_id)
			.then(product => {
				if (!product) {
					return res.json({ error: `Product doesn't exist` });
				}
				res.product = product;
				next();
			})
			.catch(next)
        })
    .get((req, res, next) => {
        res.json(serializeProduct(res.product));
	})
	.delete ((req, res, next) => {
		ProductsService
			.deleteProduct(req.app.get("db"), req.params.product_id)
			.then(numRowsAffected => {
				res.status(204).end();
			})
			.catch(next);
	})
	.patch(jsonParser, (req, res, next) => {
		const {
			product_name,
			product_type,
			product_description,
			price,
			product_image
		} = req.body;
		const productToUpdate = {
			product_name,
			product_type,
			product_description,
			price,
			product_image
		};

		const numberOfValues = Object.values(productToUpdate).filter(Boolean)
			.length;
		if (numberOfValues === 0) {
			return res.status(400).json({
				error: `Request body must contain any of the following, name, type, description, price or image.`
			});
		}
		ProductsService.updateProduct(
			req.app.get("db"),
			req.params.product_id,
			productToUpdate
		)
			.then(numRowsAffected => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = productsRouter