const fs = require("fs");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number);
  console.infoTime(() => combinations(data));
} catch (err) {
  console.error(err);
}

function calc(data) {
  let i = 0;
  const op = () => data[i];
  const el1 = () => data[data[i + 1]];
  const el2 = () => data[data[i + 2]];
  const res = () => data[i + 3];
  while (op() !== 99 && op() !== undefined) {
    if (op() === 1) {
      data[res()] = el1() + el2();
    }
    if (op() === 2) {
      data[res()] = el1() * el2();
    }
    i += 4;
  }
  return data[0];
}

function combinations(data) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const tData = [...data];
      tData[1] = i;
      tData[2] = j;
      if (calc(tData) === 19690720) {
        return [i, j, 100 * i + j];
      }
    }
  }
}
