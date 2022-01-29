const express = require("express");

const {
  fetchTrolleyHandler
} = require("./trolleyController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Fetch Trolley
router.get("/:trolleyId", fetchTrolleyHandler);

// Lock Trolley


module.exports = router;