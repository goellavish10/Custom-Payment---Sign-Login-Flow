const User = require("../Models/User");

module.exports.authentication = async (req, res, next) => {
  const userId = req.session?.userId;
  if (!userId) {
    console.log("retunring from here");
    return res.redirect("/login");
  }
  try {
    let user = await User.findById(userId);
    req.user = { id: user.id };
    next();
  } catch (err) {
    console.log(err);
    res.render("error_page", {
      title: "Error!",
      url: "/logout"
    });
  }
};
