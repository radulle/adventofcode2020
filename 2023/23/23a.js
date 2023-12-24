const { input, consoleTime, StackQue } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.split("\n").map((l) => l.split(""));
}

function process(data) {
  const sr = 0;
  const sc = 1;
  const er = data.length - 1;
  const ec = data[0].length - 1 - 1;

  const result = gridBFS(data, sr, sc, (r, c) => er === r && ec === c);

  return result[result.length - 1].dist;
}

/**
 * Very clean implementation of Breadth First Search on a Grid
 * per lecture from William Fiset [https://youtu.be/09_LlHjoEiY]
 * walls: #
 * empty: .
 * @param {string[][]} grid
 * @param {number} sr starting row
 * @param {number} sc starting column
 * @param {number | string} final break on final destination
 */
function gridBFS(grid, sr, sc, final) {
  const d = ["^", "v", ">", "<"];
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];
  const neighbors = dr.length;
  const result = [];

  const R = grid.length;
  const C = grid[0].length;
  const qr = new StackQue();
  const qc = new StackQue();
  const qv = new StackQue();

  qr.enqueue(sr);
  qc.enqueue(sc);
  qv.enqueue(hash(sr, sc));
  let dist = 0;
  let currentLayerCount = 1;
  let nextLayerCount = 0;

  function exploreNeighbors(r, c, v) {
    const f = grid[r][c];
    for (let i = 0; i < neighbors; i++) {
      if (d.includes(f) && d[i] !== f) continue;
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue;
      if (v.includes(hash(rr, cc))) continue;
      if (grid[rr][cc] === "#") continue;
      qr.enqueue(rr);
      qc.enqueue(cc);
      qv.enqueue(v + hash(rr, cc));
      nextLayerCount++;
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue();
    const c = qc.dequeue();
    const v = qv.dequeue();

    if (final(r, c)) result.push({ dist, v });

    exploreNeighbors(r, c, v);
    currentLayerCount--;
    if (currentLayerCount === 0) {
      currentLayerCount = nextLayerCount;
      nextLayerCount = 0;
      dist++;
    }
  }
  return result;
}

function hash(r, c) {
  return `|${r},${c}|`;
}
