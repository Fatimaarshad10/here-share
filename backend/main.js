require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const main = express();
const Users = require("./routes/user");
const cookie = require('cookie-parser')
const bodyParser = require("body-parser")
const session = require('express-session');
const passport = require('passport');

//Middleware
main.use(cookie());
main.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
main.use(express.json())
main.use(bodyParser.json())
main.use(passport.initialize());
main.use(passport.session());
main.use(cors());

main.use(express.urlencoded({extended: 'false'}))
main.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

main.use("/user", Users);
// var userProfile;

main.get('/success', (req, res) => res.send('yahe'));
main.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser((user , done)=>{
  done(null , user.id)
})

passport.deserializeUser((user , done)=>{
  done(null , user)
})
// index.js

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: '547504324770-8fjspinp6qnp98pksbsau7t9r5fgd9ok.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:4000/auth/google/callback",
    scope : ['profile','email' ] 

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    cb(null , profile)
  }
));
main.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile','email' ] }));
 
main.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
   res.redirect('/success')
  });

mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    main.listen(process.env.PORT, () => {
      console.log("listening", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
