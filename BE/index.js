// Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();

// App Setup
const app = express();
const port = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors stuff
app.use(cors({
  credentials: true
}));

// DB Config
const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USER;
const dbURL = `mongodb+srv://${username}:${password}@cluster0.wjvqv.mongodb.net/redesign`;

// Connect to mongoose
mongoose
  .connect(dbURL)
  .then((result) => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });

// Ban Users every _______
const { BanUsers } = require('./BanUsers');
// setInterval(BanUsers, 1500)
BanUsers();

// User Routes
app.use("/user/", require("./User/userRoutes"));

// Trolley Routes
app.use("/trolley/", require("./Trolley/trolleyRoutes"));

// Loan Routes
app.use("/loan/", require("./Loan/loanRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}!`);
});
