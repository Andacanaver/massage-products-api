const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUserArray() {
    return [
		{
			id: 1,
			full_name: "Test User 1",
			username: "TestUser1",
			email_address: "thisemail@google.com",
			password: "GreatPassword1!",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 2,
			full_name: "Test User 2",
			email_address: "thatemail@google.com",
			username: "TestUser2",
			password: "GreatPassword2!",
			date_created: new Date("2029-02-22T16:28:32.615Z")
		},
		{
			id: 3,
			full_name: "Test User 3",
			email_address: "thereemail@google.com",
			username: "TestUser3",
			password: "GreatPassword3!",
			date_created: new Date("2029-03-22T16:28:32.615Z")
		},
		{
			id: 4,
			full_name: "Test User 4",
			email_address: "thenemail@google.com",
			username: "TestUser4",
			password: "GreatPassword4!",
			date_created: new Date("2029-04-22T16:28:32.615Z")
		}
	];
}

function makeWishlistArray(users) {
    return [
		{
			id: 1,
			wishlist_name: "Wishlist One",
			user_id: users[0].id
		},
		{
			id: 2,
			wishlist_name: "Wishlist Two",
			user_id: users[0].id
		},
		{
			id: 3,
			wishlist_name: "Wishlist Three",
			user_id: users[0].id
		},
		{
			id: 4,
			wishlist_name: "Wishlist One",
			user_id: users[1].id
		},
		{
			id: 5,
			wishlist_name: "Wishlist Two",
			user_id: users[1].id
		},
		{
			id: 6,
			wishlist_name: "Wishlist One",
			user_id: users[2].id
		},
		{
			id: 7,
			wishlist_name: "Wishlist Two",
			user_id: users[2].id
        },
        
	];
}

function makeProductsArray() {
    return [
		{
			id: 1,
			product_name: "Product One",
			product_type: "Oil",
			product_description:
				"This is one of the products that is available",
			price: "2.95",
			product_image: "https://i.imgur.com/KAXS4UJ.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 2,
			product_name: "Product Two",
			product_type: "Spray",
			product_description:
				"This is product two of the products that is available",
			price: '2.95',
			product_image: "https://i.imgur.com/OAvQvBu.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 3,
			product_name: "Product Three",
			product_type: "Device",
			product_description:
				"This is product three of the products that is available",
			price: '2.95',
			product_image: "https://i.imgur.com/OAvQvBu.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 4,
			product_name: "Product Four",
			product_type: "Cream",
			product_description:
				"This is product four of the products that is available",
			price: '2.95',
			product_image: "https://i.imgur.com/5IxjHVW.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 5,
			product_name: "Product Five",
			product_type: "Oil",
			product_description:
				"This is product five of the products that is available",
			price: '2.95',
			product_image: "https://i.imgur.com/KAXS4UJ.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 6,
			product_name: "Product Six",
			product_type: "Cream",
			product_description:
				"This is product six of the products that is available",
			price: '2.95',
			product_image: "https://i.imgur.com/5IxjHVW.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		},
		{
			id: 7,
			product_name: "Product Seven",
			product_type: "Spray",
			product_description:
				"This is product seven of the products that is available",
			price: '2.95',
			product_image: "https://i.imgur.com/OAvQvBu.jpg",
			date_created: new Date("2029-01-22T16:28:32.615Z")
		}
	];
}

function fillWishlistsArray(productId, wishlistId) {
    return [
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[0].id
		},
		{
			product_id: productId[1].id,
			wishlist_id: wishlistId[0].id
		},
		{
			product_id: productId[2].id,
			wishlist_id: wishlistId[0].id
		},
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[1].id
		},
		{
			product_id: productId[1].id,
			wishlist_id: wishlistId[1].id
		},
		{
			product_id: productId[2].id,
			wishlist_id: wishlistId[1].id
		},
		{
			product_id: productId[6].id,
			wishlist_id: wishlistId[1].id
		},
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[2].id
		},
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[3].id
		},
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[4].id
		},
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[5].id
		},
		{
			product_id: productId[0].id,
			wishlist_id: wishlistId[6].id
		}
	];
}

function cleanTables(db) {
    return db.transaction(trx =>
		trx
			.raw(
				`TRUNCATE
                massage_products,
                massage_users,
                massage_wishlist,
                massage_wishlist_products CASCADE`
			)
			.then(() =>
				Promise.all([
					trx.raw(
						`ALTER SEQUENCE massage_users_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(
						`ALTER SEQUENCE massage_products_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(
						`ALTER SEQUENCE massage_wishlist_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(`SELECT setval('massage_users_id_seq', 0)`),
					trx.raw(`SELECT setval('massage_products_id_seq', 0)`),
					trx.raw(`SELECT setval('massage_wishlist_id_seq', 0)`)
				])
			)
	);
}

function seedProductsTable(db, products) {
    return db.transaction(async trx => {
        await trx.into('massage_products').insert(products)
        await trx.raw(`SELECT setval('massage_products_id_seq', ?)`, [products[products.length - 1].id])
    })
}
function seedWishlists(db, wishlist, users) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('massage_wishlist').insert(wishlist)
        await trx.raw(`SELECT setval('massage_wishlist_id_seq', ?)`, [wishlist[wishlist.length - 1].id])
    })
}
function seedWishlistProducts(db, wishlistProducts) {
    return db.transaction(async trx => {
        await trx.into('massage_wishlist_products').insert(wishlistProducts)
    })
}

function makeExpectedWishlists(user, wishlists) {
    const expectedWishlists = wishlists.filter(wishlist => wishlist.user_id === user.id)
    return expectedWishlists
}
function makeExpectedWishlistProducts(wishlistProducts, wishlistId, products,user) {
    const expectedProducts = wishlistProducts.filter(wishlist => wishlist.wishlist_id === wishlistId)
    console.log(expectedProducts)
    return {
        wishlist_name: wishlistId.wishlist_name,
        wishlist_id: expectedProducts.wishlist_id,
        product_id: expectedProducts.product_id,
        user_id: user.id,
        product_name: products.product_name,
        price: products.price,
        product_description: products.product_description,
        product_image: products.product_image,
        product_type: products.product_type
    }
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id, username: user.username}, secret, {
        subject: user.username,
        algorithm: 'HS256'
    })
    return `Bearer ${token}`
    
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('massage_users').insert(preppedUsers)
        .then(() => {
            db.raw(
                `SELECT setval('massage_users_id_seq', ?)`, [users[users.length - 1].id]
            )
        })
}

function makeFixtures() {
    const testUsers = makeUserArray()
    const testProducts = makeProductsArray()
    const testWishlists = makeWishlistArray(testUsers)
    const testWishlistProducts = fillWishlistsArray(testProducts, testWishlists)

    return { testProducts, testUsers, testWishlists, testWishlistProducts}
}



function makeExpectedProduct(product) {
    return {
        id: product.id,
        product_name: product.product_name,
        product_type: product.product_type,
        price: product.price,
        product_description: product.product_description,
        product_image: product.product_image,
        date_created: product.date_created.toISOString()
    }
}
function makeWishlistExpectedProduct(product) {
    return {
        wishlist_id: product.wishlist_id,
        product_id: product.product_id,
        
    }
}

function makeExpectedWishlist(wishlist) {
    return {
        id: wishlist.id,
        wishlist_name: wishlist.wishlist_name,
        user_id: wishlist.user_id
    }
}



module.exports = {
    makeWishlistExpectedProduct,
    makeExpectedWishlistProducts,
    makeExpectedWishlists,
    makeExpectedWishlist,
    makeExpectedProduct,
    makeFixtures,
    makeUserArray,
    makeWishlistArray,
    makeProductsArray,
    makeAuthHeader,
    seedProductsTable,
    seedUsers,
    cleanTables,
    fillWishlistsArray,
    seedWishlists,
    seedWishlistProducts
}