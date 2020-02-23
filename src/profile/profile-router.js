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
	date_created: new Date(user.date_created)
});

profileRouter.get('/', requireAuth, (req, res) => {
    res.json(serializeUser(req.user))
}).patch('/', requireAuth, jsonParser, (req, res, next) => {
	const { full_name, email_address, password } = req.body;
	const userToUpdate = { full_name, email_address, password };
	const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
	if(numberOfValues === 0) {
		return res.status(400).json({
			error: 'Please change one of the following full name, email address or password'
		})
	}
	ProfileService.updateUser(
		req.app.get('db'),
		req.params.user_id,
		userToUpdate
	)
		.then(numRowsAffected => {
			res.status(204).end();
		})
		.catch(next)

})

module.exports = profileRouter