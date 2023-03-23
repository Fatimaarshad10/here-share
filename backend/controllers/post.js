const   Post = require("../models/post");

const Posts = async (req, res) => {
  const PostData = await Post.find({});
  res.status(200).json(PostData);
};
const CreatePost = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    try {
      
      const newPost = new Post({ title, description  , user: id , 
        postImage:`http://localhost:4000/profile/${req.file.filename}`})
  
      newPost.save((err, post) => {
        if (err) {
          console.error(err);
          res.status(400).send(err.message);
        } else {
          res.status(400).send(newPost);

        }})
    }catch(err){
        console.log(err.message)
    }
}

module.exports = {
  Posts,
  CreatePost
};
