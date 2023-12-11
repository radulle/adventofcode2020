const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(...parse(input), 2), process(...parse(input), 1000000)];
}

function parse(input) {
  const galaxies = [];
  const rows = [];
  const cols = [];

  input = input.split("\n").map((e) => e.split(""));

  for (let i = 0; i < input.length; i++) {
    if (!input[i].includes("#")) rows.push(i);
    for (let j = 0; j < input[i].length; j++)
      if (input[i][j] === "#") galaxies.push([i, j]);
  }

  for (let j = 0; j < input[0].length; j++)
    if (!input.map((e) => e[j]).includes("#")) cols.push(j);

  return [galaxies, rows, cols];
}

function process(galaxies, rows, cols, expand) {
  expand -= 1;
  const dist = [];
  for (let i = 0; i < galaxies.length; i++) {
    dist[i] = [];
    for (let j = i + 1; j < galaxies.length; j++) {
      dist[i][j] =
        Math.abs(galaxies[i][0] - galaxies[j][0]) +
        Math.abs(galaxies[i][1] - galaxies[j][1]) +
        expand *
          cols.filter(
            (e) =>
              e > Math.min(galaxies[i][1], galaxies[j][1]) &&
              e < Math.max(galaxies[i][1], galaxies[j][1])
          ).length +
        expand *
          rows.filter((e) => e > galaxies[i][0] && e < galaxies[j][0]).length;
    }
  }

  let sum = 0;
  for (let i = 0; i < galaxies.length; i++)
    for (let j = i + 1; j < galaxies.length; j++) sum += dist[i][j];
  return sum;
}
