const   Post = require("../models/post");

const Posts = async (req, res) => {
  const PostData = await User.find({});
  res.status(200).json(PostData);
};
const CreatePost = async (req, res) => {
    const { title, description } = req.body;
  
    try {
      
      const newPost = new Post({ title, description });
  
      newPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send(err.message);
        } else {
          res.status(400).send('post is alreadu is created ');

        }})
    }catch(err){
        console.log(err.message)
    }
}

module.exports = {
  Posts,
  CreatePost
};
