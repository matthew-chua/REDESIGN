// Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// App Setup
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models
const User = require("./User/userSchema");
const Loan = require("./Loan/loanSchema");
const Trolley = require("./Trolley/trolleySchema");

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

// Routes

// User Routes
app.use("/", require("./User/userRoutes"));

//ban user
app.get("/banUser", (req, res) => {
  const document = { userID: req.get("userID") };
  const update = { banned: req.get("banned") };

  User.findOneAndUpdate(document, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// fetch user
app.get("/fetchUserDetails", (req, res) => {
  const document = { userID: req.get("userID") };
  User.findOne(document)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// create loan
app.get("/createLoan", (req, res) => {
  const date = new Date();
  const loan = new Loan({
    userID: req.get("userID"),
    loanID: req.get("loanID"),
    trolleyID: req.get("trolleyID"),
    borrowDate: date,
    returned: req.get("returned"),
  });

  loan
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//end the loan (return the trolley)
app.get("/endLoan", (req, res) => {
  const document = { userID: req.get("userID") };
  const update = { returned: true };

  Loan.findOneAndUpdate(document, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/createTrolley", (req, res) => {
  const trolley = new Trolley({
    trolleyID: req.get("trolleyID"),
    shouldUnlock: req.get("shouldUnlock"),
    isUnlocked: req.get("isUnlocked"),
  });

  trolley
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/setShouldUnlock", (req, res) => {
  const document = { trolleyID: req.get("trolleyID") };
  const update = { shouldUnlock: true };

  Trolley.findOneAndUpdate(document, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/setIsUnlocked", (req, res) => {
  const document = { trolleyID: req.get("trolleyID") };
  const update = { isUnlocked: true };

  Trolley.findOneAndUpdate(document, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/returnTrolley", (req, res) => {
  const document = { trolleyID: req.get("trolleyID") };
  const update = {
    isUnlocked: false,
    shouldUnlock: false,
  };

  Trolley.findOneAndUpdate(document, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
