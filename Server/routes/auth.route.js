const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { AuthMiddleware } = require("../middlewares/Auth");

const authRoute = Router();

authRoute.get("/create-token", authController.createToken);
authRoute.get("/verify-token", authController.verifyToken);
authRoute.post("/signup", authController.studentSignup);
authRoute.post("/login", authController.studentLogin);
authRoute.get("/test", AuthMiddleware, authController.testFunc);

module.exports = authRoute;