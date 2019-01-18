const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TestModelSchema = new Schema({}, { strict: false });

module.exports = TestModel = mongoose.model("testModel", TestModelSchema);
