const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const Comment = require('../models/comment');
router.get('/data', async (req, res) => {
    try {
      const comment = await Comment.find({});
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
      const comments = await Comment.find({ post: postId });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  const get_comment = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch the comment with the given ID and populate the user and post fields
      const comment = await Comment.findById(id).populate('user').populate('post');
  
      // Send the comment data in the response
      res.status(200).json(comment);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
router.get('/:id/new', get_comment)
router.post('/:id', commentController.createComment);

module.exports = router;
