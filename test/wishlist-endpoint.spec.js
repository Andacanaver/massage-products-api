const knex = require("knex");
const app = require("../src/app")
const helpers = require("./test-helpers")

describe('Wishlist Endpoint', function() {
    let db;

    const { testWishlists, testProducts, testUsers, testWishlistProducts } = helpers.makeFixtures()
    const testUser = testUsers[0]
    before('make knex instance', () => {
        db = knex({
            client: 'pg', 
            connection: process.env.TEST_DATABASE_URL
        });
        db.on("query", function(queryData) {
			console.log(queryData);
		});
        app.set('db', db);
    })
    after("disconnect from db", () => db.destroy());

	before("cleanup", () => helpers.cleanTables(db));

	afterEach("cleanup", () => helpers.cleanTables(db));

    describe('GET /api/wishlist', () => {
        context('given there are wishlists in the database',() => {
            beforeEach('insert wishlists', () => {
                helpers.seedWishlists(db, testWishlists, testUsers)
            })
            it('responds with 200 and all wishlists', () => {
                const expectedWishlists = helpers.makeExpectedWishlists(testUser, testWishlists)
                return supertest(app)
                    .get('/api/wishlist')
                    .set("Authorization", helpers.makeAuthHeader(testUser))
                    .expect(200, expectedWishlists)
            })
        })
    })

    describe.only('GET /api/wishlist/:wishlist_id', () => {
        context('Given there are products in the wishlist', () => {
            beforeEach('insert wishlists', () => {
                helpers.seedProductsTable(db, testProducts),
                helpers.seedWishlists(db, testWishlists, testUsers)
                
            })
            it(`responds with 200 and all the products in a wishlist`, () => {
                const wishlistId = 1
                const expectedSomethings = helpers.makeExpectedWishlistProducts(testWishlistProducts, testWishlists[0].id).map(product => {
                    helpers.makeSomethingWishlist(product, testWishlists[0], testProducts, testUser)
                })
                
                console.log('should be all products in wishlist', expectedSomethings)
                return supertest(app)
					.get(`/api/wishlist/${wishlistId}`)
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedSomethings)
            })
        })
    })
})