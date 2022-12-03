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

  for (let i = 0; i < data.length; i += 3) {
    const set = [];
    for (let j = 0; j < 3; j++) {
      const backpack = data[i + j];
      for (let k = 0; k < backpack.length; k++) {
        const priority = getPriority(backpack[k]);
        set[priority] |= 2 ** j;
        if (set[priority] === 7) {
          result += priority;
          break;
        }
      }
    }
  }

  console.info(result);
}
