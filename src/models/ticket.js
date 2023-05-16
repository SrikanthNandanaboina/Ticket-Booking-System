// models/ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true, unique: true, min: 1, max: 40 },
  isBooked: { type: Boolean, default: false },
  userDetails: {
    name: { type: String },
    email: { type: String },
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
