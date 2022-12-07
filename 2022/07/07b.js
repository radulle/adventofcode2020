const { consoleTime } = require("lib");
const { getDirs } = require("./getDirs");

consoleTime(() => solve());

function solve() {
  const dirs = getDirs();

  const free = 70_000_000 - dirs[""];
  const missing = 30_000_000 - free;

  let min = Infinity;
  for (const key in dirs) {
    if (missing < dirs[key] && dirs[key] < min) min = dirs[key];
  }

  console.info(min);
}
