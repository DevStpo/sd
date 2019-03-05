const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ViewSchema = new Schema({
  name: {
    type: String
  },
  isDefault: Boolean,
  fields: [
    {
      apiName: String,
      label: String
    }
  ]
});

module.exports = View = mongoose.model("view", ViewSchema);
