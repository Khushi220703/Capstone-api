const {loginUser,registerUser} = require("../Controllers/UserController");
const {generateToken,userAuthentication} = require("../Middlewares/UserAuthentication");
const express = require("express");
const router = express.Router();

router.post("/register", generateToken, registerUser); // signup route
router.post("/login", userAuthentication, loginUser); // login route

module.exports = router;