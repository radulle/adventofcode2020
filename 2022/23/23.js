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
  do {
    let moves = 0;
    expand(grid);

    const nGrid = new Array(grid.length)
      .fill(null)
      .map(() => new Array(grid[0].length).fill(0));

    for (let r = 1; r < grid.length - 1; r++) {
      for (let c = 1; c < grid[0].length - 1; c++) {
        if (grid[r][c] !== 1) continue;

        const [rr, cc, d] = probe(grid, round, r, c);

        if (!d) {
          nGrid[r][c] = 1;
          continue;
        }

        if (grid[rr + d[0]]?.[cc + d[1]] !== 1) {
          nGrid[rr][cc] = 1;
          moves++;
          continue;
        }

        const [rr1, cc1] = probe(grid, round, rr + d[0], cc + d[1]);

        if (!(rr === rr1 && cc === cc1)) {
          nGrid[rr][cc] = 1;
          moves++;
          continue;
        }

        nGrid[r][c] = 1;
      }
    }

    grid = nGrid;

    if (!moves) {
      round++;
      console.info(round);
      break;
    }

    if (round === 9) {
      expand(grid);
      console.info(
        (grid.length - 2) * (grid[0].length - 2) -
          grid.flat().filter(Boolean).length
      );
    }

    round++;
  } while (true);
}

function probe(grid, round, r, c) {
  if (neighbors.every(([dr, dc]) => grid[r + dr][c + dc] !== 1)) return [r, c];
  for (let k = 0; k < 4; k++) {
    const d = dirs[((round % 4) + k) % 4];
    if (d.every(([dr, dc]) => grid[r + dr][c + dc] !== 1))
      return [r + d[1][0], c + d[1][1], d[1]];
  }
  return [r, c];
}

function expand(grid) {
  let empty;
  do {
    empty = !grid[0].some((c) => c === 1);
    if (empty) grid.shift();
    else grid.unshift(Array(grid[0].length).fill(0));
  } while (empty);

  do {
    empty = !grid[grid.length - 1].some((c) => c === 1);
    if (empty) grid.pop();
    else grid.push(Array(grid[0].length).fill(0));
  } while (empty);

  do {
    empty = !grid.some((r) => r[0] === 1);
    if (empty) grid.forEach((r) => r.shift());
    else grid.forEach((r) => r.unshift(0));
  } while (empty);

  do {
    empty = !grid.some((r) => r[r.length - 1] === 1);
    if (empty) grid.forEach((r) => r.pop());
    else grid.forEach((r) => r.push(0));
  } while (empty);
}
