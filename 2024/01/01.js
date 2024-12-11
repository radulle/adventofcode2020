const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [processA(parse(input)), processB(parse(input))];
}

function parse(input) {
  let i = 0;
  const left = [];
  const right = [];
  for (const el of input.match(/\d+/g)) {
    if (i % 2 === 0) left.push(+el);
    else right.push(+el);
    i++;
  }
  left.sort();
  right.sort();
  return { left, right };
}

function processA({ left, right }) {
  let d = 0;

  for (let i = 0; i < left.length; i++) d += Math.abs(left[i] - right[i]);

  return d;
}

function processB({ left, right }) {
  let sum = 0;

  for (const l of left) {
    const apearsInRightCount = right.filter((r) => r === l).length;
    sum += apearsInRightCount * l;
  }

  return sum;
}
