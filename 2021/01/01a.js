const fs = require("fs");

const consoleTime = (logMe) => {
  console.time();
  console.info(logMe());
  console.timeEnd();
};

const data = fs.readFileSync("data.txt", "utf8").split("\n").map(Number);
consoleTime(() => solve(data));

function solve(data) {
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) count++;
  }
  return count;
}
