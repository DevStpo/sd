const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TicketSchema = new Schema(
  {
    title: String,
    description: String,
    requestedDate: Date,
    deliveryDate: Date,
    assignee: String,
    reporter: String,
    workflow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workflow"
    },
    ticketType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticketType"
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
      }
    ],
    time: [
      {
        numberOfTime: String,
        user: String,
        description: String
      }
    ]
  },
  { strict: false }
);

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
