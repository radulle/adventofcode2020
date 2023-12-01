const { input, consoleTime } = require("lib");

consoleTime(() => solve());
consoleTime(() => solve(true));

function solve(handleWords) {
  const words = "zero,one,two,three,four,five,six,seven,eight,nine".split(",");

  const data = input()
    .split("\n")
    .map((line) => {
      let [fi, li, fv, lv] = [Infinity, -Infinity];

      process((i) => i);
      if (handleWords) process((i) => words[i]);

      function process(subst) {
        for (let i = 0; i < 10; i++) {
          const v = subst(i);
          const io = line.indexOf(v);
          if (io > -1 && io < fi) (fi = io), (fv = i);
          const lio = line.lastIndexOf(v);
          if (lio > -1 && lio > li) (li = lio), (lv = i);
        }
      }

      return 10 * fv + lv;
    });

  const sum = data.reduce((acc, curr) => acc + curr, 0);

  console.info(sum);
}
