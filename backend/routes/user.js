const express = require("express");
const passport = require("passport");
const { Users, Register, Login, logoutCookie } = require("../controllers/user");
const UserRoute = express.Router();


/*  Google AUTH  */
let userProfile;
let gitProfile;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const githubStrategy = require("passport-github2").Strategy;

passport.use(
  new githubStrategy(
    {
      clientID:
        "3a4d2af8bf44952a4021",
      clientSecret: "e3ee9588f58d096c845cc91d2a4c8b84a2fb068e",
      callbackURL: "http://localhost:4000/user/auth/github/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      gitProfile = profile;
      cb(null, profile);
    }
  )
);
UserRoute.get(
  "/auth/github",
  passport.authenticate("github", 
     { scope: [ 'user:email' ] })
);
// Github callback
UserRoute.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  function (req, res) {
    try {
      req.login(gitProfile, function (err) {
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
// Github Auth success
UserRoute.get("/github/success", (req, res) => {
  const user = gitProfile;
  res.json(user);
});
// Github Auth Logout

UserRoute.get("/github/logout", (req, res) => {
  res.clearCookie("connect.sid", { path: "/" });
  gitProfile = " ";
  return res.redirect("http://localhost:3000/");
});
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
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Google callback
UserRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    try {
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
  res.clearCookie("connect.sid", { path: "/" });
  userProfile = " ";
  return res.redirect("http://localhost:3000/");
});
/*  SerializeUSer  */
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// /*  DeSerializeUSer  */
passport.deserializeUser((user, done) => {
  done(null, user);
});
// All users
UserRoute.get("/", Users);
// Register users
UserRoute.post("/register", Register);
// login users
UserRoute.post("/login", Login);

UserRoute.get("/logout/cookie", logoutCookie);

module.exports = UserRoute;
