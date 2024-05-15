const express = require("express");
const router = express.Router();
const passport = require("passport");
const app = express();
const user=require("../models/userModel");
const authToken=require("../token");
app.set("view engine", "ejs");
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    // Handle successful authentication

   try {
    res.status(200).json({
      status: "done",
      message: "Registration successful!",
    });
   } catch (error) {
    res.status(500).send(error)
   }
  }
);

router.get("/auth/success", (req, res) => {
  res.render("success");
});

router.get("/auth/failure", (req, res) => {
  res.send("Authentication failed. Please try again.");
});

module.exports = router;
