const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [rules, updates] = input.split("\n\n");
  rules = rules.split("\n").map((rule) => rule.split("|").map(Number));
  updates = updates.split("\n").map((page) => page.split(",").map(Number));
  return { rules, updates };
}

function process({ rules, updates }) {
  const valid = [];

  pages: for (const pages of updates) {
    for (const [l, r] of rules) {
      const li = pages.indexOf(l);
      const ri = pages.indexOf(r);
      if (li !== -1 && ri !== -1 && li > ri) {
        continue pages;
      }
    }
    valid.push(pages)
  }


  return valid.map(e => e[e.length / 2 - 0.5]).reduce((a, b) => a + b, 0);
}
