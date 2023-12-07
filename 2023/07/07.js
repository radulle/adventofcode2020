const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input, 0)), process(parse(input, 1))];
}

function parse(input, part) {
  const data = [];

  input = input
    .replace(/A/g, "Z")
    .replace(/K/g, "Y")
    .replace(/Q/g, "X")
    .replace(/J/g, "W")
    .replace(/T/g, "V");
  data[0] = input.split("\n").map((e) => e.split(" "));

  input = input.replace(/W/g, "0");
  data[1] = input.split("\n").map((e) => e.split(" "));

  return data[part];
}

function process(data) {
  data.forEach((e, i) => (data[i][0] = getType(e[0])));
  data.sort(([a], [b]) => (a > b ? 1 : -1));
  return data.reduce((acc, cur, i) => acc + +cur[1] * (i + 1), 0);
}

function getType(hand) {
  const map = {};
  let jokers = 0;

  hand.split("").forEach((e) => {
    if (e === "0") jokers++;
    else if (map[e]) map[e]++;
    else map[e] = 1;
  });

  if (jokers === 5) return 5 + hand;
  const str = Object.values(map).sort((a, b) => b - a);
  str[0] = str[0] + jokers;
  return str.join("") + hand;
}
