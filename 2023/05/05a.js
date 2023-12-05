const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  const map = [];
  input.split("\n\n").forEach((section) => {
    let [name, numbers] = section.trim().split(/: ?\n?/);
    numbers = numbers.split("\n").map((e) =>
      e
        .trim()
        .split(/ +/)
        .map((e) => +e)
    );
    map.push(numbers);
  });

  const locations = [map[0][0], [], [], [], [], [], [], []];
  element: for (let i = 0; i < locations[0].length; i++) {
    level: for (let j = 0; j < locations.length - 1; j++) {
      const element = locations[j][i];
      matches: for (let k = 0; k < map[j + 1].length; k++) {
        if (
          element >= map[j + 1][k][1] &&
          element <= map[j + 1][k][1] + map[j + 1][k][2]
        ) {
          const n = element - map[j + 1][k][1];
          locations[j + 1].push(map[j + 1][k][0] + n);
          continue level;
        }
      }
      locations[j + 1].push(element);
    }
  }

  return Math.min(...locations[locations.length - 1]);
}
