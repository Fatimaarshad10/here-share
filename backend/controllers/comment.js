const Post = require('../models/post');
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
console.log(req.user._id)
    const comment = new Comment({
      text: req.body.text,
      user: req.user._id, // assuming you have authentication middleware that sets req.user
      post: post._id,
    });

    await comment.save();

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
