const { input, consoleTime } = require("lib");
const { StackQue } = require("lib/stackQue");

consoleTime(() => solve());

function solve() {
  let sr, sc, fr, fc;
  const data = input()
    .split("\n")
    .map((line, i) => {
      return line.split("").map((cell, j) => {
        if (cell === "S") {
          sr = i;
          sc = j;
          return 0;
        }
        if (cell === "E") {
          fr = i;
          fc = j;
          return 25;
        }
        return cell.charCodeAt(0) - 97;
      });
    });

  const res = gridBFS(data, sr, sc, 27);

  const dist = res.find((e) => e.r === fr && e.c === fc).d;
  console.info(dist);
  console.info(dist - 1); // Only a next to b is in the first column, all others are too high to climb (lucky).
}

// TODO: cleanup lib's implementation
function gridBFS(grid, sr, sc, final) {
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

  function exploreNeighbors(r, c) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue;
      if (visited[rr][cc]) continue;
      if (grid[rr][cc] - grid[r][c] > 1) continue; // 2022-12 specific
      qr.enqueue(rr);
      qc.enqueue(cc);
      visited[rr][cc] = 1;
      nextLayerCount++;
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue();
    const c = qc.dequeue();
    const v = grid[r][c];

    result.push({ v, r, c, d });

    exploreNeighbors(r, c);
    currentLayerCount--;
    if (currentLayerCount === 0) {
      currentLayerCount = nextLayerCount;
      nextLayerCount = 0;
      d++;
    }
  }

  return result;
}
