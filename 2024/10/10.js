const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input), 0), process(parse(input), 1)];
}

function parse(input) {
  const grid = input.split("\n").map((r) => r.split("").map((e) => +e));
  return grid;
}

function process(grid, part) {
  const trailheads = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        trailheads.push([r, c]);
      }
    }
  }

  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  let sum = 0;

  while (trailheads.length) {
    let visited = [];
    visited.push(trailheads.shift().join(","));
    let h = 0;

    while (visited.length) {
      const nVisited = [];
      for (const rc of visited) {
        const [r, c] = rc.split(",").map((e) => +e);
        for (let i = 0; i < 4; i++) {
          const rr = r + dr[i];
          const cc = c + dc[i];
          if (rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length) {
            if (
              (part === 0 ? !nVisited.includes(`${rr},${cc}`) : true) &&
              grid[rr][cc] === grid[r][c] + 1
            ) {
              nVisited.push(`${rr},${cc}`);
            }
          }
        }
      }
      h++;
      if (h === 9) sum += nVisited.length;
      visited = nVisited;
    }
  }

  return sum;
}
