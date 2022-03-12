const express = require("express");

const {
  createLoan,
  endLoan,
  getLoan
} = require("./loanController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Create Loan
router.post("/createLoan", createLoan);

// End Loan
router.put("/endLoan", endLoan);

// Fetch Loan
router.get("/:loanID/:userID", getLoan);


module.exports = router;