require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const main = express();
const Users = require("./routes/user");
const cookie = require('cookie-parser')
const morgan = require('morgan')
//Middleware
main.use(cookie());
main.use(cors());
main.use(express.json());
main.use(morgan());
main.use(express.urlencoded({extended:false}));
main.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
main.use("/user", Users);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    main.listen(process.env.PORT, () => {
      console.log("listening", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
