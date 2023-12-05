const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  const map = [];
  input.split("\n\n").forEach((section) => {
    let [, numbers] = section.trim().split(/: ?\n?/);
    numbers = numbers.split("\n").map((e) =>
      e
        .trim()
        .split(/ +/)
        .map((e) => +e)
    );
    map.push(numbers);
  });

  const seeds = map[0][0];
  let min = Infinity;
  for (let i = 0; i < seeds.length - 1; i += 2) {
    for (let n = 0; n < seeds[i + 1]; n++) {
      let e = seeds[i] + n;
      level: for (let j = 0; j < map.length - 1; j++) {
        matches: for (let k = 0; k < map[j + 1].length; k++) {
          if (
            e >= map[j + 1][k][1] &&
            e <= map[j + 1][k][1] + map[j + 1][k][2]
          ) {
            const n = e - map[j + 1][k][1];
            e = map[j + 1][k][0] + n;
            continue level;
          }
        }
      }
      if (e < min) min = e;
    }
    console.info(i / 2, seeds[i], seeds[i] + seeds[i + 1], min);
  }
  return min;
}

// 232257988 is too high
// 81956385 is too high (off by 1)
// 81956384
