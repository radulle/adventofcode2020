const { input, consoleTime } = require("lib");

consoleTime(() => solve(14));

function solve(count) {
  const data = input();

  for (let i = 0; i < data.length; i++) {
    if (isUnique(data.slice(i, i + count))) {
      console.info(i + count);
      break;
    }
  }
}

function isUnique(str) {
  const hash = {};
  for (let i = 0; i < str.length; i++) {
    if (hash[str[i]]) return false;
    hash[str[i]] = true;
  }
  return true;
}
