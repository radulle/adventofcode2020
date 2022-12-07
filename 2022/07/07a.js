const { consoleTime } = require("lib");
const { getDirs } = require("./getDirs");

consoleTime(() => solve());

function solve() {
  const dirs = getDirs();

  let result = [...Object.values(dirs)]
    .filter((e) => e <= 100_000)
    .reduce((acc, cur) => acc + cur, 0);
  console.info(result);
}
