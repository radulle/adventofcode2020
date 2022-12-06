const { input, consoleTime } = require("lib");

consoleTime(() => solve(4));

function solve(count) {
  const data = input();

  for (let i = 0; i < data.length; i++) {
    const set = new Set(data.slice(i, i + count).split(""));
    if (set.size === count) {
      console.info(i + count);
      break;
    }
  }
}
