const { input, consoleTime } = require("lib");

consoleTime(() => solve(14));

function solve(count) {
  const data = input();

  const set = new Set();

  function isUnique(str) {
    set.clear();
    for (let i = 0; i < str.length; i++) {
      if (set.has(str[i])) return false;
      set.add(str[i]);
    }
    return true;
  }

  for (let i = 0; i < data.length; i++) {
    if (isUnique(data.slice(i, i + count))) {
      console.info(i + count);
      break;
    }
  }
}
