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
                helpers.seedWishlists(db, testWishlists, testUsers, testWishlistProducts)
                )
            )
            it(`responds with 200 and all the products in a wishlist`, () => {
                const wishlistId = 1
                const expectedWishlistProducts =  
                    (helpers.makeSomethingWishlist(testWishlists[0], testProducts, testWishlistProducts))
                console.log('hello wishlist products expected', expectedWishlistProducts)
                return supertest(app)
					.get(`/api/wishlist/${wishlistId}`)
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedWishlistProducts)
            })
        })
    })
})