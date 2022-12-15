const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let ranges = [];
  let Y1 = 2_000_000;
  let SIZE = 4_000_000;
  if (process.argv[2] === "ex.txt") {
    Y1 = 10;
    SIZE = 20;
  }

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
    const dx = d - Math.abs(Y - Y1);
    if (dx < 0) continue;
    ranges.push([X - dx, X + dx]);
  }

  const merged = merge(ranges, true);

  console.info(
    merged.reduce((a, c) => a + (c[1] - c[0] + 1), 0) -
      new Set(data.filter((e) => e[3] === Y1).map((e) => e[2])).size -
      new Set(data.filter((e) => e[1] === Y1).map((e) => e[0])).size
  );

  for (let i = 0; i < SIZE; i++) {
    ranges = [];
    for (const [X, Y, , , d] of data) {
      const dx = d - Math.abs(Y - i);
      if (dx < 0) continue;
      const left = Math.max(0, X - dx);
      const right = Math.min(X + dx, SIZE);
      if (left > SIZE || right < 0) continue;
      ranges.push([left, right]);
    }
    ranges = merge(ranges);

    if (ranges.length > 1) {
      console.info((ranges[0][1] + 1) * 4_000_000 + i);
      break;
    }
  }
}

function manhattan(X, Y, x, y) {
  return Math.abs(X - x) + Math.abs(Y - y);
}

/**
 * Merge closed (includes boundries) intervals/ranges
 * @argument ranges
 *   [[0,21],[22,42]]
 * @argument integers work with a set of discreete values (integers)
 *   true: [[0,21],[22,42]]=>[[0,42]]
 *   false: [[0,21],[22, 42]]=>[[0,21],[22, 42]]
 */
function merge(ranges, integers) {
  ranges.sort((a, b) => a[0] - b[0]);
  let prev = ranges[0];
  const result = [prev];

  for (let i = 1; i < ranges.length; i++) {
    const next = ranges[i];
    // for open intervals use >= and integers must be false
    if (next[0] > prev[1] + (integers ? 1 : 0)) {
      result.push((prev = next));
      continue;
    }
    if (next[1] > prev[1]) prev[1] = next[1];
  }

  return result;
}
