const { requireAuth } = require('../middleware/jwt-auth')
const express = require("express");
const xss = require('xss')

const profileRouter = express.Router();

const serializeUser = user => ({
	id: user.id,
	full_name: xss(user.full_name),
	username: xss(user.username),
	email_address: xss(user.email_address),
	date_created: new Date(user.date_created)
});

profileRouter.get('/', requireAuth, (req, res) => {
    res.json(serializeUser(req.user))
})

module.exports = profileRouter