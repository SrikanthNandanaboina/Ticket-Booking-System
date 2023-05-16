// models/ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  status: { type: String, enum: ["open", "closed"], required: true },
  userDetails: {
    name: { type: String },
    email: { type: String },
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
