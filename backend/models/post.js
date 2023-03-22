const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
  
    created_at: {
        type: Date,
        default: Date.now
      },
      
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", Post);
