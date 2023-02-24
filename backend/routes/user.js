const express = require("express");
const {Register,Login,user} = require("../controllers/user");
const User = express.Router();

// All users
User.get("/", user);
// Register users
User.post("/register", Register);
// login users
User.post("/login", Login);

module.exports = User;
