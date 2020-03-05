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
        
        app.set('db', db);
    })
    after("disconnect from db", () => db.destroy());

	before("cleanup", () => helpers.cleanTables(db));

	afterEach("cleanup", () => helpers.cleanTables(db));

    describe('GET /api/wishlist', () => {
        context('given there are wishlists in the database',() => {
            beforeEach('insert wishlists', () => (
                helpers.seedWishlists(db, testWishlists, testUsers, testWishlistProducts)
            ))
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
            beforeEach('insert wishlists', () => 
                (helpers.seedProductsTable(db, testProducts),
                helpers.seedWishlists(db, testWishlists, testUsers, testWishlistProducts),
                helpers.seedWishlistProducts(db, testWishlistProducts))
            )
            it(`responds with 200 and all the products in a wishlist`, () => {
                const wishlistId = 1
                const expectedWishlistProducts = helpers.makeExpectedWishlistProducts(testWishlistProducts, testWishlists[0], testUser, testProducts)
                db.from("massage_products")
					.select("*")
                    .then(rows => console.log(rows));
                db.from("massage_users")
					.select("*")
                    .then(rows => console.log(rows));
                db.from("massage_wishlist")
					.select("*")
                    .then(rows => console.log(rows));
                db.from("massage_wishlist_products")
					.select("*")
					.then(rows => console.log(rows));
                return supertest(app)
					.get(`/api/wishlist/${wishlistId}`)
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedWishlistProducts)
                    .then(res => console.log(res))
            })
        })
    })
})