const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input()
    .split("\n")
    .map((e) => e.split(",").map((e) => e.split("-").map(Number)));

  let result = 0;

  for (let i = 0; i < data.length; i++) {
    const [a, b] = data[i];
    if ((a[0] >= b[0] && a[1] <= b[1]) || (a[0] <= b[0] && a[1] >= b[1]))
      result++;
  }

  console.info(result);
}
