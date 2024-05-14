const notifier = require("node-notifier");

let breakTimer;

const startBreakTimer = (interval, message) => {
  if (breakTimer) clearTimeout(breakTimer);
  breakTimer = setTimeout(() => {
    notifier.notify({
      title: "Break Reminder",
      message: message || "Time to take a break!",
    });
  }, interval * 1000);
};

module.exports = { startBreakTimer };
