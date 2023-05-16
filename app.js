const express = require("express");
require("dotenv").config();

const app = express();
const port = 4545;

const { USERNAME, PASSWORD, DATABASE, DATABASE_URL } = process.env;

if (!USERNAME || !PASSWORD || !DATABASE || !DATABASE_URL) {
  throw new Error(
    "Env vars not found. `cp .env.sample .env` and fill env values in .env"
  );
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
