
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
    getType(knex, type) {
        return knex
			.select("*")
			.from("massage_products")
			.where("product_type",type);
    },
    updateProduct(knex, id, newProductFields) {
        return knex('massage_products')
            .where({ id })
            .update(newProductFields)
    },
    checkProduct(knex, product_name) {
        return knex
            .from('massage_products')
            .where({ product_name })
            .then(product => !!product)
    }
}

module.exports = ProductsService;