require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const session = require("express-session");
const Users = require("./routes/user");
const passport = require("passport");
const mongoose = require("mongoose");
const main = express();

//Middleware

main.use(
  session({
    secret: "SECRET",
    cookie:{
      sameSite:'strict'
    }
  })
);
main.use(cors());
main.use(cookie());
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
