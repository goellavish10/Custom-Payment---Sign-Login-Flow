//Checking the crypto module
const crypto = require("crypto");
const algorithm = process.env.ALGORITHM; //Using AES encryption
const key = "dDfgr26inFrtgab9ahLoR3b9@cFFC01B";
const keyhex = Buffer.from(key);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, keyhex, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// Decrypting text
function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, keyhex, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
