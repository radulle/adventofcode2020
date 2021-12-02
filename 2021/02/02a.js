const fs = require("fs");

const consoleTime = (logMe) => {
  console.time();
  console.info(logMe());
  console.timeEnd();
};

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\n")
  .map((str) => str.split(" "))
  .map(([a, b]) => [a, +b]);
consoleTime(() => solve(data));

function solve(data) {
  let x = 0,
    y = 0;
  for (const [dir, amt] of data) {
    switch (dir) {
      case "up":
        y -= amt;
        break;
      case "down":
        y += amt;
        break;
      case "forward":
        x += amt;
        break;
    }
  }
  return x * y;
}
