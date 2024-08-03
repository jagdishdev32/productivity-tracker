const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Utility function to calculate minutes from seconds
const secondsToMinutes = (seconds) => Math.round(seconds / 60);

// Function to process logs and group by hour
const getHourlySummary = (logs) => {
  const hourlySummary = {};

  logs.forEach((entry) => {
    const start = new Date(entry.start);
    const end = entry.end ? new Date(entry.end) : new Date();
    const hour = start.getUTCHours();

    if (!hourlySummary[hour]) {
      hourlySummary[hour] = { tasks: 0, breaks: 0 };
    }

    const duration = entry.duration ? entry.duration : (end - start) / 1000;
    const minutes = secondsToMinutes(duration);

    if (entry.type === "Task") {
      hourlySummary[hour].tasks += minutes;
    } else if (entry.type === "Break") {
      hourlySummary[hour].breaks += minutes;
    }
  });

  return hourlySummary;
};

// Function to display hourly summary
const displayHourlySummary = (hourlySummary) => {
  console.log("Hourly Summary:");
  Object.keys(hourlySummary).forEach((hour) => {
    const hourSummary = hourlySummary[hour];
    console.log(
      `Hour ${hour}: Tasks: ${hourSummary.tasks} minutes, Breaks: ${hourSummary.breaks} minutes`
    );
  });
};

const fromLogsGetHourlySummary = (logs) => {
  const hourlySummary = getHourlySummary(logs);
  displayHourlySummary(hourlySummary);
};
module.exports = { getCurrentDate, fromLogsGetHourlySummary };
