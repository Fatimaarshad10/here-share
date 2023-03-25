const Post = require("../models/post");
const User = require("../models/user");

const Posts = async (req, res) => {
  const PostData = await Post.find({});
  res.status(200).json(PostData);
};

const CreatePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user details using the user ID
    const user = await User.findById(id);
    // Create a new post object with the user details
    const post = new Post({
      image: `http://localhost:4000/profile/${req.file.filename}`,
      title: req.body.title,
      description: req.body.description,
      user: user,
    });

    // Save the post and user details together
    const savedPost = await post.save();

    // Send the saved post data in the response
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const GetUserPosts = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user details using the user ID
    const user = await User.findById(id);
    // Fetch all posts created by the user
    const posts = await Post.find({ user: user });

    // Send the posts data in the response
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports = {
  Posts,
  CreatePost,
  GetUserPosts
};
