const express = require("express");

const {
  fetchTrolleyHandler,
  setIsUnlockedHandler
} = require("./trolleyController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Fetch Trolley
router.get("/:trolleyID", fetchTrolleyHandler);

// Lock Trolley
router.put("/setIsUnlocked", setIsUnlockedHandler);


module.exports = router;