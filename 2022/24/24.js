const { input, consoleTime } = require("lib");
const { StackQue } = require("lib/stackQue");

consoleTime(() => solve());

function solve() {
  let sr, sc, fr, fc;
  const winds = [];
  const dirs = { "^": [-1, 0], v: [1, 0], ">": [0, 1], "<": [0, -1] };

  const data = input()
    .split("\n")
    .map((line, i) => {
      return line.split("").map((cell, j) => {
        if (cell === "S") {
          sr = i;
          sc = j;
          return ".";
        }
        if (cell === "E") {
          fr = i;
          fc = j;
          return ".";
        }
        if (cell === "." || cell === "#") return cell;
        winds.push([i, j, dirs[cell]]);
        return cell;
      });
    });

  const res = [
    gridBFS(data, sr, sc, fr, fc, winds),
    gridBFS(data, fr, fc, sr, sc, winds),
    gridBFS(data, sr, sc, fr, fc, winds),
  ];

  console.info(
    res[0],
    res.reduce((a, c) => a + c)
  );
}

function gridBFS(grid, sr, sc, fr, fc, winds) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];
  const neighbors = dr.length;
  const result = [];

  const R = grid.length;
  const C = grid[0].length;
  const qr = new StackQue();
  const qc = new StackQue();
  const visited = new Array(R).fill().map(() => new Array(C).fill(0));

  qr.enqueue(sr);
  qc.enqueue(sc);
  visited[sr][sc] = 1;
  let d = 0;
  let currentLayerCount = 1;
  let nextLayerCount = 0;

  function exploreNeighbors(r, c, dd) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue;
      const v = grid[r][c];
      const vv = grid[rr][cc];
      if (v === "." && visited[r][c] !== dd + 1) {
        qr.enqueue(r);
        qc.enqueue(c);
        visited[r][c] = dd + 1;
        nextLayerCount++;
      }

      if (vv === "." && visited[rr][cc] !== dd + 1) {
        qr.enqueue(rr);
        qc.enqueue(cc);
        visited[rr][cc] = dd + 1;
        result.push({ r, c, v, rr, cc, vv, dd });
        nextLayerCount++;
      }
      if (rr === fr && cc === fc) return true;
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue();
    const c = qc.dequeue();

    if (exploreNeighbors(r, c, d + 1)) break;
    currentLayerCount--;
    if (currentLayerCount === 0) {
      for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
          grid[i][j] = ".";
        }
      }
      for (const wind of winds) {
        wind[0] += wind[2][0];
        if (wind[0] === 0) wind[0] = R - 2;
        if (wind[0] === R - 1) wind[0] = 1;
        wind[1] += wind[2][1];
        if (wind[1] === 0) wind[1] = C - 2;
        if (wind[1] === C - 1) wind[1] = 1;
        grid[wind[0]][wind[1]] = "o";
      }
      currentLayerCount = nextLayerCount;
      nextLayerCount = 0;
      d++;
    }
  }

  return result.find((e) => e.rr === fr && e.cc === fc).dd - 1;
}
