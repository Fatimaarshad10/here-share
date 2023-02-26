const express = require("express");
const passport = require("passport");
const { Register, Login, User1 } = require("../controllers/user");
const UserRoute = express.Router();
// All users
UserRoute.get("/", User1);
// Register users
UserRoute.post("/register", Register);
// login users
UserRoute.post("/login", Login);

/*  SerializeUSer  */

passport.serializeUser((user, done) => {
  done(null, user.id);
});
/*  DeSerializeUSer  */

passport.deserializeUser((user, done) => {
  done(null, user);
});

/*  Google AUTH  */
let userProfile;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "547504324770-8fjspinp6qnp98pksbsau7t9r5fgd9ok.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/user/auth/google/callback",
      scope: ["profile", "email"],
    },

    function (accessToken, refreshToken, profile, cb) {
      userProfile = profile;
      cb(null, profile);
    }
  )
);
UserRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// Google callback
UserRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    try {
      // User.findOne({ email: userProfile.email }, ( existingUser) => {

      //       if (existingUser) {
      //         // User already exists, do something here
      //         return res.status(200).json('user already exists');
      //       }
      //     const newUser = new User({
      //       name: userProfile.displayName,
      //       email: userProfile.emails[0].value,
      //       password : 123,
      //       admin : true
      //     })
      // newUser.save()
      // return  res.status(400).json('good');
        req.login(userProfile, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("http://localhost:3000/");
      });
    } catch (err) {
      return res.status(400).json("error");
    }
  }
);
// Google Auth success 
UserRoute.get("/success", (req, res) => {
  const user = userProfile;
  res.json(user);
});
// Google Auth Logout 

UserRoute.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      // Handle any errors that occurred during the logout process
      console.error(err);
    } else {
        // Must be blank the UserProfile remove in logout 
      res.clearCookie("connect.sid");
      

      // Redirect the user to the login page or some other page
      res.redirect("http://localhost:3000/");
    }
  });
});
module.exports = UserRoute;
