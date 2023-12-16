const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.split("\n").map((l) => l.split(""));
}

function process(grid) {
  const dirs = { u: [-1, 0], d: [1, 0], l: [0, -1], r: [0, 1] };
  function dfs(v, r, c, d) {
    if (r < 0 || r >= v.length || c < 0 || c >= v[0].length) return;
    if (v[r][c] === d) return;
    v[r][c] = d;
    const e = grid[r][c];
    if (e === ".") return dfs(v, r + dirs[d][0], c + dirs[d][1], d);
    if ((d === "r" || d === "l") && e === "-")
      return dfs(v, r + dirs[d][0], c + dirs[d][1], d);
    if ((d === "u" || d === "d") && e === "|")
      return dfs(v, r + dirs[d][0], c + dirs[d][1], d);
    if ((d === "r" || d === "l") && e === "|")
      return dfs(v, r - 1, c, "u"), dfs(v, r + 1, c, "d");
    if ((d === "u" || d === "d") && e === "-")
      return dfs(v, r, c - 1, "l"), dfs(v, r, c + 1, "r");
    if (d === "r" && e === "\\") return dfs(v, r + 1, c, "d");
    if (d === "r" && e === "/") return dfs(v, r - 1, c, "u");
    if (d === "l" && e === "\\") return dfs(v, r - 1, c, "u");
    if (d === "l" && e === "/") return dfs(v, r + 1, c, "d");
    if (d === "u" && e === "\\") return dfs(v, r, c - 1, "l");
    if (d === "u" && e === "/") return dfs(v, r, c + 1, "r");
    if (d === "d" && e === "\\") return dfs(v, r, c + 1, "r");
    if (d === "d" && e === "/") return dfs(v, r, c - 1, "l");
  }

  function e(r, c, d) {
    let v = V(grid);
    dfs(v, r, c, d), (max = Math.max(max, sum(v)));
  }

  let max = 0;

  for (let i = 0; i < grid.length; i++)
    e(i, 0, "r"), e(i, grid[0].length - 1, "l");
  for (let i = 0; i < grid[0].length; i++)
    e(0, i, "d"), e(grid.length - 1, 0, "u");

  return max;
}

function sum(v) {
  return v.reduce((acc, row) => acc + row.filter((v) => v !== " ").length, 0);
}

function V(d) {
  return Array(d.length)
    .fill()
    .map(() => Array(d[0].length).fill(" "));
}
