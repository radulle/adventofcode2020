const fs = require("fs");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\n").map(Number);
  console.infoTime(() => sumFuel(data, 2020));
} catch (err) {
  console.error(err);
}

function fuel(mass) {
  const f1 = Math.floor(mass / 3) - 2
  if (f1 < 0) return 0;
  if (f1 < 9) return f1;
  return f1 + fuel(f1);
}

function sum(acc, cur) {
  return acc + cur;
}

function sumFuel(data) {
  return data.map(fuel).reduce(sum);
}
