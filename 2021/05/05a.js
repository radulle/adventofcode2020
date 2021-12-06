const fs = require("fs");

const consoleTime = (logMe) => {
  console.time();
  console.info(logMe());
  console.timeEnd();
};

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\n")
  .map((e) => e.split(" -> ").map((e) => e.split(",").map(Number)));

consoleTime(() => solve(data));

function hash(a, b) {
  return a + "," + b;
}

function add(map, x, y) {
  const pos = hash(x, y);
  map[pos] = (map[pos] || 0) + 1;
}

function solve(data) {
  const map = {};
  for (let [[x1, y1], [x2, y2]] of data) {
    if (!(x1 === x2 || y1 === y2)) continue;
    add(map, x1, y1);
    while (!(x1 === x2 && y1 === y2)) {
      x1 += Math.sign(x2 - x1);
      y1 += Math.sign(y2 - y1);
      add(map, x1, y1);
    }
  }

  return Object.values(map).reduce((acc, cur) => {
    if (cur > 1) acc++;
    return acc;
  }, 0);
}
