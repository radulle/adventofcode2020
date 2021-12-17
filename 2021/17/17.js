const { input, consoleTime } = require("lib");

const data = input
  .match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/)
  .slice(1, 5)
  .map(Number);

const THRESHOLD = 1000;
let MAX;

function solveA(data) {
  let v = 9,
    MAX = 0,
    last = 0;
  while (true) {
    let max = 0,
      y = 0,
      V = v;

    one: while (true) {
      if (y > max) max = y;
      y += V;
      V--;
      if (y < data[2]) break one;
      if (y < data[3]) {
        MAX = { v, h: max };
        break one;
      }
    }
    v++;
    if (v - last > THRESHOLD) break;
  }

  return MAX;
}

consoleTime(() => {
  MAX = solveA(data);
  return MAX.h;
});

function solveB(data) {
  let success = 0;
  for (let i = 1; i <= data[1]; i++) {
    for (let j = data[2]; j <= MAX.v; j++) {
      let x = 0,
        y = 0,
        Vx = i,
        Vy = j;
      t: while (true) {
        x += Vx;
        y += Vy;
        Vx = Math.max(Vx - 1, 0);
        Vy--;
        if (x > data[1] || y < data[2]) break t;
        if (x >= data[0] && y <= data[3]) {
          success++;
          break t;
        }
      }
    }
  }

  return success;
}

consoleTime(() => solveB(data));
