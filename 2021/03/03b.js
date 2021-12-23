const { input, consoleTime } = require("lib");

const data = input()
  .split("\n")
  .map((e) => e.split("").map(Number));
consoleTime(() => solve(data));

function solve(data) {
  let oxygen = data.slice(),
    co2scrubber = data.slice(),
    i = 0;
  while (oxygen.length > 1) {
    oxygen = oxygen.filter((e, _, arr) => e[i] === common(arr, i));
    i++;
  }
  i = 0;
  while (co2scrubber.length > 1) {
    co2scrubber = co2scrubber.filter((e, _, arr) => e[i] !== common(arr, i));
    i++;
  }
  const result = bin2dec(oxygen[0]) * bin2dec(co2scrubber[0]);
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
