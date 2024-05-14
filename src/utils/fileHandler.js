const fs = require("fs");
const { encryptData, decryptData } = require("./encryption");
const { getCurrentDate } = require("./utils");

const logDirectory = "logs/";

const getLogFilePath = () => {
  const currentDate = getCurrentDate();
  return `${logDirectory}${currentDate}.log.enc`;
};

const saveLog = (log, passphrase) => {
  const logFilePath = getLogFilePath();
  const data = JSON.stringify(log, null, 2);
  const encryptedData = encryptData(data, passphrase);
  fs.writeFileSync(logFilePath, encryptedData);
};

const loadLog = (passphrase) => {
  const logFilePath = getLogFilePath();
  try {
    const encryptedData = fs.readFileSync(logFilePath, "utf-8");
    const data = decryptData(encryptedData, passphrase);
    return JSON.parse(data);
  } catch (err) {
    console.warn(
      `Could not load log for ${getCurrentDate()}. Starting with a new log.`
    );
    return [];
  }
};

module.exports = { saveLog, loadLog };
