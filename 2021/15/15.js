const { input, consoleTime, StackQue } = require("lib");

const data = input.split("\n").map((row) => row.split("").map(Number));

function goBig(data, multiply) {
  const mR = data.length;
  const mC = data[0].length;
  const big = new Array(mR * multiply)
    .fill()
    .map(() => new Array(mC * multiply).fill());

  for (let i = 0; i < big.length; i++) {
    for (let j = 0; j < big[0].length; j++) {
      const quadrant =
        Math.floor((i / mR) % multiply) + Math.floor((j / mC) % multiply);
      const value = data[i % mR][j % mC] + quadrant;
      big[i][j] = value > 9 ? value % 9 : value;
    }
  }
  return big;
}

/**
 * Very clean implementation of Breadth First Search on a Grid
 * per lecture from William Fiset [https://youtu.be/09_LlHjoEiY]
 * modified to have veights and fixed finish
 * @param {string[][]} grid
 * @param {number} sr starting row
 * @param {number} sc starting column
 * @param {number} er ending row
 * @param {number} ec ending column
 */
function gridBFS(grid, sr, sc, er, ec) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];
  const neighbors = dr.length;

  const R = grid.length;
  const C = grid[0].length;
  const qr = new StackQue();
  const qc = new StackQue();
  const visited = new Array(R).fill().map(() => new Array(C).fill());

  qr.enqueue(sr);
  qc.enqueue(sc);
  visited[sr][sc] = 0;
  let dist = 0;
  let currentLayerCount = 1;
  let nextLayerCount = 0;

  function exploreNeighbors(r, c) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue;
      const v = visited[r][c] + grid[rr][cc];
      if (visited[rr][cc] <= v) continue;
      visited[rr][cc] = v;
      qr.enqueue(rr);
      qc.enqueue(cc);
      nextLayerCount++;
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue();
    const c = qc.dequeue();

    exploreNeighbors(r, c);
    currentLayerCount--;
    if (currentLayerCount === 0) {
      currentLayerCount = nextLayerCount;
      nextLayerCount = 0;
      dist++;
    }
  }
  return visited[er][ec];
}

consoleTime(() => gridBFS(data, 0, 0, data.length - 1, data[0].length - 1));
const big = goBig(data, 5);
consoleTime(() => gridBFS(big, 0, 0, big.length - 1, big[0].length - 1));
