const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(...parse(input, 0)), process(...parse(input, 1))];
}

function parse(input, part) {
  const data = [];

  data[0] = input.split("\n").map((e) =>
    e
      .split(/ +/)
      .slice(1)
      .map((e) => +e)
  );

  data[1] = input
    .replace(/ /g, "")
    .split("\n")
    .map((e) =>
      e
        .split(/:/)
        .slice(1)
        .map((e) => +e)
    );

  return data[part];
}

function process(times, distances) {
  const wins = new Array(times.length).fill(0);
  for (let i = 0; i < times.length; i++) {
    for (let speed = 0; speed < times[i]; speed++) {
      if (speed * (times[i] - speed) > distances[i]) wins[i]++;
    }
  }

  return wins.reduce((acc, cur) => acc * cur, 1);
}
