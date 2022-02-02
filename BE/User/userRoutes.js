const express = require("express");
const { route } = require("express/lib/application");

const {
  fetchUserHandler,
  signInWithPhoneNumberHandler,
  verifyOTPHandler,
  createUserHandler,
  banUserHandler
} = require("./userController");
const router = express.Router();

// Routes (They all should just be 1 line)

// Fetch User
router.get("/:userID", fetchUserHandler);

// Sign in With Phone Number
router.post("/signInWithPhoneNumber", signInWithPhoneNumberHandler);

// Verify User Pin
router.post("/verifyOTP", verifyOTPHandler);

// Create User
router.post("/createUser", createUserHandler);

// Ban User
router.put("/banUser", banUserHandler);

module.exports = router;

