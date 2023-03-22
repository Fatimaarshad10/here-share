const express = require("express");
const PostRoute = express.Router();
const {  CreatePost} = require("../controllers/post");

// All Post
PostRoute.get("/" , (req,res)=>{
    console.log('post is created and have a great journey ')
});
// Create a post 
PostRoute.post("/create" , CreatePost);
module.exports = PostRoute;
