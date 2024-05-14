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
      duration: calculateDuration(currentSession.breakStart, breakEnd), // Add duration property
      description: description || "No description",
    });
    console.log("Break ended. Task resumed.");
    currentSession.breakStart = null;
  }
  currentSession.taskStart = currentTime;
  console.log("Task time logged.");
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
      duration: calculateDuration(currentSession.taskStart, taskEnd), // Add duration property
      description: description || "No description",
    });
    console.log("Task ended. Break started.");
    currentSession.taskStart = null;
  }
  currentSession.breakStart = currentTime;
  console.log("Break time logged.");
  log.push({
    sessionId: currentSession.sessionId,
    type: "BreakStart",
    start: currentSession.breakStart,
    description: description || "No description",
  });
  promptPassphrase((passphrase) => saveLog(log, passphrase));
  startBreakTimer(config.breakInterval);
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
    console.log("Quitting the program.");
    console.log("All Tasks and Breaks:");
    console.log(log); // Display all tasks and breaks
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
