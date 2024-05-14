const analyzeProductivity = (log) => {
  const totalTaskTime = log
    .filter((entry) => entry.type === "Task")
    .reduce((acc, entry) => acc + entry.duration, 0);
  const totalBreakTime = log
    .filter((entry) => entry.type.startsWith("Break"))
    .reduce((acc, entry) => acc + entry.duration, 0);
  console.log(`Productivity Analysis:`);
  console.log(`Total Task Time: ${totalTaskTime / 3600} hours`);
  console.log(`Total Break Time: ${totalBreakTime / 60} minutes`);
};

module.exports = { analyzeProductivity };
