const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const list = [];
  const re = /.+X\+(\d+), Y\+(\d+)\n.+X\+(\d+), Y\+(\d+)\n.+X=(\d+), Y=(\d+)/g;
  let item;

  while ((item = re.exec(input))) list.push(item.slice(1).map(Number));

  return list;
}

function process(list) {
  let ans = 0;
  const priceA = 3;
  const priceB = 1;
  const CORRECTION = 0;
  const DELTA = 0.001;

  for (const [ax, ay, bx, by, X, Y] of list) {
    /* 
    pressA * ax + pressB * bx = X + CORRECTION
    pressA * ay + pressB * by = Y + CORRECTION
    minimum (pressA * 3 + pressB * 1)

    pressA * ax + (Y + CORRECTION - pressA * ay) * bx / by= X + CORRECTION
    pressA * (ax - ay * bx / by) = x + CORRECTION - (Y + CORRECTION) * bx / by
    pressA = (X + CORRECTION - (Y + CORRECTION) * bx / by) / (ax - ay * bx / by)
    */

    const pressA =
      (X + CORRECTION - ((Y + CORRECTION) * bx) / by) / (ax - (ay * bx) / by);
    const pressB = (X + CORRECTION - pressA * ax) / bx;
    const decimalA = pressA % 1;
    const decimalB = pressB % 1;
    if (
      (decimalA < DELTA || decimalA > 1 - DELTA) &&
      (decimalB < DELTA || decimalB > 1 - DELTA)
    )
      ans += pressA * priceA + pressB * priceB;
  }

  return ans;
}
