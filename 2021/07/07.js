const { input, consoleTime } = require("lib");

const data = input()
  .split(",")
  .map(Number)
  .sort((a, b) => a - b);

const getMemo = (memo = {}) =>
  function c(dist) {
    if (memo[dist] !== undefined) return memo[dist];
    if (dist === 0) return 0;
    if (dist === 1) return 1;
    memo[dist] = dist + c(dist - 1);
    return memo[dist];
  };

const memo = getMemo();
consoleTime(() => solve(data, (dist) => dist));
consoleTime(() => solve(data, (dist) => memo(dist)));

function solve(data, calc) {
  let top = data[data.length - 1];
  let bot = data[0];
  const fuel = (avg) =>
    data.reduce((acc, cur) => acc + calc(Math.abs(cur - avg)), 0);

  while (true) {
    const diff = fuel(top) - fuel(bot);
    if (diff < 0) {
      bot = Math.ceil((top + bot) / 2);
    } else if (diff > 0) {
      top = Math.floor((top + bot) / 2);
    } else {
      break;
    }
  }

  return fuel(top);
}
