const fs = require("fs");
const { encryptData, decryptData } = require("./encryption");

const logFilePath = "logs/log.enc";

const saveLog = (log, passphrase) => {
  const data = JSON.stringify(log, null, 2);
  const encryptedData = encryptData(data, passphrase);
  fs.writeFileSync(logFilePath, encryptedData);
};

const loadLog = (passphrase) => {
  try {
    const encryptedData = fs.readFileSync(logFilePath, "utf-8");
    const data = decryptData(encryptedData, passphrase);
    return JSON.parse(data);
  } catch (err) {
    console.warn("Could not decrypt log file. Starting with a new log.");
    return [];
  }
};

module.exports = { saveLog, loadLog };
