const { input, consoleTime } = require("lib");

const data = input().split("\n").map(Number);
consoleTime(() => solve(data));

function solve(data) {
  let count = 0,
    sum = Infinity;
  for (let i = 0; i < data.length - 2; i++) {
    const newSum = data[i] + data[i + 1] + data[i + 2];
    if (newSum > sum) count++;
    sum = newSum;
  }
  return count;
}
