const xss = require('xss')

const ProductsService = {
    getAllProducts(knex) {
        return knex.select('*').from('massage_products');
    },
    insertProduct(knex, newProduct) {
        return knex
            .insert(newProduct)
            .into('massage_products')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    getById(knex, id) {
        return knex
            .from('massage_products')
            .select('*')
            .where('id', id)
            .first();
    },
    updateProduct(knex, id, newProductFields) {
        return knex('massage_products')
            .where({ id })
            .update(newProductFields)
    },
    serializeProduct(product) {
        return {
            id: product.id,
            product_name: xss(product.product_name),
            product_type: product.product_type,
            product_description: xss(product.product_description),
            price: product.price,
            product_image: product.product_image,
            date_created: product.date_created
        }
    },
}

module.exports = ProductsService;