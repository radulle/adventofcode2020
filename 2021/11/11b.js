const { input, consoleTime } = require("lib");

const data = input()
  .split("\n")
  .map((row) => row.split("").map(Number));

function flash(
  matrix,
  i,
  j,
  neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ]
) {
  if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) return 0;
  matrix[i][j]++;
  if (matrix[i][j] !== 10) return 0;
  return (
    1 +
    neighbors.reduce((acc, [di, dj]) => acc + flash(matrix, i + di, j + dj), 0)
  );
}

consoleTime(() => solve(data));

function solve(data) {
  let step = 0,
    count = 0,
    all = true;
  main: while (true) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        count += flash(data, i, j);
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] > 9) {
          data[i][j] = 0;
          continue;
        }
        all = false;
      }
    }
    step++;
    if (all === true) return step;
    all = true;
  }
}
