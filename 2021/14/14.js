const { input, consoleTime } = require("lib");

const data = input();

let polymer = data.slice(0, data.indexOf("\n"));
const trans = {};
for (const [_, pair, add] of data.matchAll(/(\w+) -> (\w+)/g)) {
  trans[pair] = add;
}
const empty = Object.keys(trans).reduce((acc, key) => {
  acc[key] = 0;
  return acc;
}, {});

consoleTime(() => solve(polymer, trans, 10));
consoleTime(() => solve(polymer, trans, 40));

function solve(polymer, trans, n) {
  let poly = { ...empty };
  for (let i = 0; i < polymer.length - 1; i++) {
    poly[polymer.slice(i, i + 2)]++;
  }

  for (let j = 0; j < n; j++) {
    const newPoly = { ...empty };
    for (const [pair, count] of Object.entries(poly)) {
      newPoly[pair[0] + trans[pair]] += count;
      newPoly[trans[pair] + pair[1]] += count;
    }
    poly = newPoly;
  }

  const count = {};
  count[polymer[0]] = 1;
  count[polymer[polymer.length - 1]] = 1;
  for (const [pair, c] of Object.entries(poly)) {
    count[pair[0]] = (count[pair[0]] || 0) + c;
    count[pair[1]] = (count[pair[1]] || 0) + c;
  }

  return (
    (Math.max(...Object.values(count)) - Math.min(...Object.values(count))) / 2
  );
}
