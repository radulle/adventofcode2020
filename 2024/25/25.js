const { input, consoleTime, Graph } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const keys = [];
  const locks = [];
  for (let grid of input
    .split("\n\n")
    .map((a) => a.split("\n").map((b) => b.split("")))) {
    const isLock = grid[0][0] === "#";
    grid = transpose(grid);
    grid = grid.map((e) => e.filter((e) => e === "#").length - 1);
    if (isLock) locks.push(grid);
    else keys.push(grid);
  }
  return [keys, locks];
}

function process([keys, locks]) {
  let pairs = 0;
  for (let key of keys) {
    for (let lock of locks) {
      if (key.every((k, i) => lock[i] + k < 6)) 
        pairs++;
    }
  }
  return pairs;
}

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}
