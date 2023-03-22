const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    admin: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    gitHub: {
      type: String,
    },
    detail: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required:  false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
