const jwt = require("jsonwebtoken");

const AuthMiddleware = async (request, response, next) => {
    try {
        const bearerToken = request.headers.authorization;
        const [key, token] = bearerToken.split(" ");
        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            if (decoded) {
                next();
            }
            return response.status(401).send({
                message: "Unauthorizaed"
            })
        } catch (e) {
            return response.status(401).send({
                message: "Unauthorizaed"
            })
        }
    } catch (err) {
        return response.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = { AuthMiddleware }