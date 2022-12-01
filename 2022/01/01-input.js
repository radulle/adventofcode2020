const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input()
    .split("\n\n")
    .map((e) => e.split("\n").map(Number));

  const sums = data
    .map((e) => e.reduce((acc, cur) => acc + cur, 0))
    .sort()
    .reverse();

  sums.sort((a, b) => b - a);
  console.info(sums[0]);
  console.info(sums.slice(0, 3).reduce((acc, cur) => acc + cur, 0));
}
