const { input, consoleTime } = require("lib");

const data = input()
  .split("\n")
  .map((row) => row.split("").map(Number));

consoleTime(() => solve(data, 9));

function adjecent(
  matrix,
  i,
  j,
  depth,
  neighbors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]
) {
  return neighbors.reduce((acc, [di, dj]) => {
    const I = i + di;
    const J = j + dj;
    const v = matrix[I]?.[J];
    if (!isNaN(v) && v < depth) acc.push([I, J]);
    return acc;
  }, []);
}

function solve(data, depth) {
  const basins = [],
    explore = [];
  let k = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      let el = data[i][j];
      if (isNaN(el)) continue;
      if (el >= depth) {
        data[i][j] = ".";
        continue;
      }
      explore.push([i, j]);
      while (explore.length) {
        const [I, J] = explore.pop();
        el = data[I][J];
        if (isNaN(el)) continue;
        data[I][J] = String.fromCharCode(97 + (k % 26));
        basins[k] = (basins[k] || 0) + 1;
        explore.push(...adjecent(data, I, J, depth));
      }
      k++;
    }
  }

  console.info(data.map((row) => row.join("")).join("\n"), "\n");

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc * cur);
}
