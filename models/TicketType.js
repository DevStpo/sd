const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TicketTypeSchema = new Schema({
  ticketTypeName: String,
  fields: [
    {
      name: String,
      fieldType: String
    }
  ],
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workflow"
  }
});

module.exports = TicketType = mongoose.model("ticketType", TicketTypeSchema);
