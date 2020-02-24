const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''

    let bearerToken
    if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: `Missing bearer token `})
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken)
        console.log(payload);
        AuthService.getUserWithUserName(
            req.app.get('db'),
            payload.username
        )
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'Unauthorized request' })
                    console.log("Hello");
                }
                req.user = user
                console.log(req.user)
                next()
            })
            .catch(err => {
                console.error(err)
                next(err)
            })
    } catch(error) {
        res.status(401).json({ error: 'Unauthorized request' })
        console.log('second 401')
    }
}

module.exports = {requireAuth}