const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input
    .split("\n")
    .map((l) => l.split(" "))
    .map(([a, b, c]) => [a, +b, c.replace(/[()]/g, "")]);
}

function process(data) {
  const dir = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
  class Grid {
    data = {};

    set(val, r, c) {
      if (!this.data[r]) this.data[r] = {};
      this.data[r][c] = val;
      this.lastPos = [r, c];
      return val;
    }

    get(r, c) {
      return this.data[r]?.[c];
    }

    get grid() {
      const top = Math.min(...Object.keys(this.data).map(Number));
      const bot = Math.max(...Object.keys(this.data).map(Number));
      const left = Math.min(
        ...Object.values(this.data).map(Object.keys).flat()
      );
      const right = Math.max(
        ...Object.values(this.data).map(Object.keys).flat()
      );
      const grid = Array(bot - top + 1)
        .fill()
        .map(() => Array(right - left + 1).fill());
      for (const [r, row] of Object.entries(this.data))
        for (const [c, v] of Object.entries(row)) grid[r - top][c - left] = v;
      return grid;
    }
  }

  const grid = new Grid();
  let r = 0,
    c = 0;
  for (let i = 0; i < data.length; i++) {
    const d = dir[data[i][0]];
    const dist = data[i][1];
    const color = data[i][2];
    for (let j = 0; j < dist; j++)
      (r += d[0]), (c += d[1]), grid.set(color, r, c);
  }

  const g = grid.grid.map((e) => e.map((c) => (c ? "#" : " ")));

  console.info(g.map((e) => e.join("")).join("\n"));

  let count = 0;
  for (let i = 0; i < g.length; i++) {
    let inside = false;
    for (let j = 0; j < g[i].length; j++) {
      let v = g[i][j];
      if (v === "#") count++;
      if (g[i]?.[j] === "#") {
        if (g[i - 1]?.[j] === "#" && g[i + 1]?.[j] === "#") v = "|";
        if (g[i - 1]?.[j] === "#" && g[i]?.[j + 1] === "#") v = "L";
        if (g[i - 1]?.[j] === "#" && g[i]?.[j - 1] === "#") v = "J";
      }
      if (v === "L" || v === "J" || v === "|") inside = !inside;
      if (inside && v === " ") count++, (g[i][j] = ".");
    }
  }

  console.info(g.map((e) => e.join("")).join("\n"));

  return count;
}
