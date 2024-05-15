const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("./models/userModel");
require("dotenv").config();
const authToken = require("./token");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile", "email", "offline_access"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // Log the profile information to the console
      // console.log("Email:", profile.emails[0].value);
      // console.log("Name:", profile.displayName);
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const profileImageURL = profile.photos[0].value;
     
      let random =
        (Math.random() + 2).toString(36).substring(7).toUpperCase() +
        process.env.GOOGLE_PASSWORD_COMPILATION;
      // Passing the user profile to the done callback
      const user = await User.findOne({ google_id: profile.id });
      if (user) {
        const payload = authToken.createToken({
          email: user.email,
          name: user.userName,
          id: user.google_id,
        }); 
        await user.save();
        console.log({user: user});
       
      } else {
        
        const newUser = await User.create({
          email: email,
          userName: profile.displayName,
          google_id: profile.id,
          password: random,
          photo: profileImageURL,
        
        });
        const payload = authToken.createToken({
          email: newUser.email,
          name: newUser.userName,
          id: newUser.google_id,
        });
        await newUser.save();

        console.log({ user: newUser, payload: payload });
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
