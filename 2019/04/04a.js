const fs = require("fs");
const _ = require("lodash");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

try {
  const [min, max] = fs.readFileSync("data.txt", "utf8").split("-").map(Number);
  console.infoTime(() => calculate(min, max));
} catch (err) {
  console.error(err);
}

function calculate(min, max) {
  const numbers = [];
  for (let num = min; num <= max; num++) {
    const splitNum = new String(num).split("").map(Number);
    if (
      splitNum.some((_, i) => splitNum[i] === splitNum[i + 1]) &&
      !splitNum.some((_, i) => splitNum[i] > splitNum[i + 1])
    )
      numbers.push(num);
  }
  return numbers.length;
}
