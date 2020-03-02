const TypeService = {

    getType(knex) {
        return knex
            .from("massage_products")
            .distinct('product_type')
			
    }
}

module.exports = TypeService