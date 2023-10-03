const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createUser, findUserByUsername } = require("../data/users");

// Register a new user (normal user)
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const user = createUser(username, password, "normal");
  res.status(201).json(user);
});

// Login with API key (authentication)
router.post(
  "/login",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "Authentication successful" });
  }
);

module.exports = router;
