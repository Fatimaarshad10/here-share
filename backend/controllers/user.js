const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const nodemailer = require("nodemailer");

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
  passport.authenticate("local", (err, user) => {
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
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    let updateData = { ...req.body };
    if (updateData.password) {
      // Hash the new password before storing it
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }
    const UserData = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...updateData,
        ...(req.file
          ? { image: `http://localhost:4000/profile/${req.file.filename}` }
          : req.body.image),
      },
    
      { new: true } // to return the updated document
    );
    res.status(200).json(UserData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const deleteUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const sendEmail = async (req, res) => {
  const { email, message } = req.body;
  let transporter = nodemailer.createTransport({
    
    service:'gmail',
    auth: {
      user: "fatimaarshad091@gmail.com",
      pass: "aujicqesztopxerk",
    },
  });
  let emailData = {
    from: email,
    to: "fatimaarshad091@gmail.com",
    subject: `Message from ${email}`,
    text: message,
  };
  transporter.sendMail(emailData, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error);
      return true;
    } else {
      res.status(200).json("Email sent: " + info.response);
      return false;
    }
  });
};
const  GetOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the post details using the post ID
    const post = await User.findById(id);

    // Send the post data in the response
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
const get_user = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch all posts created by the user
    const posts = await User.findById(id)

    // Send the posts data in the response
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports = {
  Users,
  Register,
  LoginController,
  updateUser,
  deleteUserData,
  sendEmail,
  GetOneUser , 
  get_user
};
