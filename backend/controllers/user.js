const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

/* All User Data   */
const Users = async (req, res) => {
  const userData = await User.find({});
  res.status(200).json(userData);
};

/* User Register   */
const Register = async (req, res) => {
  const { name, email, password, admin } = req.body;
  const file = req.file;
  try {
    if (!name || !email || !password || !admin || !file) {
      return res.status(409).send("Fill all the inputs ");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const User1 = new User({
      name,
      email,
      password,
      admin,
      image: `http://localhost:4000/profile/${req.file.filename}`,
    });

    const salt = await bcrypt.genSalt(10);
    User1.password = await bcrypt.hash(User1.password, salt);

    await User1.save();

    res.status(200).json("user registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// Login for user
const LoginController = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
};

module.exports = {
  Users,
  Register,
  LoginController
};
