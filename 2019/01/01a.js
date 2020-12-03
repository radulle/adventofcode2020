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
  return Math.max(Math.floor(mass / 3) - 2, 0);
}

function sum(acc, cur) {
  return acc + cur;
}

function sumFuel(data) {
  return data.map(fuel).reduce(sum);
}
