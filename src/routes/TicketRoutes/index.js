// routes.js
const express = require("express");
const TicketController = require("../../controllers/TicketController");

const router = express.Router();

// Update ticket status
router.put("/:seatNumber", TicketController.UpdateTicket);

// View ticket status
router.get("/:seatNumber", TicketController.GetTicketStatus);

// View all / open / closed tickets
router.get("/get/:status", TicketController.GetAllTickets);

// View details of the person owning the ticket
router.get("/:seatNumber/details", TicketController.GetPassengerInfo);

module.exports = router;
