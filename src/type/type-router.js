const express = require("express");
const typesRouter = express.Router();
const TypeService = require('./types-service')

const serializeTypes = type => ({
    product_type: type.product_type
})

typesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        TypeService.getType(knexInstance)
            .then(type => {
                res.json(type.map(serializeTypes))
            })
            .catch(next)
    })

module.exports = typesRouter