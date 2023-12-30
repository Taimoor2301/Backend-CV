const { login, register, fetchUser } = require("../controllers/authControllers");

const authRouter = require("express").Router();

authRouter.route("/login").post(login);
authRouter.route("/register").post(register);
authRouter.route("/user").get(fetchUser);

module.exports = authRouter;
