const crypto = require("crypto");

const encryptData = (data, passphrase) => {
  const cipher = crypto.createCipher("aes-256-cbc", passphrase);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptData = (data, passphrase) => {
  const decipher = crypto.createDecipher("aes-256-cbc", passphrase);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encryptData, decryptData };
