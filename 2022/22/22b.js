const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let [grid, instructions] = input().split("\n\n");

  grid = grid.split("\n").map((l) => l.split(""));
  instructions = instructions.split(/([RL])/);

  let r = 0;
  let c = 0;
  let d = 0;
  const R = grid.length;
  const C = grid[0].length;

  const sides = grid.map((l, i) =>
    l.map((c, j) => {
      if (c === " ") return " ";
      if (i < R / 4 && j < (C * 2) / 3) return 0;
      if (i < R / 4) return 1;
      if (i < R / 2) return 2;
      if (i < (R * 3) / 4 && j < C / 3) return 3;
      if (i < (R * 3) / 4) return 4;
      return 5;
    })
  );

  const dest = [
    [
      {},
      {},
      { s: 3, d: 0, r: (r, c) => 149 - r, c: (r, c) => 0 },
      { s: 5, d: 0, r: (r, c) => 150 + c - 50, c: (r, c) => 0 },
    ],
    [
      { s: 4, d: 2, r: (r, c) => 149 - r, c: (r, c) => 99 },
      { s: 2, d: 1, r: (r, c) => 50 + c - 100, c: (r, c) => 99 },
      {},
      { s: 5, d: 3, r: (r, c) => 199, c: (r, c) => 0 + c - 100 },
    ],
    [
      { s: 1, d: 3, r: (r, c) => 49, c: (r, c) => 100 + r - 50 },
      ,
      { s: 3, d: 1, r: (r, c) => 100, c: (r, c) => 0 + r - 50 },
      {},
    ],
    [
      {},
      {},
      { s: 0, d: 0, r: (r, c) => 49 - (r - 100), c: (r, c) => 50 },
      { s: 2, d: 0, r: (r, c) => 50 + c, c: (r, c) => 50 },
    ],
    [
      { s: 1, d: 2, r: (r, c) => 49 - (r - 100), c: (r, c) => 149 },
      { s: 5, d: 2, r: (r, c) => 150 + c - 50, c: (r, c) => 49 },
      {},
      {},
    ],
    [
      { s: 4, d: 3, r: (r, c) => 149, c: (r, c) => 50 + r - 150 },
      { s: 1, d: 1, r: (r, c) => 0, c: (r, c) => 100 + c },
      { s: 0, d: 1, r: (r, c) => 0, c: (r, c) => 50 + r - 150 },
      {},
    ],
  ];

  while (grid[r][c] !== ".") c++;

  const neighbors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const arrows = [">", "v", "<", "^"];

  grid[r][c] = arrows[d];
  for (let i = 0; i < instructions.length; i++) {
    let inst = instructions[i];

    if (isNaN(+inst)) {
      if (inst === "R") d = (d + 1) % 4;
      if (inst === "L") d = (d - 1) % 4;
      if (d < 0) d += 4;
      grid[r][c] = arrows[d];
      continue;
    }

    for (let move = 0; move < +inst; move++) {
      const [dr, dc] = neighbors[d];
      let rr = r + dr;
      let cc = c + dc;
      let dd = d;
      let vv = grid[rr]?.[cc] || " ";

      if (vv === " ") {
        const side = sides[r][c];
        const to = dest[side][d];
        dd = to.d;
        rr = to.r(r, c);
        cc = to.c(r, c);
        vv = grid[rr]?.[cc] || " ";
      }

      if (vv === "#") break;

      d = dd;
      r = rr;
      c = cc;
      grid[r][c] = arrows[d];
    }
  }

  console.info(grid.map((l) => l.join("")).join("\n"));
  console.info(1000 * (r + 1) + 4 * (c + 1) + d);
}
