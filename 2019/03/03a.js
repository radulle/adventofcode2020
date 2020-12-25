const fs = require("fs");
const _ = require("lodash");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

try {
  const [wire1, wire2] = fs
    .readFileSync("data.txt", "utf8")
    .split("\n")
    .map((e) => e.split(",").map((e) => [e[0], Number(e.substring(1))]));
  console.infoTime(() => calculate(wire1, wire2));
} catch (err) {
  console.error(err);
}

function calculate(wire1, wire2) {
  return manhattanDistances(intersections(wire1, wire2))[1];
}

function manhattanDistances(intersections) {
  return intersections.map(([x, y]) => x + y).sort();
}

function intersect(a, b) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  return Array.from(intersection);
}

function intersections(wire1, wire2) {
  const path1 = path(wire1).map(JSON.stringify);
  const path2 = path(wire2).map(JSON.stringify);
  const intersections = intersect(path1, path2).map(JSON.parse);
  return intersections;
}

function path(data) {
  return data.reduce(
    (acc, [dir, len]) => {
      const [x, y] = acc[acc.length - 1];
      switch (dir) {
        case "L":
          for (let i = 1; i <= len; i++) {
            acc.push([x - i, y]);
          }
          break;
        case "R":
          for (let i = 1; i <= len; i++) {
            acc.push([x + i, y]);
          }
          break;
        case "D":
          for (let i = 1; i <= len; i++) {
            acc.push([x, y - i]);
          }
          break;
        case "U":
          for (let i = 1; i <= len; i++) {
            acc.push([x, y + i]);
          }
          break;
      }
      return acc;
    },
    [[0, 0]]
  );
}
