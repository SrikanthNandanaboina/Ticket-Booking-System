const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = 4545;

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
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
