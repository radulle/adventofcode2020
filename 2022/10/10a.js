const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input().split("\n");

  let cycle = 0;
  let reg = 1;
  let result = 0;

  for (const line of data) {
    const [, b] = line.split(" ");

    cycle++;
    addIf();

    if (b !== undefined) {
      cycle++;
      addIf();
      reg += parseInt(b);
    }
  }

  console.info(result);

  function addIf() {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) result += cycle * reg;
  }
}
