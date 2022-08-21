const User = require("../Models/User");
module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist"
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: "Kindly check your inbox to verify your account"
      });
    }
    const result = await compareAsync(password, user.password);
    console.log(result);
    if (!result) {
      console.log(req.query.sessionId);
      if (req.query.sessionId !== undefined) {
        return res.redirect(`/login?q=wrong&sessionId=${sessionIdForBooking}`);
      } else {
        return res.redirect(`/login?q=wrong`);
      }
    }
    req.session.userId = user.id;

    console.log(req.session);

    console.log("----------------------");
    console.log(req.query.sessionId);
    if (req.query.sessionId !== undefined) {
      console.log("REACHING THIS BLOCK");
      let booking = await Booking.findOneAndUpdate(
        { quoteUserSessionId: req.query.sessionId },
        {
          $set: {
            user: user._id
          }
        },
        { new: true }
      );

      return res.redirect("/booking" + `?q=${booking.id}`);
    }

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error! Please reload page" });
  }
};
