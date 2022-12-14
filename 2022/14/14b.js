const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let grid, R, C;

  {
    const rocks = [];
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (const line of input().split("\n")) {
      const part = line.split(" -> ").map((e) => e.split(",").map(Number));
      for (let i = 0; i < part.length; i++) {
        const [x, y] = part[i];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (i === 0) {
          rocks.push([x, y]);
          continue;
        }
        const [X, Y] = rocks.at(-1);
        if (X === x) {
          for (let yi = Y; yi !== y; y > Y ? yi++ : yi--) {
            rocks.push([x, yi + (y > Y ? 1 : -1)]);
          }
          continue;
        }
        if (Y === y) {
          for (let xi = X; xi !== x; x > X ? xi++ : xi--) {
            rocks.push([xi + (x > X ? 1 : -1), y]);
          }
          continue;
        }
      }
    }

    grid = new Array(maxY + 2)
      .fill()
      .map(() => new Array(maxX + maxY).fill("."));
    for (const [x, y] of rocks) {
      grid[y][x] = "#";
    }
    grid[0][500] = "+";

    const bottom = new Array(maxX + maxY).fill("#");
    bottom[0] = ".";
    bottom[bottom.length - 1] = ".";
    grid.push(new Array(maxX + maxY).fill("#"));

    R = 0;
    C = 500;
  }

  main: while (grid[R][C] !== "o") {
    let r = R;
    let c = C;
    while (true) {
      if (grid[r + 1] === undefined) break main;
      if (grid[r + 1][c] === ".") {
        r++;
        continue;
      } else {
        if (grid[r + 1][c - 1] === ".") {
          r++;
          c--;
          continue;
        }
        if (grid[r + 1][c + 1] === ".") {
          r++;
          c++;
          continue;
        }
        grid[r][c] = "o";
        break;
      }
    }
  }

  let left, right;
  for (let i = 0; i < grid[0].length; i++) {
    const cell = grid[grid.length - 2][i];
    if (cell === "o") right = i;
    if (cell === "o" && left === undefined) left = i;
  }

  grid = grid.map((row) => row.slice(left - 1, right + 2));
  console.info(grid.map((e) => e.join("")).join("\n"));
  console.info(grid.flat().reduce((a, c) => a + (c === "o" ? 1 : 0), 0));
}
