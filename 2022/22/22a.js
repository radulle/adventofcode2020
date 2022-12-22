const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let [grid, instructions] = input().split("\n\n");

  grid = grid.split("\n").map((l) => l.split(""));
  instructions = instructions.split(/([RL])/);

  let r = 0;
  let c = 0;
  let d = 0;

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
      let vv = grid[rr]?.[cc] || " ";

      if (vv === " ") {
        do {
          rr -= dr;
          cc -= dc;
          vv = grid[rr]?.[cc] || " ";
        } while (vv !== " ");
        rr += dr;
        cc += dc;
        vv = grid[rr]?.[cc];
      }

      if (vv === "#") break;

      r = rr;
      c = cc;
      grid[r][c] = arrows[d];
    }
  }

  console.info(grid.map((l) => l.join("")).join("\n"));
  console.info(1000 * (r + 1) + 4 * (c + 1) + d);
}
