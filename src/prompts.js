const readline = require("readline");
const getpass = require("getpass");

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
  getpass.getPass(["Enter passphrase: "], (err, passphrase) => {
    if (err) {
      console.error("Error:", err.message);
      return;
    }
    callback(passphrase);
  });
};

// const promptPassphrase = (callback) => {
//   rl.question("Enter passphrase: ", (passphrase) => {
//     callback(passphrase);
//   });
// };

const promptPomodoro = (callback) => {
  rl.question("Start Pomodoro session? (Y/N): ", (answer) => {
    if (answer.toUpperCase() === "Y") {
      callback();
    } else {
      console.log("Pomodoro session canceled.");
    }
  });
};

// const promptPassphrase = (callback) => {
//   const passphrase = readlineSync.question("Enter passphrase: ", {
//     hideEchoBack: true,
//   });
//   callback(passphrase);
// };

module.exports = { promptDescription, promptPassphrase, promptPomodoro, rl };
