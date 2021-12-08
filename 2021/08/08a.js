const { input, consoleTime } = require("lib");

const data = input
  .split("\n")
  .map((row) => row.split(" | ").map((half) => half.split(" ")));

consoleTime(() => solve(data));

function solve(data) {
  const result = data.reduce(
    (acc, cur) =>
      acc + cur[1].filter((code) => [2, 3, 4, 7].includes(code.length)).length,
    0
  );

  return result;
}
