const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let i = 0;
  const left = []
  const right = []
  for (const el of input.match(/\d+/g)) {
    if (i % 2 === 0)
      left.push(+el)
    else
      right.push(+el)
    i++
  }
  return { left, right };
}

function process({ left, right }) {
  left.sort();
  right.sort();

  let d = 0
  for (let i = 0; i < left.length; i++) {
    d += Math.abs(left[i] - right[i])
  }

  return d
}
