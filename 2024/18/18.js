const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [size, blocks] = input.split("\n\n");
  size = size.split(",").map(Number);

  blocks = blocks.split("\n").map((block) => block.split(",").map(Number));

  return [size[0], size[1], size[2], blocks];
}

function process([C, R, N, blocks]) {
  const sr = 0;
  const sc = 0;
  const er = R;
  const ec = C;
  const grid = new Array(R + 1)
    .fill(null)
    .map(() => new Array(C + 1).fill("."));

  for (let i = 0; i < N; i++) {
    const [c, r] = blocks[i];
    grid[r][c] = "#";
  }

  const neighbours = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let minSteps = Infinity;
  let _prev;

  let i = N;
  fall: while (true) {
    const seen = new Set();
    const q = [[[sr, sc]]];
    seen.add(`${sr},${sc}`);
    let steps = 0;
    const [cb, rb] = blocks[i];
    grid[rb][cb] = "#";
    main: while (q.length) {
      const layer = q[steps];
      if (!layer?.length) break fall;
      for (const prev of layer) {
        const [r, c] = prev;

        if (r === er && c === ec) {
          if (minSteps > steps) minSteps = steps;
          _prev = prev;
          break main;
        }

        let rr, cc, key;

        for (let i = 0; i < 4; i++) {
          rr = r + neighbours[i][0];
          cc = c + neighbours[i][1];
          key = `${rr},${cc}`;
          const nSteps = steps + 1;
          if (rr < 0 || cc < 0 || rr > R || cc > C) continue;
          if (grid[rr][cc] === "#") continue;
          if (seen.has(key)) continue;
          seen.add(`${rr},${cc}`);
          q[nSteps] = q[nSteps] || [];
          q[nSteps].push([rr, cc, prev]);
        }
      }
      steps++;
    }
    i++;
  }

  /** Draw path */
  let blocked = false;
  (function draw([r, c, prev]) {
    if (!prev) return;
    if (r == blocks[i][1] && c == blocks[i][0]) blocked = true;
    if (blocked) grid[r][c] = "X";
    else grid[r][c] = "O";
    draw(prev);
  })(_prev);
  grid[0][0] = "S";
  grid[R][C] = "E";
  grid[blocks[i][1]][blocks[i][0]] = "@";
  console.log(grid.map((row) => row.join(" ")).join("\n"));

  return [minSteps, blocks[i].join(",")];
}
