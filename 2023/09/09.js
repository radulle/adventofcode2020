const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input
    .split("\n")
    .map((e) => e.split(" ").map((e) => parseInt(e)))
    .map((e) => [e]);
}

function process(data) {
  for (let i = 0; i < data.length; i++) {
    let j = 1;
    while (true) {
      let max = 0;
      data[i][j] = [];
      for (let k = 1; k < data[i][j - 1].length; k++) {
        data[i][j][k - 1] = data[i][j - 1][k] - data[i][j - 1][k - 1];
        max ||= data[i][j][k - 1];
      }
      if (max === 0) break;
      j++;
    }
  }

  const res = [];
  res[0] = data.map((e) =>
    e.reduce((acc, cur) => acc + cur[cur.length - 1], 0)
  );
  res[1] = data.map((e) => e.reverse().reduce((acc, cur) => cur[0] - acc, 0));

  const sum = res.map((e) => e.reduce((acc, cur) => acc + cur, 0));
  return sum;
}
