#!/usr/bin/env node

const {
  promptDescription,
  promptPassphrase,
  promptPomodoro,
  rl,
} = require("./prompts");
const { startBreakTimer } = require("./utils/timer");
const { saveLog, loadLog } = require("./utils/fileHandler");
const { analyzeProductivity } = require("./productivity");
const { v4: uuidv4 } = require("uuid");
const { startPomodoroSession } = require("./utils/pomodoro");

const config = require("../config/config.json");

let log = [];
let currentSession = {
  sessionId: uuidv4(),
  //   sessionId: Date.now(),
  taskStart: null,
  breakStart: null,
};

let breakTimer; // Defining breakTimer here

const getCurrentTime = () => new Date().toISOString();
const calculateDuration = (startTime, endTime) =>
  (new Date(endTime) - new Date(startTime)) / 1000; // in seconds

const handleTaskInput = (description) => {
  const currentTime = getCurrentTime();
  if (currentSession.breakStart) {
    const breakEnd = currentTime;
    log.push({
      sessionId: currentSession.sessionId,
      type: "Break",
      start: currentSession.breakStart,
      end: breakEnd,
      duration: calculateDuration(currentSession.breakStart, breakEnd),
      description: description || "Break ended due to new task",
    });
    console.log("Break ended. Task resumed.");
    currentSession.breakStart = null;
  }
  if (currentSession.taskStart) {
    const taskEnd = currentTime;
    log.push({
      sessionId: currentSession.sessionId,
      type: "Task",
      start: currentSession.taskStart,
      end: taskEnd,
      duration: calculateDuration(currentSession.taskStart, taskEnd),
      description: description || "No description",
    });
    console.log("Previous task ended. New task started.");
  }
  currentSession.taskStart = currentTime;
  log.push({
    sessionId: currentSession.sessionId,
    type: "Task",
    start: currentSession.taskStart,
    description: description || "No description",
  });
  promptPassphrase((passphrase) => saveLog(log, passphrase));
  startBreakTimer(config.breakInterval);
};

const handleBreakInput = (description) => {
  const currentTime = getCurrentTime();
  if (currentSession.taskStart) {
    const taskEnd = currentTime;
    log.push({
      sessionId: currentSession.sessionId,
      type: "Task",
      start: currentSession.taskStart,
      end: taskEnd,
      duration: calculateDuration(currentSession.taskStart, taskEnd),
      description: description || "Task ended due to new break",
    });
    console.log("Task ended. Break started.");
    currentSession.taskStart = null;
  }
  if (currentSession.breakStart) {
    const breakEnd = currentTime;
    log.push({
      sessionId: currentSession.sessionId,
      type: "Break",
      start: currentSession.breakStart,
      end: breakEnd,
      duration: calculateDuration(currentSession.breakStart, breakEnd),
      description: description || "No description",
    });
    console.log("Previous break ended. New break started.");
  }
  currentSession.breakStart = currentTime;
  log.push({
    sessionId: currentSession.sessionId,
    type: "Break",
    start: currentSession.breakStart,
    description: description || "No description",
  });
  promptPassphrase((passphrase) => saveLog(log, passphrase));
};

const displayLogs = () => {
  console.log("All Tasks and Breaks:");
  console.log("----------------------");
  log.forEach((entry, index) => {
    console.log(`Entry ${index + 1}:`);
    console.log(`Type: ${entry.type}`);
    console.log(`Description: ${entry.description || "No description"}`);
    console.log(`Duration: ${entry.duration || "Not available"} seconds`);
    console.log(`Start: ${entry.start}`);
    console.log(`End: ${entry.end || "Ongoing"}`);
    console.log("----------------------");
  });
};

rl.on("line", (input) => {
  const command = input.trim().toUpperCase();
  if (command === "T") {
    promptDescription(handleTaskInput);
  } else if (command === "B") {
    promptDescription(handleBreakInput);
  } else if (command === "P") {
    promptPomodoro(() => startPomodoroSession(config));
  } else if (command === "SUMMARY") {
    console.log("Summary Report:");
    const summary = log.reduce((acc, entry) => {
      if (!acc[entry.type]) acc[entry.type] = 0;
      acc[entry.type] += entry.duration || 0;
      return acc;
    }, {});
    console.log(`Total Task Time: ${summary.Task || 0} seconds`);
    console.log(`Total Break Time: ${summary.Break || 0} seconds`);
  } else if (command === "ANALYZE") {
    analyzeProductivity(log);
  } else if (command === "Q") {
    const currentTime = getCurrentTime();
    if (currentSession.taskStart) {
      const taskEnd = currentTime;
      log.push({
        sessionId: currentSession.sessionId,
        type: "Task",
        start: currentSession.taskStart,
        end: taskEnd,
        duration: calculateDuration(currentSession.taskStart, taskEnd),
        description: "Task ended due to quitting",
      });
      currentSession.taskStart = null;
    }
    if (currentSession.breakStart) {
      const breakEnd = currentTime;
      log.push({
        sessionId: currentSession.sessionId,
        type: "Break",
        start: currentSession.breakStart,
        end: breakEnd,
        duration: calculateDuration(currentSession.breakStart, breakEnd),
        description: "Break ended due to quitting",
      });
      currentSession.breakStart = null;
    }
    console.log("Quitting the program.");
    displayLogs();
    rl.close();
    process.exit(0);
  } else {
    console.log(
      'Invalid input. Press "T" for task, "B" for break, "P" for Pomodoro session, "SUMMARY" for a summary report, "ANALYZE" for productivity analysis, or "Q" to quit.'
    );
  }
});

promptPassphrase((passphrase) => {
  log = loadLog(passphrase);
  console.log(
    'Task Timer Started. Press "T" for task, "B" for break, "SUMMARY" for a summary report, or "ANALYZE" for productivity analysis.'
  );
  breakTimer = startBreakTimer(config.breakInterval); // Assigning startBreakTimer to breakTimer
});
