const { decrypt } = require("../../utils/encryptDecrypt");

module.exports.userVerification = async (req, res) => {
  try {
    const username = decrypt({
      iv: req.params.xiv,
      encryptedData: req.params.encryptedUserId
    });

    res.render("confirmation", {
      username
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error! Please try again later."
    });
  }
};
