const { input, consoleTime } = require("lib");

consoleTime(() => solve(20, 3));
consoleTime(() => solve(10_000));

function solve(rounds, divide = 1) {
  const operations = {
    "*": (a, b) => a * (b === "old" ? a : +b),
    "+": (a, b) => a + (b === "old" ? a : +b),
  };

  const monkeys = input()
    .split("\n\n")
    .map((e) => {
      const monkey = +/Monkey (\d+):/.exec(e)[1];
      const items = /Starting items: (.+)/.exec(e)[1].split(", ").map(Number);
      const oper = /Operation: new = (.+)/.exec(e)[1].split(" ");
      const div = +/Test: divisible by (.+)/.exec(e)[1];
      const t = +/If true: throw to monkey (.+)/.exec(e)[1];
      const f = +/If false: throw to monkey (.+)/.exec(e)[1];

      return { monkey, items, oper, div, t, f, inspected: 0 };
    });

  const lcm = getLcm(monkeys.map((m) => m.div));

  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      const monkey = monkeys[j];
      const { items, oper, div, t, f } = monkey;
      monkey.items = [];
      for (const item of items) {
        monkey.inspected++;
        const worry =
          Math.floor(operations[oper[1]](item, oper[2]) / divide) %
          (lcm * divide);
        monkeys[worry % div ? f : t].items.push(worry);
      }
    }
  }

  const sorted = monkeys.map((e) => e.inspected).sort((a, b) => b - a);
  console.info(sorted.slice(0, 2).reduce((a, c) => a * c, 1));
}

function getLcm(arr) {
  function getGcd(a, b) {
    let t;
    a < b && ((t = b), (b = a), (a = t));
    t = a % b;
    return t ? getGcd(b, t) : b;
  }
  function getLcm(a, b) {
    return (a / getGcd(a, b)) * b;
  }
  return arr.reduce((a, c) => getLcm(a, c), 1);
}
