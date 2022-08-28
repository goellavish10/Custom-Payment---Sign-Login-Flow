const express = require("express");
const { changeUserDetails } = require("../controllers/changeUserDetails");
const { postLogin } = require("../controllers/loginController");
const { choosePaymentMethod } = require("../controllers/paymentController");

const router = express.Router();

const { userSignUpController } = require("../controllers/signUpController");
const { userVerification } = require("../controllers/verificationControllers");
const { authentication } = require("../middlewares");

router.post("/sign-up", userSignUpController);
router.post("/login", postLogin);
router.get("/verify-user/:encryptedUserId/:xiv", userVerification);
router.post("/account/:username", authentication, changeUserDetails);
router.post("/payment/method", authentication, choosePaymentMethod);

module.exports = router;
