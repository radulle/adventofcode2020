const fs = require("fs");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number);
  data[1] = 12;
  data[2] = 2;
  console.infoTime(() => calc(data));
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
  return data;
}
