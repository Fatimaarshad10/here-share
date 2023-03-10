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
    const file = req.file
    try {
        if (!name || !email || !password || !admin || !file) {
            return res.status(409).send("Fill all the inputs ");
        }
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const User1 = new User({name, email, password, admin , image:`http://localhost:4000/profile/${req.file.filename}`});

        const salt = await bcrypt.genSalt(10);
        User1.password = await bcrypt.hash(User1.password, salt);

        await User1.save();

        res.status(200).json("user registered successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password ) {
            throw Error("Fill Input Field");
        }
        const loginUser = await User.findOne({email: email});

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

module.exports = {
    Users,
    Register,
    Login,
};
