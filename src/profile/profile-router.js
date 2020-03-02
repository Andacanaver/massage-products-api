const { requireAuth } = require('../middleware/jwt-auth')
const express = require("express");
const xss = require('xss')
const ProfileService = require('./profile-service')

const profileRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
	id: user.id,
	full_name: xss(user.full_name),
	username: xss(user.username),
	email_address: xss(user.email_address),
});

profileRouter.get('/', requireAuth, (req, res) => {
    res.json(serializeUser(req.user))
}).patch('/', requireAuth, jsonParser, (req, res, next) => {
	const { full_name, email_address, password } = req.body;
	const userToUpdate = { full_name, email_address, password };
	const numberOfValues = Object.values(userToUpdate).filter
	(Boolean)
		.length;
	if(numberOfValues === 0) {
		return res.status(400).json({
			error: 'Please change one of the following full name, email address or password'
		})
	}
	//validates the password
	//const passwordError = ProfileService.validatePassword(password);
	let passwordError;
	if(password) {
		passwordError = ProfileService.validatePassword(password);
	}
	//if invalid password send error about what the password needs
	if (passwordError) {
		return res.status(400).json({ error: passwordError });
	}
	//check if they're updating the password, if so, hash it
	if (password) {

		return ProfileService.hashPassword(password).then(hashedPassword => {
			const editUser = {
				full_name,
				password: hashedPassword,
				email_address
			}
			return ProfileService.updateUser(
				req.app.get("db"),
				req.user.id,
				editUser
			)
				.then(numRowsAffected => {
					res.status(204).end();
				})
				.catch(next);
		});
	}
	
	

})

module.exports = profileRouter