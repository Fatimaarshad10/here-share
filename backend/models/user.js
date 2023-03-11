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
      required: true,
    },
    admin: {
      type: String,
    },
    image :{
      type: String ,
      required : true 
    } ,
     googleId:{
      type: String ,
      required : true 
    } ,
    // gitHub:{
    //   type: String ,
    //   required : true 
    // } ,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
