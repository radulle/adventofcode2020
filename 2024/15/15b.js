const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [grid, moves] = input.split("\n\n");
  grid = grid.replaceAll("O", "[]");
  grid = grid.replaceAll(".", "..");
  grid = grid.replaceAll("#", "##");
  grid = grid.replaceAll("@", "@.");
  grid = grid.split("\n").map((row) => row.split(""));
  moves = moves.split("\n").join("").split("");
  return [grid, moves];
}

function process([grid, moves]) {
  let r, c;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "@") {
        r = i;
        c = j;
        break;
      }
    }
  }
  // throw new Error("Not implemented");

  const d = { "^": [-1, 0], v: [1, 0], "<": [0, -1], ">": [0, 1] };

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const [dr, dc] = d[move];

    if (move === ">" || move === "<") {
      let j = 1;
      while (true) {
        const next = grid[r + dr * j][c + dc * j];
        if (next === "#") break;
        if (next === "]" || next === "[") {
          j += 2;
          continue;
        }
        for (let k = j; k > 1; k--) {
          grid[r + dr * k][c + dc * k] =
            grid[r + dr * (k - 1)][c + dc * (k - 1)];
        }
        grid[r][c] = ".";
        r = r + dr;
        c = c + dc;
        grid[r][c] = "@";
        break;
      }
    }

    if (move === "^" || move === "v") {
      const shift = [];
      function push(r, c) {
        shift.push([r, c, grid[r][c]]);
        const rr = r + dr;
        const cc = c + dc;
        const v = grid[rr][cc];
        if (grid[rr][cc] === "#") return false;
        if (v === ".") return true;
        const dir = push(rr, cc);
        const side = push(
          rr,
          cc + (v === "[" ? 1 : 0) + (v === "]" ? - 1 : 0)
        );
        return dir && side;
      }
      const free = push(r, c);
      if (!free) continue;
      shift.sort((a, b) => move === "^" ? a[0] - b[0] : b[0] - a[0]);
      for (const [sr, sc, v] of shift) {
        grid[sr + dr][sc + dc] = v;
        grid[sr][sc] = ".";
      }
      r = r + dr;
      c = c + dc;
    }

  }

  let sum = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "[") sum += 100 * r + c;
    }
  }

  const _grid = grid.map((row) => row.join("")).join("\n");
  console.info(_grid, "\n");

  return sum;


}
