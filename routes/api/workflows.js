const express = require("express");
const router = express.Router();

// workflow Model
const Workflow = require("../../models/Workflow");

// @route  GET api/workflows
// @desc   Get all workflows
// @access Public
router.get("/", (req, res) => {
  Workflow.find().then(workflows => res.json(workflows));
});

// @route  GET api/workflows
// @desc   Get a single workflow
// @access Public
router.get("/:id", (req, res) => {
  Workflow.findById(req.params.id)
    .then(workflow => res.json(workflow))
    .catch(err => res.status(404).json({ success: false }));
});

// @route  POST api/workflows
// @desc   Create a workflow
// @access Public
router.post("/", (req, res) => {
  console.log(req.body.name);
  const newWorkflow = new Workflow({
    workflow: req.body.workflow,
    name: req.body.name
  });
  newWorkflow.save().then(workflow => res.json(workflow));
});

module.exports = router;
