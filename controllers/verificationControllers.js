const User = require("../Models/User");
const { decrypt } = require("../utils/encryptDecrypt");

module.exports.userVerification = async (req, res) => {
  try {
    const { encryptedUserId, xiv } = req.params;

    const userId = decrypt({ iv: xiv, encryptedData: encryptedUserId });
    console.log(userId);
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }

    if (user.isVerified) {
      console.log("User already verified");
      return res.redirect("/dashboard");
    }

    user = await User.findByIdAndUpdate(
      userId,
      { $set: { isVerified: true } },
      { new: true }
    );

    req.session.userId = user.id;

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
