const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Profile Endpoint", function() {
	let db;

	const {
		testWishlists,
		testProducts,
		testUsers,
		testWishlistProducts
	} = helpers.makeFixtures();

	before("make knex instance", () => {
		db = knex({
			client: "pg",
			connection: process.env.TEST_DATABASE_URL
		})
		app.set("db", db);
    })
    after("disconnect from db", () => db.destroy());

	before("cleanup", () => helpers.cleanTables(db));

    afterEach("cleanup", () => helpers.cleanTables(db));
    
    describe('GET /api/profile', () => {
        context('given the user is logged in', () => {
            beforeEach(
				"insert wishlists",
				() => (
					helpers.seedProductsTable(db, testProducts),
					helpers.seedWishlists(
						db,
						testWishlists,
						testUsers,
						testWishlistProducts
                    )
                )
                
            );
            
            it(`responds with 200 and the users info`, () =>{
                const expectedUser = helpers.makeExpectedProfile(testUsers[0]);
				
				return supertest(app)
					.get(`/api/profile`)
					.set("Authorization", helpers.makeAuthHeader(testUsers[0]))
					.expect(200, expectedUser);
            })
        })
    })
})