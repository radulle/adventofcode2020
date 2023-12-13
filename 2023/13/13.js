const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input), 0), process(parse(input), 1)];
}

function parse(input) {
  const data = input
    .trim()
    .split("\n\n")
    .map((grid) => grid.split("\n").map((l) => l.split("")));
  return data;
}

function process(data, part) {
  let d, j, I, J;
  return data
    .map((grid) => [grid, transpose(grid)])
    .map((grids) => {
      return grids.map((grid) => {
        (d = 0), (I = 0), (J = 0);
        for (let i = 0.5; i < grid.length; i++) {
          (j = 0.5), (d = 0);
          while (true) {
            if (i - j < 0 || i + j >= grid.length) break;
            d += diff(grid[i - j], grid[i + j]);
            if (d > part) break;
            j++;
          }
          if (j > 0.5 && (i - j === -1 || i + j === grid.length) && d === part)
            (I = i + 0.5), (J = j);
        }
        return I;
      });
    })
    .reduce((acc, cur) => acc + cur[0] * 100 + cur[1], 0);
}

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function diff(a, b) {
  return a.filter((c, i) => c !== b[i]).length;
}
