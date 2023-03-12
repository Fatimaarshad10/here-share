const express = require("express");
const passport = require("passport");
const path = require('path')
const multer = require('multer')
const User = require('../models/user')
const { Users, Register, Login} = require("../controllers/user");
const UserRoute = express.Router();


const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null, `./images`)
  },
  filename:(req,file,callback)=>{
    console.log(req.file)
    callback(null, file.originalname)
  }
})
const upload = multer({storage:storage})
/*  Google AUTH  */
// let userProfile;
// let gitProfile;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const githubStrategy = require("passport-github2").Strategy;

passport.use(
  new githubStrategy(
    {
      clientID:
        "3a4d2af8bf44952a4021",
      clientSecret: "e3ee9588f58d096c845cc91d2a4c8b84a2fb068e",
      callbackURL: "http://localhost:4000/user/auth/github/callback",
      scope: ['user:email'], 
    },
   async function (accessToken, refreshToken, profile, done ) {
    try{
      let gitHubUser  = await User.findOne({gitHub: profile.id})
      if( gitHubUser ){
        done(null, profile);
      }else{
        const newUser = ({
           gitHub: profile.id,
           name : profile.displayName,
           image : profile.photos[0].value ,  
           email : profile.emails
          })
          gitHubUser  = await User.create(newUser)
          done(null, profile);
        }}catch(error){
          console.error(error)
        }
    

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
    return res.redirect("http://localhost:3000/");
    
  }
);
// Github Auth success
// UserRoute.get("/github/success", (req, res) => {
//   const user = gitProfile;
//   res.json(user);
// });

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
    try{
      let googleUser = await User.findOne({googleId: profile.id})
      if(googleUser){
        done(null, profile);
      }else{
        const newUser = ({
           googleId: profile.id,
           name : profile.displayName,
           image : profile.photos[0].value ,  
           email :profile.emails[0].value
          })
          googleUser = await User.create(newUser)
          done(null, profile);
        }}catch(error){
          console.error(error)
        }
      }
      )
      );
UserRoute.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Google callback
UserRoute.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
   
    return res.redirect("http://localhost:3000/");
    
  }
);
UserRoute.get('/success', passport.authenticate('google'), async (req, res) => {
 res.send(200).json('data')
})

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
UserRoute.post("/register",upload.single('image') , Register);
// login users
UserRoute.post("/login", Login);
// Auth Logout

UserRoute.get("/logout", (req, res) => {
  res.clearCookie("connect.sid", { path: "/" });
  gitProfile = " ";
  return res.redirect("http://localhost:3000/login");
});

module.exports = UserRoute;
