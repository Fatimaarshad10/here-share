const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postImage:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", Post);
