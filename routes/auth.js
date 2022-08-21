const express = require("express");

const router = express.Router();

const { userSignUpController } = require("../controllers/signUpController");
const { userVerification } = require("../controllers/verificationControllers");

router.post("/sign-up", userSignUpController);
router.get("/verify/:encryptedUserId/:xiv", userVerification);

module.exports = router;
