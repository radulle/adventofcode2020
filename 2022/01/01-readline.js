const { consoleTime, processLines } = require("lib");

consoleTime(() => solve());

async function solve() {
  const sums = [0];
  let i = 0;

  await processLines("./data.txt", (line) => {
    if (!line) {
      i++;
      sums[i] = 0;
      return;
    }
    sums[i] += +line;
  });

  sums.sort((a, b) => b - a);
  console.info(sums[0]);

  sums.splice(3);
  let sum = 0;
  for (let i = 0; i < sums.length; i++) {
    sum += sums[i];
  }
  console.info(sum);
}
