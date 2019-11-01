const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.deserializeUser((id, done) => {
  console.log("********* id =", id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

const callbackURL = keys.callbackURL + "/auth/google/callback";
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.callbackDomain + "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      console.log("************ 1, existingUser =",  existingUser);
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      console.log("************ 2, user =",  user);
      done(null, user);
    }
  )
);
