const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnyFileSchema = new Schema({
  url: String,
  providerId: String,
  ticketId: String
});

module.exports = AnyFile = mongoose.model("anyFile", AnyFileSchema);
