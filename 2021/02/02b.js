const { input, consoleTime } = require("lib");

const data = input()
  .split("\n")
  .map((str) => str.split(" "))
  .map(([a, b]) => [a, +b]);
consoleTime(() => solve(data));

function solve(data) {
  let x = 0,
    y = 0,
    Y = 0;
  for (const [dir, amt] of data) {
    switch (dir) {
      case "up":
        Y -= amt;
        break;
      case "down":
        Y += amt;
        break;
      case "forward":
        x += amt;
        y += amt * Y;
        break;
    }
  }
  return x * y;
}
