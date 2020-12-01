const fs = require("fs");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\n").map(Number);
  console.infoTime(() => useMap(data, 2020));
  console.infoTime(() => useArr(data, 2020));
} catch (err) {
  console.error(err);
}

function useMap(data, num) {
  const map = new Map();
  for (const x of data) {
    for (const y of data) {
      map.set(x + y, [x, y, x * y]);
    }
  }
  return map.get(num);
}

function useArr(data, num) {
  const sums = data.map((x) => data.map((y) => [x, y, x + y]));
  const flat = sums.flat();
  const filter = flat
    .filter((e) => e[2] === num)
    .map((e) => [...e, e[0] * e[1]]);
  return filter;
}
