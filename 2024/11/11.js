const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input), 25), process(parse(input), 75)];
}

function parse(input) {
  let stones = {};
  for (const key of input.split(" ").map(Number)) add(stones, key, 1);
  return stones;
}

function process(stones, N) {
  for (let n = 0; n < N; n++) {
    const nStones = {};
    for (const key in stones) {
      const count = stones[key];
      if (key == 0) {
        add(nStones, 1, count);
      } else if (key.length % 2 === 0) {
        add(nStones, key.slice(0, key.length / 2), count);
        add(nStones, key.slice(key.length / 2, key.length), count);
      } else {
        add(nStones, key * 2024, count);
      }
    }
    stones = nStones;
  }

  let sum = 0;
  for (const key in stones)
    sum += stones[key];

  return sum;
}

function add(obj, key, count) {
  obj[key] = obj[key] ? obj[key] + count : count;
}
