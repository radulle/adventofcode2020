const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const X = 500;
  const Y = 0;
  const data = input()
    .split("\n")
    .map((line) => line.split(" -> ").map((e) => e.split(",").map(Number)));
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const line of data) {
    for (const [x, y] of line) {
      if (y > maxY) maxY = y;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (x < minX) minX = x;
    }
  }

  const width = Math.max(maxX + 1, X + maxY + 1);
  const grid = new Array(maxY + 1).fill().map(() => Array(width).fill("."));
  grid.set = (x, y, v) => (grid[y][x] = v);
  grid.has = (x, y) => grid[y][x] !== ".";

  for (const line of data) {
    for (const [x, y] of line) {
      let [X, Y] = line[0];
      grid.set(X, Y, "#");
      for (let i = 1; i < line.length; i++) {
        let [x, y] = line[i];
        const dx = (x - X) / Math.abs(x - X);
        const dy = (y - Y) / Math.abs(y - Y);
        for (let xx = X; dx && xx !== x; xx += dx) grid.set(xx + dx, y, "#");
        for (let yy = Y; dy && yy !== y; yy += dy) grid.set(x, yy + dy, "#");
        X = x;
        Y = y;
      }
    }
  }

  function roll(x, y) {
    if (!grid[y + 1]) return false;
    if (!grid.has(x, y + 1)) return roll(x, y + 1);
    if (!grid.has(x - 1, y + 1)) return roll(x - 1, y + 1);
    if (!grid.has(x + 1, y + 1)) return roll(x + 1, y + 1);
    grid.set(x, y, "o");
    return true;
  }

  let result = 0;
  while (roll(X, Y)) result++;
  console.info(result);

  grid.push(Array(width).fill("."));
  grid.push(Array(width).fill("#"));
  while (!grid.has(X, Y)) roll(X, Y), result++;
  console.log(result);
}
