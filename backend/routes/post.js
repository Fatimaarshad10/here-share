const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./images`);
    },
    filename: (req, file, callback) => {
      console.log(req.file);
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
const PostRoute = express.Router();
const { Posts ,  CreatePost , GetUserPosts} = require("../controllers/post");
// All Post
PostRoute.get("/" , Posts);
// Create a post 
PostRoute.post("/create/:id" ,upload.single('image'),   CreatePost);
PostRoute.get("/:id" , GetUserPosts);

module.exports = PostRoute;
