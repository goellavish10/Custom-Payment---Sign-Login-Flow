const express = require("express");
const { postLogin } = require("../controllers/loginController");

const router = express.Router();

const { userSignUpController } = require("../controllers/signUpController");
const { userVerification } = require("../controllers/verificationControllers");

router.post("/sign-up", userSignUpController);
router.post("/login", postLogin);
router.get("/verify/:encryptedUserId/:xiv", userVerification);

module.exports = router;
