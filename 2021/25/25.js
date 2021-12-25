const { input, consoleTime } = require("lib");

consoleTime(() => {
  let grid = input()
    .split("\n")
    .map((row) => row.split(""));
  const height = grid.length;
  const width = grid[0].length;

  let steps = 0;
  while (true) {
    steps++;
    let moves = 0;

    const nGrid = Array(height)
      .fill()
      .map(() => Array(width).fill("."));

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i][j] === ">") {
          let t = j + 1;
          if (t === width) t = 0;
          if (grid[i][t] === ".") {
            grid[i][t] = ".";
            nGrid[i][t] = ">";
            moves++;
          } else {
            nGrid[i][j] = ">";
          }
        }
      }
    }

    for (let j = 0; j < width; j++) {
      for (let i = 0; i < height; i++) {
        if (grid[i][j] === "v") {
          let t = i + 1;
          if (t === height) t = 0;
          if (grid[t][j] !== "v" && nGrid[t][j] === ".") {
            nGrid[t][j] = "v";
            moves++;
          } else {
            nGrid[i][j] = "v";
          }
        }
      }
    }

    if (moves === 0) return steps;

    grid = nGrid;
  }
});
