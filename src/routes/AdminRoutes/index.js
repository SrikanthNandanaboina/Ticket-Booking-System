const express = require("express");
const AdminController = require("../../controllers/AdminController");

const router = express.Router();

// Additional API for admin to reset the server
router.post("/reset", AdminController.ResetAllTickets);

module.exports = router;
