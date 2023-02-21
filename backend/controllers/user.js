const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = async (req, res) => {
    const userData = await User.find({});
    res.status(200).json(userData);
  
  };
const Register = async (req, res) => {
  const { name, email, password ,admin} = req.body;
  try {
    if (!name || !email || !password|| !admin) {
      throw Error(" Fill Input Field");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const User1 = new User({ name, email, password ,admin});
    
      
    const salt = await bcrypt.genSalt(10)
    User1.password = await bcrypt.hash(User1.password,salt)
    await User1.save();
     // Create token
    
    res.status(200).json("user registered successfully");
    
  } catch (err) {
    res.status(400).send(err.message);
    
  }
};
const Login = async (req, res) => {
    const { email, password  , admin } = req.body;
    try {
      if (!email || !password || !admin) {
        throw Error("Fill Input Field");
      }
      const user = await User.findOne({ email: email  , admin : admin});
      if (!user) {
        throw Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw Error("Invalid password");
      }
      // Passwords match, create and send JWT token in response
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      res.cookie('auth', token,{
        expires:new Date(Date.now() + 60000),
        httpOnly: false,
        secure : true,
        sameSite: 'strict' ,
      })
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

module.exports = {
  
  Register,
  Login,
user
};
