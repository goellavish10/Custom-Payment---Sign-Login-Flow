const User = require("../../Models/User");
const { encrypt } = require("../../utils/encryptDecrypt");
module.exports.dashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { iv, encryptedData: encryptedUserId } = encrypt(user.id);
    res.render("dashboard", {
      username: user.username,
      encryptedUserId,
      iv
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error! Please try again later"
    });
  }
};

module.exports.userAccountPage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { iv, encryptedData: encryptedUserId } = encrypt(user.id);

    res.render("user_account", {
      name: user.name,
      username: user.username,
      phone: user.phone,
      iv,
      encryptedUserId
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error! Please try again later"
    });
  }
};
