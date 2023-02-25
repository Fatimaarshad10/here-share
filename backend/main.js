require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const main = express();
const Users = require("./routes/user");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
//Middleware
main.use(cors());
main.use(cookie());
main.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
main.use(express.json());
main.use(bodyParser.json());
main.use(passport.initialize());
main.use(passport.session());
main.use(express.urlencoded({ extended: "false" }));
// For user main route 
main.use("/user", Users);
main.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Connect with mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    main.listen(process.env.PORT, () => {
      console.log("listening", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
