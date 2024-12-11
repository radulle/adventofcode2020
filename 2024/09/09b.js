const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let pos = 0;
  let full = [];
  let empty = [];
  for (let i = 0; i < input.length; i++) {
    const l = +input[i];
    if (i % 2 === 0) {
      full.push([pos, l]);
    } else {
      empty.push([pos, l]);
    }
    pos += l;
  }
  return [empty, full];
}

function process([empty, full]) {
  full: for (let i = full.length - 1; i >= 0; i--) {
    const ff = full[i];
    empty: for (let j = 0; j <= empty.length; j++) {
      const ee = empty[j];
      if (ee[0] >= ff[0]) break empty;
      if (ff[1] <= ee[1]) {
        (ff[0] = ee[0]), (ee[0] += ff[1]), (ee[1] -= ff[1]);
        continue full;
      }
    }
  }

  let sum = 0;
  for (let id = 0; id < full.length; id++) {
    const [pos, len] = full[id];
    for (let i = 0; i < len; i++) {
      sum += (pos + i) * id;
    }
  }

  return sum;
}
