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
    for (let j = 0; j < data[i].length; j++) {
      const e1 = data[i][j];
      let score = [1, 1, 1, 1]; // [down, up, right, left]

      for (let k = i + 1; k < data.length; k++) {
        const e2 = data[k][j];
        if (e2 >= e1) {
          score[0] = 0;
          break;
        }
      }

      for (let k = i - 1; k >= 0; k--) {
        const e2 = data[k][j];
        if (e2 >= e1) {
          score[1] = 0;
          break;
        }
      }

      for (let k = j + 1; k < data[j].length; k++) {
        const e2 = data[i][k];
        if (e2 >= e1) {
          score[2] = 0;
          break;
        }
      }

      for (let k = j - 1; k >= 0; k--) {
        const e2 = data[i][k];
        if (e2 >= e1) {
          score[3] = 0;
          break;
        }
      }

      grid[i][j] = score.some((e) => e === 1);
    }
  }

  console.info(grid.flat().reduce((acc, cur) => acc + cur, 0));
}
