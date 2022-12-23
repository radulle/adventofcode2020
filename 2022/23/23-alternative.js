const { input, consoleTime } = require("lib");

const dirs = [
  [
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ],
  [
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  [
    [-1, -1],
    [0, -1],
    [1, -1],
  ],
  [
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
];

const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

consoleTime(() => solve());

function solve() {
  let grid = input()
    .split("\n")
    .map((l) => l.split("").map((c) => Number(c === "#")));

  let round = 0;
  while (true) {
    let moves = 0;
    const pos = [];

    for (let r in grid) {
      r = +r;
      for (let c in grid[r]) {
        c = +c;

        if (grid[r][c] !== 1) continue;

        const [rr, cc, d] = probe(grid, round, r, c);

        if (!d) {
          pos.push([r, c]);
          continue;
        }

        if (grid[rr + d[0]]?.[cc + d[1]] !== 1) {
          pos.push([rr, cc]);
          moves++;
          continue;
        }

        const [rr1, cc1] = probe(grid, round, rr + d[0], cc + d[1]);

        if (!(rr === rr1 && cc === cc1)) {
          pos.push([rr, cc]);
          moves++;
          continue;
        }

        pos.push([r, c]);
      }
    }

    grid = [];

    for (const [r, c] of pos) {
      grid[r] = grid[r] ?? [];
      grid[r][c] = 1;
    }

    if (!moves) {
      round++;
      console.info(round);
      break;
    }

    round++;

    if (round === 10) {
      let minR = Infinity,
        maxR = -Infinity,
        minC = Infinity,
        maxC = -Infinity;
      let count = 0;
      for (let r in grid) {
        r = +r;
        for (let c in grid[r]) {
          c = +c;
          v = grid[r][c];
          if (v !== 1) continue;
          count++;
          if (r < minR) minR = r;
          if (r > maxR) maxR = r;
          if (c < minC) minC = c;
          if (c > maxC) maxC = c;
        }
      }
      const width = maxC - minC + 1;
      const height = maxR - minR + 1;
      console.info(width * height - count);
    }
  }

  console.info("end");
}

function probe(grid, round, r, c) {
  if (neighbors.every(([dr, dc]) => grid[r + dr]?.[c + dc] !== 1))
    return [r, c];
  for (let k = 0; k < 4; k++) {
    const d = dirs[((round % 4) + k) % 4];
    if (d.every(([dr, dc]) => grid[r + dr]?.[c + dc] !== 1))
      return [r + d[1][0], c + d[1][1], d[1]];
  }
  return [r, c];
}
