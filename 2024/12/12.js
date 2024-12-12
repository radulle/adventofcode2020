const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input), 0);
}

function parse(input) {
  const grid = input.split("\n").map((r) => r.split(""));
  return grid;
}

function process(grid) {
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  const areas = {};
  const perimiters = {};
  const sides = {};
  const visited = {};
  let id = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (hash(r, c) in visited) continue;

      const edges = {};
      const stack = [[r, c]];

      while (stack.length) {
        const [rr, cc] = stack.pop();
        if (hash(rr, cc) in visited) continue;
        visited[hash(rr, cc)] = true;
        if (rr < 0 || rr >= grid.length || cc < 0 || cc >= grid[0].length)
          continue;

        areas[id] = (areas[id] || 0) + 1;

        for (let i = 0; i < 4; i++) {
          if (grid[rr + dr[i]]?.[cc + dc[i]] === grid[r][c]) {
            stack.push([rr + dr[i], cc + dc[i]]);
          } else {
            perimiters[id] = (perimiters[id] || 0) + 1;
            const x = dr[i] ? rr : cc;
            const y = dr[i] ? cc : rr;
            edges[i] = edges[i] || [];
            edges[i][x] = edges[i][x] || [];
            edges[i][x].push(y);
          }
        }
      }

      for (let i = 0; i < 4; i++) {
        for (const edge of edges[i]) {
          if (!edge) continue;
          edge.sort((a, b) => a - b);
          for (let k = 0; k < edge.length; k++) {
            if (edge[k] + 1 !== edge[k + 1]) {
              sides[id] = (sides[id] || 0) + 1;
            }
          }
        }
      }

      id++;
    }
  }

  let sumA = 0;
  let sumB = 0;
  for (let i = 0; i < id; i++) {
    sumA += areas[i] * perimiters[i];
    sumB += areas[i] * sides[i];
  }
  
  return [sumA, sumB];
}

function hash(r, c) {
  return `${r},${c}`;
}
