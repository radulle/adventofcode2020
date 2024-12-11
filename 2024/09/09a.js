const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input))];
}

function parse(input) {
  const a = []
  let full = [];
  let empty = [];
  for (let i = 0; i < input.length; i++) {
    const l = input[i];
    for (let j = 0; j < l; j++) {
      if (i % 2 === 0) {
        a.push(i / 2)
        full.push(a.length - 1)
      } else {
        a.push(null)
        empty.push(a.length - 1)
      }
    }
  }
  empty.reverse()
  return [a, empty, full]
}

function process([a, empty, full]) {
  while (true) {
    const f = full.pop();
    const e = empty.pop();
    console.info(f, e)
    if (e > f) break
    a[e] = a[f];
    a[f] = null;
  }
  console.info(a)
  console.info(a.reduce((acc, v, i) => acc + (v === null ? 0 : v * i), 0))
}

