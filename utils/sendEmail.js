const { default: axios } = require("axios");
const { encrypt } = require("../utils/encryptDecrypt");

const sendEmail = async (obj) => {
  try {
    const { email, userId, name } = obj;
    const { iv: xiv, encryptedData: encryptedUserId } = encrypt(userId);
    const emailData = {
      sender: {
        name: "AlienBot",
        email: "noreply@alienbot.io"
      },
      to: [
        {
          email: email,
          name: name
        }
      ],
      subject: "User verification email",
      htmlContent: `
      Hello ${name}, please click the link below to verify your account.
      <a href="${
        process.env.NODE_ENV === undefined
          ? process.env.DEVELOPMENT_URL
          : process.env.PRODUCTION_URL
      }/auth/verify-user/${encryptedUserId}/${xiv}">Verify Email</a>`
    };
    axios
      .post(
        "https://api.sendinblue.com/v3/smtp/email",
        JSON.stringify(emailData),
        {
          headers: {
            "content-type": "application/json",
            "api-key": process.env.SENDINBLUE_API_KEY,
            accept: "application/json"
          }
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  } catch (err) {
    console.log(err);
    return { msg: "err", err };
  }
};

module.exports = sendEmail;
