const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptDescription = (callback) => {
  rl.question("Enter description: ", (description) => {
    callback(description);
  });
};

const promptPassphrase = (callback) => {
  rl.question("Enter passphrase: ", (passphrase) => {
    callback(passphrase);
  });
};

module.exports = { promptDescription, promptPassphrase, rl };
