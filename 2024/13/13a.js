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
  let count = 0;
  const MAX_PRESS = 100;
  const priceA = 3;
  const priceB = 1;

  for (const [ax, ay, bx, by, X, Y] of list) {
    let priceMin = Infinity;

    for (let pressA = 0; pressA < MAX_PRESS; pressA++) {
      for (let pressB = 0; pressB < MAX_PRESS; pressB++) {
        const price = pressA * priceA + pressB * priceB;
        if (price >= priceMin) break;
        if (
          pressA * ax + pressB * bx === X &&
          pressA * ay + pressB * by === Y
        ) {
          priceMin = price;
          break;
        }
      }
    }
    if (priceMin !== Infinity) {
      ans += priceMin;
      count++;
    }
  }

  return ans;
}
