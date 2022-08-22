const User = require("../Models/User");
module.exports.postLogin = async (req, res) => {
  const { email, password: plainTextPassword } = req.body;
  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({
        message: "User does not exist"
      });
    }
    if (!user.isVerified) {
      return res.json({
        message: "Kindly check your inbox to verify your account"
      });
    }
    const result = await bcrypt.compare(plainTextPassword, user.password);
    console.log(result);
    if (!result) {
      return res.json({
        message: "Wrong email password combination"
      });
    }
    req.session.userId = user.id;

    console.log(req.session);

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error! Please reload page" });
  }
};
