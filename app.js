const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./src/routes/TicketRoutes");
const adminRoutes = require("./src/routes/AdminRoutes");
const Ticket = require("./src/models/ticket");

const app = express();
const port = 4545;

app.use(express.json());
app.use("/tickets", routes);
app.use("/admin", adminRoutes);

const { DATABASE, DATABASE_URL } = process.env;

if (!DATABASE || !DATABASE_URL) {
  throw new Error(
    "Env vars not found. `cp .env.sample .env` and fill env values in .env"
  );
}

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    for (let seat = 1; seat <= 40; seat++) {
      Ticket.findOneAndUpdate(
        {
          seatNumber: seat,
          isBooked: false
        },
        {},
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
