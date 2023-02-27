const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
/* All User Data   */
const User1 = async (req, res) => {
    const userData = await User.find({});
    res.status(200).json(userData);

};
/* User Register   */

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
      
      res.status(200).json("user registered successfully");
      
    } catch (err) {
      res.status(400).send(err.message);
      
    }
  };

/* User logout  */
const Login = async (req, res) => {
    const {email, password, admin} = req.body;
    try {
        // Fill all inputs 
        if (!email || !password || !admin) {
            return res.status(409).send("Fill all the inputs ");

        }
        // Find the user 
        const user = await User.findOne({email: email, admin: admin});
        if (!user) {
            return res.status(409).send("User is not found ");

        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(409).send("User password is not matched ");
        }
        // Passwords match, create and send JWT token in response
res.cookie('ath', 'audba')
        
        res.status(200).json(user);
    } catch (err) {
        // catch the error 
        res.status(400).send(err);
    }
};

module.exports = {

    Register,
    Login,
    User1
};
