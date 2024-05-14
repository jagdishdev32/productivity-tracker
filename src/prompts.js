const readline = require("readline");
const readlineSync = require("readline-sync");

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

// const promptPassphrase = (callback) => {
//   const passphrase = readlineSync.question("Enter passphrase: ", {
//     hideEchoBack: true,
//   });
//   callback(passphrase);
// };

module.exports = { promptDescription, promptPassphrase, rl };
