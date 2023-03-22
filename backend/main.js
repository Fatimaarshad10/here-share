require("dotenv").config();
const express = require("express");
const cors = require("cors");
// cookie parser use for get the cookie and console it
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Users = require("./routes/user");
const Posts = require('./routes/post')
const passport = require("passport");
const mongoose = require("mongoose");
const main = express();
// image folder
main.use('/profile', express.static('./images'));
main.use(cookieParser());
// for session
main.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
main.use(passport.initialize());
main.use(passport.session());
// middleware
main.use(express.json());
main.use(cors());
main.use(express.urlencoded({ extended: "true" }));
main.use("/user", Users);
main.use("/post", Posts);

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
