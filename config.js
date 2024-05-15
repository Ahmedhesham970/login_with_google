const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const auth = require("./routers/authRoutes");
require("dotenv").config();
require("./passportsetup");
const database = require("./database/database");

// Set view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());



// Routes
app.use(auth);

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Start server
app.listen(8000, () => {
  console.log("Listening on port 8000 successfully!");
});
