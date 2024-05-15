const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });
