const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.trim().split("\n");
}

function process(codes) {
  const numericKeypad = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [" ", "0", "A"],
  ];
  const directionalKeypad = [
    [" ", "^", "A"],
    ["<", "v", ">"],
  ];

  const memo = new Map();
  return [2, 25].map((n) =>
    codes
      .map((code) => sequence(numericKeypad, code, n, memo))
      .reduce((acc, cur, i) => acc + cur * parseInt(codes[i]), 0)
  );

  function sequence(keypad, code, lvl, memo) {
    const key = `${code},${lvl}`;
    if (memo.has(key)) return memo.get(key);
    let [sr, sc] = find(keypad, "A");
    let len = 0;
    for (let i = 0; i < code.length; i++) {
      const [er, ec] = find(keypad, code[i]);
      const moves = dijkstra(keypad, sr, sc, er, ec);
      (sr = er), (sc = ec);
      if (lvl === 0) {
        len += moves[0].length;
        continue;
      }
      len += Math.min(
        ...moves.map((move) => sequence(directionalKeypad, move, lvl - 1, memo))
      );
    }
    memo.set(key, len);
    return len;
  }

  function find(keypad, button) {
    for (let r = 0; r < keypad.length; r++) {
      for (let c = 0; c < keypad[r].length; c++) {
        if (keypad[r][c] === button) return [r, c];
      }
    }
  }

  function dijkstra(keypad, sr, sc, er, ec) {
    const dirs = [
      [-1, 0, "^"],
      [0, 1, ">"],
      [1, 0, "v"],
      [0, -1, "<"],
    ];
    const q = [[[sr, sc, "", `#${sr},${sc}#`]]];
    let paths = [];
    let steps = 0;
    while (q.length) {
      const layer = q[steps];
      if (!layer?.length) break;
      if (paths.length) break;
      for (const prev of layer) {
        const [r, c, d, seen] = prev;
        if (r === er && c === ec) paths.push(d + "A");
        for (let i = 0; i < 4; i++) {
          const rr = r + dirs[i][0];
          const cc = c + dirs[i][1];
          const key = `#${rr},${cc}#`;
          if (rr < 0 || cc < 0 || rr >= keypad.length || cc >= keypad[0].length)
            continue;
          if (keypad[rr][cc] === " ") continue;
          if (seen.includes(key)) continue;
          if (!q[steps + 1]) q[steps + 1] = [];
          q[steps + 1].push([rr, cc, d + dirs[i][2], seen + key]);
        }
      }
      steps++;
    }
    return paths;
  }
}
