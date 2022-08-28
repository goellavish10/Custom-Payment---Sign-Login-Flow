const express = require("express");
const {
  homepage,
  signUpPage,
  loginPage
} = require("../controllers/viewsController/authPages");
const {
  userVerification
} = require("../controllers/viewsController/confirmationMessages");
const {
  dashboardPage,
  userAccountPage
} = require("../controllers/viewsController/dashboard");
const { authentication, isLoggedIn } = require("../middlewares");

const router = express.Router();

router.get("/", isLoggedIn, homepage);

router.get("/sign-up", isLoggedIn, signUpPage);

router.get("/login", isLoggedIn, loginPage);

router.get("/dashboard", authentication, dashboardPage);

router.get("/user-verification/:encryptedUserId/:xiv", userVerification);

router.get("/account/:username", authentication, userAccountPage);

module.exports = router;
