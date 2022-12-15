const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let SIZE = 4_000_000;
  const data = input()
    .split("\n")
    .map((e) =>
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
        .exec(e)
        .slice(1, 5)
        .map(Number)
    )
    .map(([X, Y, x, y]) => [X, Y, x, y, manhattan(X, Y, x, y)]);

  main: for (const [X, Y, , , d] of data) {
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (let dx = 0; dx <= d + 1; dx++) {
          const xx = X + sx * dx;
          const yy = Y + sy * (d + 1 - dx);
          if (xx < 0 || yy < 0 || xx > SIZE || yy > SIZE) continue;
          if (isOutside(xx, yy)) {
            console.info(xx * 4_000_000 + yy);
            break main;
          }
        }
      }
    }
  }

  function isOutside(x, y) {
    for (const [X, Y, , , d] of data) {
      const dd = manhattan(X, Y, x, y);
      if (dd < d + 1) return false;
    }
    return true;
  }
}

function manhattan(X, Y, x, y) {
  return Math.abs(X - x) + Math.abs(Y - y);
}
