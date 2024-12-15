const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [grid, moves ] = input.split("\n\n");
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

  const d = { "^": [-1, 0], "v": [1, 0], "<": [0, -1], ">": [0, 1] };

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const [dr, dc] = d[move];

    let j = 1;
    while (true) {
      if (grid[r + dr * j][c + dc * j] === "#") break;
      if (grid[r + dr * j][c + dc * j] === "O") {
        j++;
        continue;
      }
      for (let k = 2; k <= j; k++) {
        grid[r + dr * k ][c + dc * k  ] = "O";
      }
      grid[r][c] = ".";
      r = r + dr ;
      c = c + dc
      grid[r][c] = "@";
      break
    }

  }

  let sum = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "O") sum += 100 * r + c;
    }
  }

  const _grid = grid.map((row) => row.join("")).join("\n");
  console.info(_grid, "\n");

  return sum;
}