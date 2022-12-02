const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const map = {
    X: 1,
    Y: 2,
    Z: 3,
    A: 1,
    B: 2,
    C: 3,
  };

  const data = input()
    .split("\n")
    .map((e) => e.split(" ").map((e) => map[e]));

  const results = data.map(([him, me]) => {
    let res = me;
    if (him === me) res += 3;
    if (me - him === 1 || him - me === 2) res += 6;
    return res;
  });

  const result = results.reduce((acc, cur) => acc + cur, 0);
  console.info(result);
}
