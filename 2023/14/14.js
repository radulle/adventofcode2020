const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return Array(2)
    .fill()
    .map(() =>
      input
        .trim()
        .split("\n")
        .map((l) => l.split(""))
    );
}

function process(grids) {
  return [sum(north(grids[0])), processB(grids[1])];
}

function processB(grid) {
  const cache = {};
  let i, last, max;
  (i = 0), (last = 0), (max = 1);
  while (true) {
    const h = hash(grid);
    if (cache[h] === max) {
      if (max > 1) break;
      (last = i), max++;
    }
    cycle(grid), (cache[h] = (cache[h] || 0) + 1), i++;
  }
  const rest = (1_000_000_000 - last) % (i - last);
  for (i = 0; i < rest; i++) cycle(grid);
  return sum(grid);
}

function cycle(grid) {
  north(grid), west(grid), south(grid), east(grid);
  return grid;
}

function north(grid) {
  for (let i = 0; i < grid[0].length; i++) {
    let N = 0;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] === "#") N = j + 1;
      if (grid[j][i] === "O") (grid[j][i] = "."), (grid[N][i] = "O"), N++;
    }
  }
  return grid;
}

function west(grid) {
  for (let i = 0; i < grid.length; i++) {
    let W = 0;
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "#") W = j + 1;
      if (grid[i][j] === "O") (grid[i][j] = "."), (grid[i][W] = "O"), W++;
    }
  }
  return grid;
}

function south(grid) {
  for (let i = 0; i < grid[0].length; i++) {
    let S = grid.length - 1;
    for (let j = grid.length - 1; j >= 0; j--) {
      if (grid[j][i] === "#") S = j - 1;
      if (grid[j][i] === "O") (grid[j][i] = "."), (grid[S][i] = "O"), S--;
    }
  }
  return grid;
}

function east(grid) {
  for (let i = 0; i < grid.length; i++) {
    let E = grid[i].length - 1;
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (grid[i][j] === "#") E = j - 1;
      if (grid[i][j] === "O") (grid[i][j] = "."), (grid[i][E] = "O"), E--;
    }
  }
  return grid;
}

function hash(grid) {
  return grid.map((l) => l.join("")).join("\n");
}

function sum(grid) {
  return grid
    .map((l) => l.filter((c) => c === "O").length)
    .reverse()
    .reduce((a, c, i) => a + c * (i + 1), 0);
}
