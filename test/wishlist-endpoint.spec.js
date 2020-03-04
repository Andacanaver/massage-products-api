const knex = require("knex");
const app = require("../src/app")
const helpers = require("./test-helpers")

describe('Wishlist Endpoint', function() {
    let db;

    const { testWishlists, testUsers } = helpers.makeFixtures()
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

    describe.only('GET /api/wishlist', () => {
        context('given there are wishlists in the database',() => {
            beforeEach('insert wishlists', () => {
                helpers.seedWishlists(db, testWishlists, testUsers)
            })
            it('responds with 200 and all wishlists', () => {
                const expectedWishlists = testWishlists.map(wishlist => helpers.makeExpectedWishlist(wishlist))
                return supertest(app)
                    .get('/api/wishlist')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedWishlists)
            })
        })
    })
})