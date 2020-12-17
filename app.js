const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const dataSchema = require("./models/dataSchema.js");
const dotenv = require("dotenv").config({ path: ".env" });

const getCache = require("./services/cache").getCache;

const uri = process.env.CONNECTION_STRING;

const app = express();
mongoose.connect(uri, { useNewUrlParser: true });
const Data = mongoose.model("Data", dataSchema);
const db = mongoose.connection;
app.use(express.static(path.join(__dirname, "public")));

// const url =
//   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
// const headers = {
//   "X-CMC_PRO_API_KEY": process.env.APIKEY
// };

app.get("/latestlistings", (req, res) => {
  res.json(getCache("latestListings"));
  const currentData = getCache("latestListings");
  console.log(currentData);
  const d = new Data({
    data: JSON.stringify(currentData),
    created: Date.now()
  });
  try {
    d.save().then(() => {
      console.log("Data pushed to db");
    });
  } catch (e) {
    console.log("Could not push to db");
  }
});

app.listen(9000);
