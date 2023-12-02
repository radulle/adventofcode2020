const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const fund = { red: 12, green: 13, blue: 14 };
  const data = input()
    .split("\n")
    .map((line, i) => ({
      id: i + 1,
      sets: line
        .split(": ")[1]
        .split("; ")
        .map((set) => set.split(", ").map((e) => e.split(" "))),
    }));

  const sum = [0, 0];
  for (const game of data) {
    let overflow = 0;
    let min = { red: 0, green: 0, blue: 0 };
    for (const set of game.sets) {
      for (let [count, color] of set) {
        if (+count > fund[color]) overflow += +count - fund[color];
        if (+count > min[color]) min[color] = +count;
      }
    }
    if (!overflow) sum[0] += game.id;
    sum[1] += Object.values(min).reduce((acc, cur) => acc * cur, 1);
  }

  return sum;
}
