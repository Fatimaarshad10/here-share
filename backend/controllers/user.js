const User = require("../models/user");
const bcrypt = require('bcrypt')
/* All User Data   */
const Users = async (req, res) => {
    const userData = await User.find({});
    res.status(200).json(userData);

};
/* User Register   */
const Register = async (req, res) => {
    const {name, email, password, admin} = req.body;
    try {
        if (!name || !email || !password || !admin) {
            return res.status(409).send("Fill all the inputs ");
        }
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const User1 = new User({name, email, password, admin});
        const salt = await bcrypt.genSalt(10)
        User1.password = await bcrypt.hash(User1.password, salt)

        await User1.save();

        res.status(200).json("user registered successfully");

    } catch (err) {
        res.status(400).send(err.message);

    }
};
let emailData ; 

const Login = async (req, res) => {
    const {email, password, admin} = req.body;
    try {
        if (!email || !password || !admin) {
            throw Error("Fill Input Field");
        }
        const loginUser = await User.findOne({email: email, admin: admin});
        const HashPassword = await bcrypt.compare(JSON.stringify(password), JSON.stringify(loginUser.password));
        if (HashPassword) {
            res.status(200).json({message: "Valid password"});
        }
         res.cookie('new', loginUser.email);
        res.status(200).json(loginUser);
        console.log("user is login");
         emailData = loginUser.email
        
    } catch (err) {
        res.status(400).send(err.message);
    }
};
const SuccessData  = async (req, res) => {
    if(emailData){
        const loginUser = await User.findOne({email: emailData});
        res.status(200).json(loginUser);

    }else{
        res.status(400).json('Cookie is not available');
    }
};
const logoutCookie  = async (req, res) => {
   
        req.session.destroy(() => {
            res.clearCookie('new', { domain: 'localhost',path: '/', httpOnly: false, secure: false });

            res.clearCookie('connect.sid', {path: '/'})
            emailData = ''
            return res.redirect("http://localhost:3000/register");
          });
        
        
    
        
         
           
       
};
module.exports = {
Users ,
    Register,
    Login,
    SuccessData , 
    logoutCookie
};
