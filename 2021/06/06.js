const { input, consoleTime } = require("lib");

const data = input.split(",").map(Number);

consoleTime(() => solve(data, 80));
consoleTime(() => solve(data, 256));

function solve(data, days) {
  const fish = Array(9).fill(0);
  data.forEach((el) => {
    fish[el]++;
  });

  for (let day = 0; day < days; day++) {
    const births = fish.shift();
    fish[6] = fish[6] + births;
    fish[8] = births;
  }

  return fish.reduce((acc, cur) => acc + cur, 0);
}
