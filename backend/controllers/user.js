const User = require("../models/user");
const bcrypt = require('bcrypt')
/* All User Data   */
const User1 = async (req, res) => {
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


const Login = async (req, res) => {
    const {email, password, admin} = req.body;
    try {
        if (!email || !password || !admin) {
            throw Error("Fill Input Field");
        }
        const User2 = await User.findOne({email: email, admin: admin});
        const HashPassword = await bcrypt.compare(JSON.stringify(password), JSON.stringify(User2.password));
        if (HashPassword) {
            res.status(200).json({message: "Valid password"});
        }
        req.session.userId = User2.id;
        console.log(req.session.userId)
        // res.cookie('data', req.session.userId, {httpOnly: true ,  maxAge: 20  * 60 * 1000});

        res.status(200).json(User2);
        console.log("user is login");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = {

    Register,
    Login,
    User1
};
