const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const grid = input.split("\n").map((r) => r.split(""));
  return grid;
}

function process(grid) {
  let count = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "A") {
        if (
          ((grid[r - 1]?.[c - 1] === "M" && grid[r + 1]?.[c + 1] === "S") ||
            (grid[r - 1]?.[c - 1] === "S" && grid[r + 1]?.[c + 1] === "M")) &&
          ((grid[r + 1]?.[c - 1] === "M" && grid[r - 1]?.[c + 1] === "S") ||
            (grid[r + 1]?.[c - 1] === "S" && grid[r - 1]?.[c + 1] === "M"))
        ) {
          count++;
        }
      }
    }
  }

  return count;
}
