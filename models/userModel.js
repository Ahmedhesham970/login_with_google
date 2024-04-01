const mongoose = require("mongoose");
const mongodb = require("mongodb");

const userSchema = new mongoose.Schema({
  userName: String,
  google_id: String,
  email: String,
  photo: String,
});

const user = mongoose.model("userData", userSchema);

module.exports = user;
