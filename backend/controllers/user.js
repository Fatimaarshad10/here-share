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
    try {
        const {name, email, password, admin} = req.body;
        // Fill all inputs 
        if (!name || !email || !password || !admin) 
            throw "Please fill all inputs";
        // Find the user 
        if (await User.findOne({email})) 
            throw "User already exists";
        // Create a New user 
        const newUser = await new User({
            name,
            email,
            password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
            admin
        }).save();
        res.json({message: "Registration is done"});

    } catch (err) {
        // catch the error 
        res.status(400).json(err);
    }
};

/* User logout  */
const Login = async (req, res) => {
    const {email, password, admin} = req.body;
    try {
        // Fill all inputs 
        if (!email || !password || !admin) {
            res.status(400).send({message: "fill the inputs "});
        }
        // Find the user 
        const user = await User.findOne({email: email, admin: admin});
        if (!user) {
            res.status(400).send({message: "user is not found"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).send({message: "invalid password "});
        }
        // Passwords match, create and send JWT token in response
        const token = jwt.sign({
            user_id: user._id,
            email
        }, process.env.TOKEN_KEY, {expiresIn: "2h"});
        // create a cookie 
        res.cookie('auth', token, {
            expires: new Date(Date.now() + 60000),
            httpOnly: false,
            secure: true,
            sameSite: 'strict'
        })
        res.status(200).json({message: "register us  successful"});
    } catch (err) {
        // catch the error 
        res.status(400).send({message: "user is not found "});
    }
};

module.exports = {

    Register,
    Login,
    User1
};
