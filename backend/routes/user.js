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
// /*  DeSerializeUSer  */
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
      "547504324770-65nagvr1006qf3bktgkc2d52n8dhdq58.apps.googleusercontent.com",
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
        req.login(userProfile , function (err) {
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
    res.clearCookie('connect.sid',  {path :'/'})
    userProfile = ' '
    return res.redirect("http://localhost:3000/");
});
module.exports = UserRoute;
