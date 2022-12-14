const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let maxY = -Infinity;
  const map = new Map();

  {
    for (const line of input().split("\n")) {
      const segments = line.split(" -> ").map((e) => e.split(",").map(Number));
      let [X, Y] = segments[0];
      map.set(h(X, Y), "#");
      for (let i = 1; i < segments.length; i++) {
        let [x, y] = segments[i];
        if (y > maxY) maxY = y;
        const dx = (x - X) / Math.abs(x - X);
        const dy = (y - Y) / Math.abs(y - Y);
        for (let xx = X; dx && xx !== x; xx += dx) map.set(h(xx + dx, y), "#");
        for (let yy = Y; dy && yy !== y; yy += dy) map.set(h(x, yy + dy), "#");
        X = x;
        Y = y;
      }
    }
  }

  const X = 500;
  const Y = 0;

  function roll(x, y) {
    if (y === maxY + 1) return false;
    if (!map.has(h(x, y + 1))) return roll(x, y + 1);
    if (!map.has(h(x - 1, y + 1))) return roll(x - 1, y + 1);
    if (!map.has(h(x + 1, y + 1))) return roll(x + 1, y + 1);
    map.set(h(x, y), "o");
    return true;
  }

  let result = 0;
  while (roll(X, Y)) result++;
  console.info(result);

  maxY += 2;
  for (let xx = 500 - maxY; xx < 500 + maxY + 1; xx++)
    map.set(h(xx, maxY), "#");
  while (!map.has(h(X, Y))) roll(X, Y), result++;
  console.log(result);
}

function draw(map) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const key of map.keys()) {
    const [x, y] = key.split(",");
    if (+y > maxY) maxY = +y;
    if (+y < minY) minY = +y;
    if (+x > maxX) maxX = +x;
    if (+x < minX) minX = +x;
  }

  const grid = new Array(maxY + 1)
    .fill()
    .map(() => new Array(maxX - minX + 1).fill("."));

  for (const [p, v] of map.entries()) {
    const [c, r] = p.split(",");
    grid[r][c - minX] = v;
  }
  console.info(grid.map((r) => r.join("")).join("\n"));
}

function h(x, y) {
  return `${x},${y}`;
}
