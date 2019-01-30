const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CompanySchema = new Schema({
  name: String
});

module.exports = Company = mongoose.model("company", CompanySchema);
