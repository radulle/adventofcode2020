const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input, 1)), process(parse(input, 5))];
}

function parse(input, m) {
  return input
    .split("\n")
    .map((row) => row.split(" "))
    .map(([c, g]) => [
      Array(m).fill(c).join("?"),
      Array(m).fill(g.split(",").map(Number)).flat(),
    ]);
}

function process(data) {
  return data.map((e) => comb({}, ...e, 0, 0, 0)).reduce((a, c) => a + c, 0);
}

function comb(cache, c, g, ci, gi, ggi) {
  const key = ci + "," + gi + "," + ggi;
  if (key in cache) return cache[key];
  if (ci === c.length) {
    if (gi === g.length && ggi === 0) return 1;
    if (gi === g.length - 1 && g[gi] === ggi) return 1;
    return 0;
  }
  let ans = 0;
  if (c[ci] === "#" || c[ci] === "?")
    ans += comb(cache, c, g, ci + 1, gi, ggi + 1);
  if (c[ci] === "." || c[ci] === "?") {
    if (ggi === 0) ans += comb(cache, c, g, ci + 1, gi, 0);
    if (ggi > 0 && gi < g.length && g[gi] === ggi)
      ans += comb(cache, c, g, ci + 1, gi + 1, 0);
  }
  return (cache[key] = ans);
}
