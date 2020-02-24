const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const bcrypt = require("bcryptjs");

const ProfileService = {
	updateUser(knex, id, newUserFields) {
		return knex("massage_users")
			.where({ id })
			.update(newUserFields);
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
		return bcrypt.hash(password, 12);
	}
};

module.exports = ProfileService