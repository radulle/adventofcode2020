const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let data = input()
    .split("\n")
    .map(Number)
    .map((v) => ({ v }));

  let mixed = mix(data);
  console.info(result(mixed));

  const key = 811589153;
  data = data.map((n) => ({ v: n.v * key }));
  mixed = mix(data, 10);
  console.info(result(mixed));
}

function mix(list, repeat = 1) {
  const mixed = Array.from(list);
  for (let i = 0; i < repeat; i++) {
    for (const node of list) {
      let idx = mixed.indexOf(node);
      mixed.splice(idx, 1);
      idx = (idx + node.v) % mixed.length;
      mixed.splice(idx, 0, node);
    }
  }
  return mixed;
}

function result(list) {
  const idx = list.findIndex((e) => e.v === 0);
  return [1000, 2000, 3000].reduce(
    (a, c) => a + list[(idx + c) % list.length].v,
    0
  );
}
