const express = require("express");
const router = express.Router();

// TicketType Model
const TicketType = require("../../models/TicketType");

// @route  GET api/ticketTypes
// @desc   Get all ticket types
// @access Public
router.get("/", (req, res) => {
  TicketType.find()
    .populate("workflow")
    .exec()
    .then(ticketTypes => res.json(ticketTypes));
});

// @route  GET api/ticketTypes/:id
// @desc   Get a specific ticket type
// @access Public
router.get("/:id", (req, res) => {
  TicketType.findById(req.params.id)
    .populate("workflow")
    .exec()
    .then(ticketType => res.json(ticketType));
});

// @route  POST api/views
// @desc   Create a view
// @access Public
router.post("/", (req, res) => {
  const newTicketType = new TicketType({
    ticketTypeName: req.body.ticketTypeName,
    fields: req.body.fields,
    workflow: req.body.workflow
  });

  newTicketType.save().then(ticketType => res.json(ticketType));
});

module.exports = router;
