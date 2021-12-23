const { input, consoleTime } = require("lib");

const data = input()
  .split("\n")
  .map((e) => e.split("").map(Number));
consoleTime(() => solve(data));

function solve(data) {
  const gamma = [];
  for (let i = 0; i < data[0].length; i++) {
    gamma.push(common(data, i));
  }

  const epsilon = gamma.map((e) => (e === 1 ? 0 : 1));
  const result = bin2dec(gamma) * bin2dec(epsilon);
  return result;
}

function bin2dec(bin) {
  return parseInt(bin.join(""), 2);
}

function common(arr, i) {
  const half = arr.length / 2;
  let j = 0;
  for (const el of arr) {
    if (el[i] === 1) j++;
  }
  return j >= half ? 1 : 0;
}
