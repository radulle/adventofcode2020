const { input, consoleTime } = require("lib");

const data = input.split("\n").map((row) => row.split("").map(Number));

consoleTime(() => solve(data));

function adjecent(
  matrix,
  i,
  j,
  neighbors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]
) {
  return neighbors.map(([di, dj]) => matrix[i + di]?.[j + dj] ?? Infinity);
}

function solve(data) {
  const basins = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const el = data[i][j];
      if (adjecent(data, i, j).every((e) => e > el)) basins.push(el);
    }
  }

  return basins.reduce((acc, cur) => acc + cur + 1, 0);
}
