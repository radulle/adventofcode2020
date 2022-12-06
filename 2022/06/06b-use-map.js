const { input, consoleTime } = require("lib");

consoleTime(() => solve(14));

function solve(count) {
  const data = input();

  const map = new Map();

  function isUnique(str) {
    map.clear();
    for (let i = 0; i < str.length; i++) {
      if (map.has(str[i])) return false;
      map.set(str[i], true);
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
