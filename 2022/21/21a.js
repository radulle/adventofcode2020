const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const op = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const monkeys = new Map();

  input()
    .split("\n")
    .map((e) => e.split(": "))
    .forEach((e) => {
      monkeys.set(e[0], isNaN(+e[1]) ? e[1].split(" ") : +e[1]);
    });

  function explore(name) {
    const yell = monkeys.get(name);
    if (!Array.isArray(yell)) return yell;
    return op[yell[1]](explore(yell[0]), explore(yell[2]));
  }

  console.info(explore("root"));
}
