const { input, consoleTime } = require("lib");

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

function process(grid, sr, sc) {
  const neighbors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let r, c, pr, pc, rr, cc, v;
  (r = sr), (c = sc);
  const pipe = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(" "));
  let len = 0;
  while (!len || !(r === sr && c === sc)) {
    for (const [dr, dc] of neighbors) {
      (rr = r + dr), (cc = c + dc), (v = grid[r][c]);
      if (rr === pr && cc === pc) continue;
      if ((dr && v === "-") || (dc && v === "|")) continue;
      if (dr === -1 && (v === "7" || v === "F")) continue;
      if (dr === 1 && (v === "L" || v === "J")) continue;
      if (dc === -1 && (v === "L" || v === "F")) continue;
      if (dc === 1 && (v === "7" || v === "J")) continue;
      len++, (pipe[r][c] = v), (pr = r), (pc = c), (r = rr), (c = cc);
      break;
    }
  }

  let count = 0;
  for (let i = 0; i < pipe.length; i++) {
    let inside = false;
    for (let j = 0; j < pipe[i].length; j++) {
      const v = pipe[i][j];
      if (v === "L" || v === "J" || v === "|") inside = !inside;
      if (inside && v === " ") count++, (pipe[i][j] = "#");
    }
  }

  console.info(
    pipe
      .map((e) => e.join(""))
      .join("\n")
      .replaceAll("L", "└")
      .replaceAll("J", "┘")
      .replaceAll("7", "┐")
      .replaceAll("F", "┌")
  );

  return [len / 2, count];
}
