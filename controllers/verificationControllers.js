module.exports.userVerification = async (req, res) => {
  try {
    const { encryptedUserId, xiv } = req.body;
  } catch (err) {
    console.log(err);
  }
};
