const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose"); // Assuming you're using Mongoose for database

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true, 
    },
    function (request, accessToken, refreshToken, profile, done) {
      // Log the profile information to the console
      console.log("Email:", profile.emails[0].value);
      console.log("Name:", profile.displayName);

      // Pass the user profile to the done callback
      done(null, profile);
    }
  )
);
passport.serializeUser = (user, done) => {
  done(null, user);
};
passport.deserializeUser = (user, done) => {
  done(null, user);
};
