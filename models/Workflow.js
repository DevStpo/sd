const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WorkflowSchema = new Schema({
  workflow: Array,
  name: String
});

module.exports = Workflow = mongoose.model("workflow", WorkflowSchema);
