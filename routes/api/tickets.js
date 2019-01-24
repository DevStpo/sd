const express = require("express");
const router = express.Router();

// Ticket Model
const Ticket = require("../../models/Ticket");
const TicketType = require("../../models/TicketType");

// @route  GET api/tickets
// @desc   Get all tickets
// @access Public
router.get("/", (req, res) => {
  Ticket.find()
    .populate("workflow")
    .exec()
    .then(tickets => res.json(tickets));
});

// @route  GET api/tickets/:id
// @desc   Get a ticket
// @access Public
router.get("/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .populate("comments")
    .populate("ticketType")
    .populate("workflow")
    .exec()
    .then(ticket => res.json(ticket));
});

// @route  POST api/tickets
// @desc   Create a ticket
// @access Public
router.post("/", (req, res) => {
  const newTicket = new Ticket(req.body);
  newTicket.save().then(ticket => res.json(ticket));
});

// @route  PUT api/tickets
// @desc   Update a ticket
// @access Public
router.put("/:id", (req, res) => {
  Ticket.findByIdAndUpdate(
    req.params.id,
    {
      $set: { workflowStep: req.body.workflowStep, status: req.body.nextStatus }
    },
    { new: true }
  )
    .populate("comments")
    .populate("ticketType")
    .populate("workflow")
    .exec()
    .then(ticket => res.json(ticket));
});

// @route  PUT api/tickets/partial
// @desc   Update a field of a ticket
// @access Public
router.put("/partial/:id", (req, res) => {
  Ticket.findByIdAndUpdate(
    req.params.id,
    {
      $set: { [`fields.${req.body.fieldName}`]: req.body.value }
    },
    { new: true }
  )
    .populate("comments")
    .populate("ticketType")
    .populate("workflow")
    .exec()
    .then(ticket => res.json(ticket));
});

// @route  PUT api/tickets/time
// @desc   Update time tracked on a ticket
// @access Public
router.put("/time/:id", (req, res) => {
  console.log(req.body);
  Ticket.findByIdAndUpdate(
    req.params.id,
    { $push: { time: req.body.fields } },
    { new: true }
  )
    .populate("statusProgression")
    .populate("comments")
    .populate("ticketType")
    .populate("workflow")
    .exec()
    .then(ticket => res.json(ticket));
});

// @route  PUT api/tickets/comment/id
// @desc   Add a comment to the ticket
// @access Public
router.put("/comments/:id", (req, res) => {
  Ticket.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body._id } },
    { new: true }
  )
    .populate("statusProgression")
    .populate("comments")
    .populate("ticketType")
    .populate("workflow")
    .exec()
    .then(ticket => res.json(ticket));
});

// @route  DELETE api/tickets
// @desc   Delete a ticket
// @access Public
router.delete("/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => ticket.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
