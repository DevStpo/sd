const express = require("express");
const router = express.Router();

// comment Model
const Comment = require("../../models/comment");

// @route  POST api/comments
// @desc   Create a comment
// @access Public
router.post("/:ticketId", (req, res) => {
  const newComment = new Comment({
    date: Date.now(),
    author: req.body.author,
    description: req.body.description,
    ticket: req.params.ticketId
  });

  newComment.save().then(comment => res.json(comment));
});

// @route  DELETE api/comments
// @desc   Delete a comment
// @access Public
router.delete("/:id", (req, res) => {
  comment
    .findById(req.params.id)
    .then(comment => comment.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
