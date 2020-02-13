const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const xss = require('xss')
const bcrypt = require('bcryptjs')

const UsersService = {
    hasUserWithUserName(db, username) {
        return db('massage_users')
            .where({ username })
            .first()
            .then(user => !!user)
    },
    getAllUsers(knex) {
        return knex.select('*').from('massage_users')
    },
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('massage_users')
            .returning('*')
            .then(([user]) => user)
    },
    validatePassword(password) {
        if (password.length < 8) {
			return "Password must be longer than 8 characters";
		}
		if (password.length > 25) {
			return "Password must be less than 25 characters";
		}
		if (password.startsWith(" ") || password.endsWith(" ")) {
			return "Password must not start or end with empty spaces";
		}
		if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
			return `Password must contain at least 1 upper case, 1 lower case, 1 number and 1 special character`;
		}
		return null;
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeUser(user) {
        return {
            id: user.id,
            full_name: xss(user.full_name),
            username: xss(user.username),
            email_address: xss(user.email_address),
            date_created: new Date(user.date_created)
        }
    },
    deleteUser(knex, id) {
        return knex('massage_users')
            .where({ id })
            .delete()
    },
    updateUser(knex, id, newUserFields) {
        return knex('massage_users')
            .where({ id })
            .update(newUserFields)
    }

}

module.exports = UsersService