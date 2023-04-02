const express = require("express");
const passport = require("passport");
const multer = require("multer");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const  mongoose=require('mongoose');
const { Users, Register , LoginController  , updateUser , deleteUserData ,  sendEmail , GetOneUser , get_user} = require("../controllers/user");
const UserRoute = express.Router();
// Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `./images`);
  },
  filename: (req, file, callback) => {
    console.log(req.file);
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

UserRoute.post( "/login", LoginController);

// User login successfull
UserRoute.get("/success", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json({
      user: {
        name: req.user.name,
        image: req.user.image,
        email: req.user.email,
        password : req.user.password ,
        detail : req.user.detail ,
        _id : req.user._id
      },
    });
  } else {
    res.status(404).json({ message: "error" });
  }
});

// authentication google and github
const LocalStrategy = require("passport-local").Strategy;
const githubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const userExist = await User.findOne({ email });

        if (!userExist) {
          console.log("User does not exist");
          return done(null, false, {
            message: "Invalid Credentials",
          });
        }

        const isPassMatched = await bcrypt.compare(
          password,
          userExist.password
        );

        if (!isPassMatched) {
          console.log("Password does not match");
          return done(null, false, {
            message: "Invalid Credentials",
          });
        }
        console.log("Authentication successful");
        return done(null, userExist);
      } catch (err) {
        console.log("Error:", err);
        return done(err);
      }
    }
  )
);
// authentication with github
passport.use(
  new githubStrategy(
    {
      clientID: "3a4d2af8bf44952a4021",
      clientSecret: "e3ee9588f58d096c845cc91d2a4c8b84a2fb068e",
      callbackURL: "http://localhost:4000/user/auth/github/callback",
      scope: ["user:email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let gitHubUser = await User.findOne({ gitHub: profile.id });
        if (gitHubUser) {
          done(null, gitHubUser);
        } else {
          // create a new User
          const newUser = {
            gitHub: profile.id,
            name: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
          };
          gitHubUser = await User.create(newUser);

          done(null, gitHubUser);
          // save the user in the mongodb
          await gitHubUser.save();
        }
      } catch (error) {
        console.error(error);
        done(null, error);
      }
    }
  )
);
UserRoute.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
// Github callback
UserRoute.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  function (req, res) {
    return res.redirect("http://localhost:3000/");
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "547504324770-65nagvr1006qf3bktgkc2d52n8dhdq58.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/user/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let googleUser = await User.findOne({ googleId: profile.id });
        if (googleUser) {
          done(null, googleUser);
        } else {
          // create a new User

          const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
          };
          googleUser = await User.create(newUser);
          done(null, googleUser);
          // save the user in the mongodb
          await googleUser.save();
        }
      } catch (error) {
        console.error(error);
      }
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
    return res.redirect("http://localhost:3000/");
  }
);
/*  SerializeUSer  */
passport.serializeUser((user, done) => {
  done(null, user._id);
});
/*  deserializeUSer  */
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
// All Users
UserRoute.get("/", Users);
UserRoute.get("/:id/get", GetOneUser);
UserRoute.get("/:id/no", get_user);


// User is register
UserRoute.post("/register", upload.single("image"), Register);
// User is logout

// User is updated
UserRoute.put('/:id',  upload.single('image'), updateUser)
// User is deleted

UserRoute.delete('/:id',   deleteUserData)
UserRoute.post('/email', sendEmail)
UserRoute.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    
  });
  res.clearCookie("connect.sid", { path: "/" });
  return res.redirect("http://localhost:3000/login");
});
module.exports = UserRoute;
