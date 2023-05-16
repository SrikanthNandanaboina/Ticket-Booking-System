// routes.js
const express = require("express");
const TicketController = require("../../controllers/TicketController");
const _isEmpty = require("lodash/isEmpty");

const router = express.Router();

// Get ticket status
router.get("", TicketController.GetAllTickets);

// Update ticket status
router.put("/:seatNumber", TicketController.UpdateTicket);

// View ticket status
router.get("/:seatNumber", TicketController.GetTicketData);

// View all closed tickets
router.get("/status/closed", TicketController.GetClosedTickets);

// View all open tickets
router.get("/status/open", TicketController.GetOpenTickets);

// View details of the person owning the ticket
router.get("/:seatNumber/details", TicketController.GetTicketDetails);

module.exports = router;
