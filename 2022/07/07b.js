const { consoleTime } = require("lib");
const { getDirs } = require("./getDirs");

consoleTime(() => solve());

function solve() {
  const dirs = getDirs();

  const free = 70000000 - dirs[""];
  const missing = 30000000 - free;

  let min = Infinity;
  for (const key in dirs) {
    if (missing < dirs[key] && dirs[key] < min) min = dirs[key];
  }

  console.info(min);
}
