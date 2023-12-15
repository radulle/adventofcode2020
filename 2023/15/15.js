const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.trim().split(",");
}

function process(data) {
  let label, lens, h;
  const boxes = Array(256)
    .fill()
    .map(() => []);
  for (let i = 0; i < data.length; i++) {
    if (data[i].includes("-")) {
      label = data[i].replace("-", "");
      for (let j = 0; j < boxes.length; j++)
        for (let k = 0; k < boxes[j].length; k++)
          if (boxes[j][k].split(" ")[0] === label) boxes[j].splice(k, 1);
    }
    if (data[i].includes("=")) {
      ([label, lens] = data[i].split("=")), (h = hash(label));
      const I = boxes[h].findIndex((e) => e.split(" ")[0] === label);
      if (I === -1) boxes[h].push(label + " " + lens);
      else boxes[h][I] = label + " " + lens;
    }
  }

  return [
    data.map((e) => hash(e)).reduce((acc, cur) => acc + cur, 0),
    boxes.reduce(
      (acc, cur, i) =>
        acc +
        (i + 1) * cur.reduce((a, c, j) => a + (j + 1) * +c.split(" ")[1], 0),
      0
    ),
  ];
}

function hash(str) {
  let v = 0;
  for (let i = 0; i < str.length; i++)
    (v += str.charCodeAt(i)), (v *= 17), (v %= 256);
  return v;
}
