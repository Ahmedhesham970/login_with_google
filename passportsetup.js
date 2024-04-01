const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose"); 
const User = require("./models/userModel");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // Log the profile information to the console
      // console.log("Email:", profile.emails[0].value);
      // console.log("Name:", profile.displayName);
      const email = profile.emails[0].value;
      const name = profile.displayName;
      // Passing the user profile to the done callback
      const user = await User.findOne({ google_id: profile.id });
      if (user) {
        return console.log("\n \n user already exists! \n \n ");
      } else {
        const newUser = await User.create({
          email: email,
          userName: profile.displayName,
          google_id: profile.id,
        });
        await newUser.save();

        console.log(newUser);
      }

      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ google_id: id });
    done(null, user);
  } catch (error) {
    console.error("Error in deserializing user:", error);
    done(error, null);
  }
});
