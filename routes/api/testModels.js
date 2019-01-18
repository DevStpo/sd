const express = require("express");
const router = express.Router();

// comment Model
const TestModel = require("../../models/testModel");

// @route  POST api/comments
// @desc   Create a comment
// @access Public
router.post("/", (req, res) => {
  const newTestModel = new TestModel(req.body);

  newTestModel.save().then(testModel => res.json(testModel));
});

module.exports = router;
