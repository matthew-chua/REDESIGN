const express = require("express");

const {
  createLoan,
  endLoan
} = require("./loanController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Create Loan
router.post("/createLoan", createLoan);

// End Loan
router.put("/endLoan", endLoan);


module.exports = router;