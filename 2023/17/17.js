const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input), 0, 1), process(parse(input), 1, 1)];
}

function parse(input) {
  return input.split("\n").map((l) => l.split("").map(Number));
}

function process(grid, part, draw) {
  class Grid {
    data = {};

    set(val, x, y = 0, z = 0, zz = 0) {
      if (!this.data[zz]) this.data[zz] = {};
      if (!this.data[zz][z]) this.data[zz][z] = {};
      if (!this.data[zz][z][y]) this.data[zz][z][y] = {};
      this.data[zz][z][y][x] = val;
      this.lastPos = [x, y, z, zz];
      return val;
    }

    get(x, y = 0, z = 0, zz = 0) {
      return this.data[zz]?.[z]?.[y]?.[x];
    }
  }

  const timeSlots = [[]];
  function enqueue(time, x, y, dir, dirDist, prev) {
    if (!timeSlots[time]) timeSlots[time] = [];
    timeSlots[time].push({ x, y, dir, dirDist, prev });
  }

  let curTime = 0;
  enqueue(curTime, 0, 0, -1, part ? 4 : 0, null);

  const visited = new Grid();
  const d = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  main: while (true) {
    while (timeSlots[curTime] && timeSlots[curTime].length) {
      const cur = timeSlots[curTime].pop();

      if (visited.get(cur.x, cur.y, cur.dir, cur.dirDist) !== undefined)
        continue;

      visited.set(cur.prev, cur.x, cur.y, cur.dir, cur.dirDist);

      for (let i = 0; i < 4; i++) {
        const [dx, dy] = d[i];
        if (cur.dir === (i + 2) % 4) continue;
        const turn = i !== cur.dir;
        if (!turn && cur.dirDist >= (part ? 10 : 3)) continue;
        if (part && turn && cur.dirDist < 4) continue;
        if (cur.x === grid[0].length - 1 && cur.y === grid.length - 1)
          break main;

        const x = cur.x + dx,
          y = cur.y + dy;
        if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) continue;
        const time = curTime + grid[y][x];
        enqueue(time, x, y, i, turn ? 1 : cur.dirDist + 1, [
          cur.x,
          cur.y,
          cur.dir,
          cur.dirDist,
        ]);
      }
    }
    curTime++;
  }

  const path = getPath(visited, ...visited.lastPos);
  if (draw) console.info("\n" + drawCanvas(getCanvas(path)));
  return curTime;
}

function getPath(visited, x, y, z, zz) {
  const path = [[x, y, z, zz]];
  while (true) {
    const node = visited.get(x, y, z, zz);
    if (node === null) break;
    path.push(node);
    [x, y, z, zz] = node;
  }
  return path.reverse();
}

function getCanvas(path) {
  const dMap = ["<", "^", ">", "v"];
  let maxX = -Infinity,
    maxY = -Infinity;
  for (const [x, y, _] of path) {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  const canvas = new Array(maxY + 1)
    .fill()
    .map(() => new Array(maxX + 1).fill("."));
  for (let i = 0; i < path.length; i++) {
    const [x, y] = path[i];
    if (x < 0 || y < 0) continue;
    const z = path[i + 1]?.[2] ?? "#";
    canvas[y][x] = dMap[z] || z;
  }
  return canvas;
}

function drawCanvas(canvas) {
  return canvas.map((r) => r.join("")).join("\n");
}
