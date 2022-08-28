const User = require("../Models/User");
const { decrypt } = require("../utils/encryptDecrypt");

module.exports.changeUserDetails = async (req, res) => {
  console.log("reaching here");
  try {
    const {
      name,
      username,
      phone,
      password: plainTextPassword,
      confirmPassword: plainTextConfirmPassword
    } = req.body;

    if (
      plainTextPassword !== "" &&
      plainTextPassword !== plainTextConfirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    console.log(req.headers);

    const userId = decrypt({
      iv: req.headers.application_header,
      encryptedData: req.headers.userid
    });

    let user = await User.findOne({ username });

    if (user.id !== userId) {
      return res.status(400).json({
        success: false,
        message: "Username taken. Please choose something else."
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (plainTextPassword !== "") {
      const password = await bcrypt.hash(plainTextPassword, 10);
      user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            name,
            username,
            phone,
            password
          }
        },
        { new: true }
      );

      return res.json({
        success: true,
        message: "User details updated successfully"
      });
    }

    user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          username,
          phone
        }
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "User details updated successfully"
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server Error, please try again later!"
    });
  }
};
