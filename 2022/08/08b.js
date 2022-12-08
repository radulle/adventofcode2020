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
      let score = [0, 0, 0, 0]; // [down, up, right, left]

      for (let k = i + 1; k < data.length; k++) {
        const e2 = data[k][j];
        score[0]++;
        if (e2 >= e1) break;
      }

      for (let k = i - 1; k >= 0; k--) {
        const e2 = data[k][j];
        score[1]++;
        if (e2 >= e1) break;
      }

      for (let k = j + 1; k < data[j].length; k++) {
        const e2 = data[i][k];
        score[2]++;
        if (e2 >= e1) break;
      }

      for (let k = j - 1; k >= 0; k--) {
        const e2 = data[i][k];
        score[3]++;
        if (e2 >= e1) break;
      }

      grid[i][j] = score.reduce((acc, cur) => acc * cur, 1);
    }
  }

  console.info(Math.max(...grid.flatMap((e) => e)));
}
