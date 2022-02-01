const express = require("express");

const {
  createTrolleyHandler,
  fetchTrolleyHandler,
  setIsUnlockedHandler,
  setShouldUnlockHandler,
  returnTrolleyHandler
} = require("./trolleyController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Create Trolley
router.post("/createTrolley", createTrolleyHandler);

// Fetch Trolley
router.get("/:trolleyID", fetchTrolleyHandler);

// Lock Trolley
router.put("/setIsUnlocked", setIsUnlockedHandler);

// Should Unlock
router.put("/setShouldUnlock", setShouldUnlockHandler);

// Return Trolley
router.put('/returnTrolley', returnTrolleyHandler)


module.exports = router;