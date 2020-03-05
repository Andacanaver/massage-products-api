const knex = require("knex");
const app = require("../src/app")
const helpers = require("./test-helpers")

describe('Products Endpoint', function() {
    let db;

    const { testProducts } = helpers.makeFixtures();
    const testProduct = testProducts[0];

    before('make knex instance', () => {
        db = knex({
            client: 'pg', 
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
        
    })

    after('disconnect from db', () => db.destroy())

    before("cleanup", () => helpers.cleanTables(db));

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/products', () => {
        context('given there are products in the database', () => {
            beforeEach("insert products", () => {
				helpers.seedProductsTable(db, testProducts);
			});
            
            it('responds with 200 and all products', () => {
                const expectedProducts = testProducts.map(product => 
                    helpers.makeExpectedProduct(product)
                )
                return supertest(app)
					.get("/api/products")
					.expect(200)
					.then(() => expect(expectedProducts))
            })
        })
    })
    
    describe("GET /api/products/:product_id", () => {
		context("Given there are products in the db", () => {
			beforeEach("insert products", () => {
				helpers.seedProductsTable(db, testProducts);
            });
			it("responds with 200 and the specified product", () => {
				const productId = 2;
				const expectedProduct = helpers.makeExpectedProduct(
					testProducts[productId - 1]
                )
				return supertest(app)
					.get(`/api/products/${productId}`)
					.expect(200)
					.then(() => expect(expectedProduct))
			});
		});
	});
    
})
