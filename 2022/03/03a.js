const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function getPriority(char) {
  const v = char.charCodeAt(0);
  if (v > 96) return v - 96;
  return v - 64 + 26;
}

function solve() {
  const data = input().split("\n");

  let result = 0;

  for (let i = 0; i < data.length; i++) {
    const backpack = data[i];
    const size = backpack.length;
    const set = [];
    for (let j = 0; j < size / 2; j++) {
      const priority = getPriority(backpack[j]);
      set[priority] = true;
    }
    for (let j = size / 2; j < size; j++) {
      const priority = getPriority(backpack[j]);
      if (set[priority]) {
        result += priority;
        break;
      }
    }
  }

  console.info(result);
}
