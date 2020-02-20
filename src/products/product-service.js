const xss = require('xss')

const ProductsService = {
    getAllProducts(knex) {
        return knex.select('*').from('massage_products');
    },
    getAllSearchProducts(knex, term) {
        return knex
			.select("*")
			.from("massage_products AS mp")
			.where("mp.product_name", "Ilike", `%${term}%`);
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
    getType(knex, product_type) {
        return knex
            .from('massage_products AS mp')
            .select(
                'mp.id',
                'mp.product_name',
                'mp.product_description',
                'mp.product_type',
                'mp.price',
                knex.raw(
                    `count(DISTINCT product_type)`
                )
            )
            .where('mp.product_type', product_type)
            .groupBy('mp.id', 'mp.product_type')
    },
    updateProduct(knex, id, newProductFields) {
        return knex('massage_products')
            .where({ id })
            .update(newProductFields)
    },
}

module.exports = ProductsService;