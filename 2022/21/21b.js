const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const op = {
    "+": (a, b) => `(${a}+${b})`,
    "-": (a, b) => `(${a}-${b})`,
    "*": (a, b) => `${a}*${b}`,
    "/": (a, b) => `${a}/${b}`,
    "=": (a, b) => `${a}=${b}`,
  };

  const monkeys = new Map();

  function explore(name) {
    const yell = monkeys.get(name);
    if (!Array.isArray(yell)) return yell;
    const res = op[yell[1]](explore(yell[0]), explore(yell[2]));
    if (res.includes("x")) return res;
    return eval(res);
  }

  input()
    .split("\n")
    .map((e) => e.split(": "))
    .forEach((e) => {
      monkeys.set(e[0], isNaN(+e[1]) ? e[1].split(" ") : +e[1]);
    });

  monkeys.get("root")[1] = "=";
  monkeys.set("humn", "x");

  const [a, b] = explore("root").split("=");
  const f = a + "-" + b;

  let res,
    x,
    l = 0,
    r = Number.MAX_SAFE_INTEGER;

  while (l < r) {
    x = Math.round((l + r) / 2);
    res = eval(f.replace("x", x));
    if (res > 0) {
      l = x;
      continue;
    }
    if (res < 0) {
      r = x;
      continue;
    }
    console.info(x);
    break;
  }
}
