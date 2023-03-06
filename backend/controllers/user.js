const User = require("../models/user");
const bcrypt = require("bcrypt");

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

        const salt = await bcrypt.genSalt(10);
        User1.password = await bcrypt.hash(User1.password, salt);

        await User1.save();

        res.status(200).json("user registered successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

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
        req.session.isAuth = true
        console.log(req.session.id)
        res.status(200).json(loginUser);
        console.log("user is login");
    } catch (err) {
        res.status(400).send(err.message);
    }
};
const logoutCookie = async (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid', {path: '/'})
        return res.redirect("http://localhost:3000/login");
    });

};
module.exports = {
    Users,
    Register,
    Login,
    logoutCookie
};
