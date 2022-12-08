const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input()
    .split("\n")
    .map((e) => e.split("").map(Number));

  const grid = Array(data.length)
    .fill(null)
    .map((_, i) => Array(data[i].length).fill(0));

  for (let i = 0; i < data.length; i++) {
    let max = -Infinity;
    for (let j = 0; j < data[i].length; j++) {
      max = markVisible(i, j, max);
    }
  }

  for (let i = 0; i < data.length; i++) {
    let max = -Infinity;
    for (let j = data[i].length - 1; j >= 0; j--) {
      max = markVisible(i, j, max);
    }
  }

  for (let j = 0; j < data.length; j++) {
    let max = -Infinity;
    for (let i = 0; i < data[j].length; i++) {
      max = markVisible(i, j, max);
    }
  }

  for (let j = 0; j < data.length; j++) {
    let max = -Infinity;
    for (let i = data[j].length - 1; i >= 0; i--) {
      max = markVisible(i, j, max);
    }
  }

  console.info(grid.flat().reduce((acc, cur) => acc + cur, 0));

  function markVisible(i, j, max) {
    const e1 = data[i][j];
    if (e1 > max) {
      if (!grid[i][j]) {
        grid[i][j] = 1;
      }
      max = e1;
    }
    return max;
  }
}
