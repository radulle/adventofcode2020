const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const set = new Set();
  let Y1 = 2_000_000;
  const data = input()
    .split("\n")
    .map((e) =>
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
        .exec(e)
        .slice(1, 5)
        .map(Number)
    )
    .map(([X, Y, x, y]) => [X, Y, x, y, manhattan(X, Y, x, y)]);

  for (const [X, Y, , , d] of data) {
    let dx = 0;
    while (true) {
      if (Math.abs(dx) + Math.abs(Y - Y1) <= d) {
        set.add(X - dx);
        set.add(X + dx);
        dx++;
        continue;
      }
      break;
    }
  }

  for (const [X, Y, x, y] of data) {
    if (y === Y1 && set.has(x)) set.delete(x);
    if (Y === Y1 && set.has(X)) set.delete(x);
  }

  console.info(set.size);
}

function manhattan(X, Y, x, y) {
  return Math.abs(X - x) + Math.abs(Y - y);
}
