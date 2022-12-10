const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input().split("\n");

  let cycle = 0;
  let reg = 0;
  const crt = [];

  for (const line of data) {
    const [, b] = line.split(" ");

    draw();
    cycle++;

    if (b !== undefined) {
      draw();
      cycle++;
      reg += parseInt(b);
    }
  }

  for (let i = 0; i < 240; i += 40) {
    console.info(crt.slice(i, i + 40).join(""));
  }

  function draw() {
    if (reg <= cycle % 40 && cycle % 40 <= reg + 2) return (crt[cycle] = "#");
    crt[cycle] = ".";
  }
}
