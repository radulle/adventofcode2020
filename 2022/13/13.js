const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input()
    .split("\n\n")
    .map((line) => line.split("\n").map(JSON.parse));

  let result = 0;
  for (let i = 0; i < data.length; i++) {
    if (compare(...data[i]) === 1) result += i + 1;
  }
  console.info(result);

  const x = [[2]];
  const y = [[6]];
  const packets = [x, y, ...data.flat()];
  packets.sort(compare).reverse();
  const ix = packets.indexOf(x) + 1;
  const iy = packets.indexOf(y) + 1;
  console.info(ix * iy);
}

function compare(a, b) {
  if (typeof a === typeof b) {
    if (Array.isArray(a)) {
      const al = a.length,
        bl = b.length;
      for (let i = 0; i < al && i < bl; i++) {
        const c = compare(a[i], b[i]);
        if (c !== 0) return c;
      }
      return al < bl ? 1 : al > bl ? -1 : 0;
    }
    return a < b ? 1 : a > b ? -1 : 0;
  }
  return Array.isArray(a) ? compare(a, [b]) : compare([a], b);
}
