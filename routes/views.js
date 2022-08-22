const express = require("express");
const { authentication } = require("../middlewares");
const User = require("../Models/User");

const router = express.Router();

router.get("/sign-up", (req, res) => {
  try {
    res.render("sign-up");
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error!, please try again later"
    });
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error!, please try again later"
    });
  }
});

router.get("/dashboard", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render("dashboard", {
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error!, please try again later"
    });
  }
});

module.exports = router;
