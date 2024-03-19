const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const auth = require("./routers/authRoutes");
require("dotenv").config();
app.set("views", path.join(__dirname, "views"));
require("./passportsetup");

app.use(auth);
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(8000, () => {
  console.log("Listening on port 8000 successfully!");
});
