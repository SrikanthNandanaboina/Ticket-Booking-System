const Ticket = require("../models/ticket");
const _isEmpty = require("lodash/isEmpty");

const GetAllTickets = async (req, res) => {
  try {
    const filter = {};

    const { status } = req.params;
    console.log({ status });
    if (status === "open" || status === "closed") {
      filter.isBooked = status !== "open";
    }

    const ticket = await Ticket.find(filter);
    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const CreateTicket = async (req, res) => {
  const { seatNumber } = req.params;
  const { userDetails } = req.body;

  try {
    const ticket = await Ticket.findOne({ seatNumber, isBooked: false });

    if (!ticket) {
      return res
        .status(400)
        .json({ error: "Seat already booked or invalid seat number" });
    }

    ticket.userDetails = userDetails;
    ticket.isBooked = true;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.error("Error booking ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateTicket = async (req, res) => {
  const { seatNumber } = req.params;
  const { userDetails, bookTicket } = req.body;

  let passengerInfo = userDetails;

  try {
    const ticketData = await Ticket.findOne({ seatNumber });

    if (!ticketData) {
      return res.status(400).json({ error: "Invalid Seat Number" });
    }

    if (bookTicket && ticketData.isBooked) {
      return res.status(400).json({ error: "Seat already booked" });
    }

    if (bookTicket && _isEmpty(userDetails)) {
      return res.status(400).json({ error: "Invalid Data" });
    } else if (!bookTicket) {
      passengerInfo = {};
    }

    const ticket = await Ticket.findOneAndUpdate(
      { seatNumber },
      { isBooked: bookTicket, userDetails: passengerInfo },
      { new: true, upsert: true }
    );

    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetTicketStatus = async (req, res) => {
  const { seatNumber } = req.params;

  try {
    const ticket = await Ticket.findOne({ seatNumber });

    if (!ticket) {
      return res.status(400).json({ error: "Invalid Seat Number" });
    }

    res.json({ status: ticket.isBooked ? "closed" : "open" });
  } catch (error) {
    console.error("Error fetching ticket status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetPassengerInfo = async (req, res) => {
  const { seatNumber } = req.params;

  try {
    const ticket = await Ticket.findOne({ seatNumber });
    const isBooked = ticket?.isBooked;
    const passengerInfo = ticket?.userDetails;

    if (isBooked) {
      // Fetch owner details from the user collection or any related collection
      res.json(passengerInfo);
    } else {
      res.status(404).json({ error: "Ticket or owner not found" });
    }
  } catch (error) {
    console.error("Error fetching ticket owner details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  CreateTicket,
  GetAllTickets,
  UpdateTicket,
  GetTicketStatus,
  GetPassengerInfo,
};
