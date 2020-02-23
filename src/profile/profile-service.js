const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const xss = require("xss");
const bcrypt = require("bcryptjs");

const ProfileService = {
	updateUser(knex, id, newUserFields) {
		return knex("massage_users")
			.where({ id })
			.update(newUserFields);
	}
};

module.exports = ProfileService