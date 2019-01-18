const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ViewSchema = new Schema({
  name: {
    type: String
  },
  fields: [
    {
      numeric: Boolean,
      disablePadding: Boolean,
      apiName: String,
      label: String
    }
  ]
});

module.exports = View = mongoose.model("view", ViewSchema);
