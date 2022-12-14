const User = require("../Models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
module.exports.userSignUpController = async (req, res) => {
  try {
    const { name, email, username, password: plainTextPassword } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    user = new User({
      name: name,
      email: email,
      username: username,
      password: hashedPassword
    });

    sendEmail({ email: user.email, userId: user.id, name: user.name });

    await user.save();
  } catch (err) {
    console.log(err);
  }
};
