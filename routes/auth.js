const express = require("express");
const { changeUserDetails } = require("../controllers/changeUserDetails");
const { postLogin } = require("../controllers/loginController");

const router = express.Router();

const { userSignUpController } = require("../controllers/signUpController");
const { userVerification } = require("../controllers/verificationControllers");

router.post("/sign-up", userSignUpController);
router.post("/login", postLogin);
router.get("/verify-user/:encryptedUserId/:xiv", userVerification);
router.post("/account/:username", changeUserDetails);

module.exports = router;
