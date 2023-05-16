const Ticket = require("../models/ticket");

const ResetAllTickets = async (req, res) => {
  try {
    await Ticket.updateMany({}, { isBooked: false, userDetails: null });
    res.json({ message: "Server reset successfully" });
  } catch (error) {
    console.error("Error resetting server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  ResetAllTickets,
};
