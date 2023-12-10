const { input, consoleTime } = require("lib");
const { StackQue } = require("lib");

const START_PIPE = "J"; // derive from input

consoleTime(() => solve(input()));

function solve(input) {
  return process(...parse(input, START_PIPE));
}

function parse(input, S) {
  input = input.split("\n").map((e) => e.split(""));
  const r = input.findIndex((e) => e.includes("S"));
  const c = input[r].findIndex((e) => e === "S");
  input[r][c] = S;
  return [input, r, c];
}

function process(grid, r, c) {
  const { visited, dist } = bfsPipes(grid, r, c);
  // console.info(visited.map((e) => e.join("")).join("\n"));
  const dGrid = doubleGrid(visited);
  flood(dGrid, 0, 0);
  // console.info(dGrid.map((e) => e.join("")).join("\n"));
  let sum = 0;
  for (let i = 0; i < dGrid.length; i += 2)
    for (let j = 0; j < dGrid[0].length; j += 2) if (dGrid[i][j] === 0) sum++;
  return [dist, sum];
}

// Modified implementation of Breadth First Search on a Grid per lecture from William Fiset [https://youtu.be/09_LlHjoEiY]
function bfsPipes(grid, sr, sc) {
  const R = grid.length;
  const C = grid[0].length;
  const qr = new StackQue();
  const qc = new StackQue();
  const visited = new Array(R).fill().map(() => new Array(C).fill(0));

  qr.enqueue(sr);
  qc.enqueue(sc);
  visited[sr][sc] = grid[sr][sc];
  let dist = 0;
  let currentLayerCount = 1;
  let nextLayerCount = 0;

  function exploreNeighbors(r, c) {
    const p = grid[r][c];
    const dr = [];
    const dc = [];
    if (p === "|") dr.push(1, -1), dc.push(0, 0);
    if (p === "-") dr.push(0, 0), dc.push(1, -1);
    if (p === "L") dr.push(0, -1), dc.push(1, 0);
    if (p === "J") dr.push(0, -1), dc.push(-1, 0);
    if (p === "7") dr.push(0, 1), dc.push(-1, 0);
    if (p === "F") dr.push(0, 1), dc.push(1, 0);
    const neighbors = dr.length;
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue;
      if (visited[rr][cc] !== 0) continue;
      qr.enqueue(rr);
      qc.enqueue(cc);
      visited[rr][cc] = grid[rr][cc];
      nextLayerCount++;
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue();
    const c = qc.dequeue();
    exploreNeighbors(r, c);
    currentLayerCount--;
    if (currentLayerCount === 0)
      (currentLayerCount = nextLayerCount), (nextLayerCount = 0), dist++;
  }

  return { visited, dist: dist - 1 };
}

function doubleGrid(grid) {
  const dGrid = [];
  for (let i = 0; i < grid.length; i++) {
    dGrid.push([], []);
    for (let j = 0; j < grid[0].length; j++) {
      const p = grid[i][j];
      if (p === 0) dGrid[2 * i].push(0, 0), dGrid[2 * i + 1].push(0, 0);
      if (p === "|") dGrid[2 * i].push("|", 0), dGrid[2 * i + 1].push("|", 0);
      if (p === "-") dGrid[2 * i].push("-", "-"), dGrid[2 * i + 1].push(0, 0);
      if (p === "L") dGrid[2 * i].push("L", "-"), dGrid[2 * i + 1].push(0, 0);
      if (p === "J") dGrid[2 * i].push("J", 0), dGrid[2 * i + 1].push(0, 0);
      if (p === "7") dGrid[2 * i].push("7", 0), dGrid[2 * i + 1].push("|", 0);
      if (p === "F") dGrid[2 * i].push("F", "-"), dGrid[2 * i + 1].push("|", 0);
    }
  }

  dGrid.unshift(
    new Array(dGrid[0].length).fill(0),
    new Array(dGrid[0].length).fill(0)
  );
  dGrid.push(
    new Array(dGrid[0].length).fill(0),
    new Array(dGrid[0].length).fill(0)
  );
  dGrid.forEach((e) => e.push(0, 0));
  dGrid.forEach((e) => e.unshift(0, 0));

  return dGrid;
}

function flood(grid, sr, sc, fill = { from: 0, to: " " }) {
  const { from, to } = fill;
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];
  const neighbors = dr.length;

  const R = grid.length;
  const C = grid[0].length;
  const qr = new StackQue();
  const qc = new StackQue();

  qr.enqueue(sr);
  qc.enqueue(sc);
  grid[sr][sc] = to;
  let currentLayerCount = 1;
  let nextLayerCount = 0;

  function exploreNeighbors(r, c) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue;
      if (grid[rr][cc] !== from) continue;
      grid[rr][cc] = to;
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
    if (currentLayerCount === 0)
      (currentLayerCount = nextLayerCount), (nextLayerCount = 0);
  }

  return grid;
}
