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
}

module.exports = ProductsService;