const express = require("express");
const router = express.Router();

// View Model
const View = require("../../models/View");

// @route  GET api/views
// @desc   Get all views
// @access Public
router.get("/", (req, res) => {
  View.find().then(views => res.json(views));
});

// @route  GET api/views
// @desc   Get a single view
// @access Public
router.get("/:id", (req, res) => {
  View.findById(req.params.id)
    .then(view => res.json(view))
    .catch(err => res.status(404).json({ success: false }));
});

// @route  POST api/views
// @desc   Create a view
// @access Public
router.post("/", (req, res) => {
  const newView = new View({
    name: req.body.name,
    fields: req.body.fields
  });

  newView.save().then(view => res.json(view));
});

module.exports = router;
