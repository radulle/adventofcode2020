const { input, consoleTime } = require("lib");

consoleTime(() => solve());

// TODO: cleanup
function solve() {
  const data = input()
    .split("\n")
    .map((e) => e.split("").map(Number));

  const visible = new Set();
  const grid = Array(data.length)
    .fill(null)
    .map((_, i) => Array(data[i].length).fill(0));

  for (let i = 0; i < data.length; i++) {
    let max = -Infinity;
    for (let j = 0; j < data[i].length; j++) {
      const element = data[i][j];
      if (element > max) {
        if (!visible.has(`${i}-${j}`)) {
          visible.add(`${i}-${j}`);
          grid[i][j] = 1;
        }
        max = element;
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    let max = -Infinity;
    for (let j = data[i].length - 1; j >= 0; j--) {
      const element = data[i][j];
      if (element > max) {
        if (!visible.has(`${i}-${j}`)) {
          visible.add(`${i}-${j}`);
          grid[i][j] = 1;
        }
        max = element;
      }
    }
  }

  for (let j = 0; j < data.length; j++) {
    let max = -Infinity;
    for (let i = 0; i < data[j].length; i++) {
      const element = data[i][j];
      if (element > max) {
        if (!visible.has(`${i}-${j}`)) {
          visible.add(`${i}-${j}`);
          grid[i][j] = 1;
        }
        max = element;
      }
    }
  }

  for (let j = 0; j < data.length; j++) {
    let max = -Infinity;
    for (let i = data[j].length - 1; i >= 0; i--) {
      const element = data[i][j];
      if (element > max) {
        if (!visible.has(`${i}-${j}`)) {
          visible.add(`${i}-${j}`);
          grid[i][j] = 1;
        }
        max = element;
      }
    }
  }

  console.info(visible.size);
  console.info("end");
}
