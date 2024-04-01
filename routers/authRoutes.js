const express = require("express");
const router = express.Router();
const passport = require("passport");
const app = express();
app.set("view engine", "ejs");
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure ",
  })
);

router.get("/auth/success", (req, res) => {
  res.render("success");
});

router.get("/auth/failure", (req, res) => {
  res.send("Authentication failed. Please try again.");
});

module.exports = router;
