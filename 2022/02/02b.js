const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const map = {
    A: 1,
    B: 2,
    C: 3,
  };

  const data = input()
    .split("\n")
    .map((e) => e.split(" "));

  const results = data.map((cur) => {
    const play = map[cur[0]];
    const outcome = cur[1];

    if (outcome === "Y") return 3 + play;
    if (outcome === "Z") {
      if (play === 1) return 6 + 2;
      if (play === 2) return 6 + 3;
      if (play === 3) return 6 + 1;
    }
    if (outcome === "X") {
      if (play === 1) return 3;
      if (play === 2) return 1;
      if (play === 3) return 2;
    }
  });

  const result = results.reduce((acc, cur) => acc + cur, 0);
  console.info(result);
}
