const express = require("express");

const {
  createLoan,
  endLoan
} = require("./loanController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Fetch Trolley
router.post("/createLoan", createLoan);

// Lock Trolley
router.put("/endLoan", endLoan);


module.exports = router;