const express = require("express");
const PostRoute = express.Router();
const { Posts ,  CreatePost} = require("../controllers/post");

// All Post
PostRoute.get("/" , Posts);
// Create a post 
PostRoute.post("/create/:id" , upload.single('image'),  CreatePost);
module.exports = PostRoute;
