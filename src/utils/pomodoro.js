const { startBreakTimer } = require("./timer");
const { promptPomodoro } = require("../prompts");

const startPomodoroSession = (config) => {
  console.log("Starting Pomodoro session...");
  const workDuration = config.pomodoroWorkDuration || 25 * 60; // Default: 25 minutes
  const shortBreakDuration = config.pomodoroShortBreakDuration || 5 * 60; // Default: 5 minutes
  const longBreakDuration = config.pomodoroLongBreakDuration || 15 * 60; // Default: 15 minutes
  const pomodoroCycle = config.pomodoroCycle || 4; // Default: 4 Pomodoro sessions before a long break

  let pomodoroCount = 0;

  const startWorkSession = () => {
    console.log(`Work session started. Duration: ${workDuration / 60} minutes`);
    setTimeout(() => {
      pomodoroCount++;
      console.log(`Work session ended. (${pomodoroCount}/${pomodoroCycle})`);
      if (pomodoroCount < pomodoroCycle) {
        startShortBreak();
      } else {
        startLongBreak();
      }
    }, workDuration * 1000);
  };

  const startShortBreak = () => {
    console.log(
      `Short break started. Duration: ${shortBreakDuration / 60} minutes`
    );
    startBreakTimer(shortBreakDuration, "Take a short break!");
  };

  const startLongBreak = () => {
    console.log(
      `Long break started. Duration: ${longBreakDuration / 60} minutes`
    );
    startBreakTimer(longBreakDuration, "Take a long break!");
    pomodoroCount = 0; // Reset Pomodoro count after long break
  };

  startWorkSession();
};

module.exports = { startPomodoroSession };
