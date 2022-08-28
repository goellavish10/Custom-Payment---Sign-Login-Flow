const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const validateEmail = require("../utils/emailValidator");
const { encrypt } = require("../utils/encryptDecrypt");
module.exports.userSignUpController = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      password: plainTextPassword,
      phone,
      check
    } = req.body;

    console.log(req.body);

    const isEmailValid = validateEmail(email);

    console.log("Email is valid: ", isEmailValid);

    if (!isEmailValid) {
      return res.status(400).json({
        success: false,
        message: "Please enter a correct email address"
      });
    }

    if (
      email === "" ||
      plainTextPassword === "" ||
      phone === "" ||
      username === "" ||
      name === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all details correctly!"
      });
    }

    if (!check) {
      return res.status(400).json({
        success: false,
        message: "Please accept Terms & Conditions!"
      });
    }

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login!"
      });
    }

    user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username already exists, please choose another one!"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    user = new User({
      name: name,
      email: email,
      username: username,
      password: hashedPassword,
      phone: phone
    });

    sendEmail({ email: user.email, userId: user.id, name: user.name });

    await user.save();

    const { iv, encryptedData: encryptedUserName } = encrypt(user.username);

    res.json({
      message: "User successfully registered",
      redirectURI: `${
        process.env.NODE_ENV === undefined
          ? process.env.DEVELOPMENT_URL
          : process.env.LIVE_URL
      }/user-verification/${encryptedUserName}/${iv}`
    });
  } catch (err) {
    console.log(err);
  }
};
