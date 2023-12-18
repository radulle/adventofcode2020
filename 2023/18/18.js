const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input)), process(parse(input, 1))];
}

function parse(input, part) {
  const map = ["R", "D", "L", "U"];
  input = input.split("\n").map((l) => l.split(" "));
  if (part)
    return input.map(([, , c]) => [
      map[c[c.length - 2]],
      parseInt(c.slice(2, -2), 16),
    ]);
  return input.map(([a, b]) => [a, +b]);
}

function process(data) {
  const dirs = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
  let rp, cp, r, c, a, p;
  (r = 0), (c = 0), (a = 0), (p = 0);
  for (let i = 0; i < data.length; i++) {
    const dir = dirs[data[i][0]];
    const dist = data[i][1];
    (rp = r), (cp = c);
    (r += dir[0] * dist), (c += dir[1] * dist);
    (a += cp * r - c * rp), (p += dist);
  }
  return Math.abs(a / 2) + p / 2 + 1;
}
