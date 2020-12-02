const fs = require("fs");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

function parse(row) {
  const [minMax, letter, password] = row.split(" ");
  return [minMax.split("-").map(Number), letter[0], password];
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\r\n").map(parse);
  console.infoTime(() => solve(data));
} catch (err) {
  console.error(err);
}

function solve(data) {
  return data.filter(([[min, max], letter, password]) => {
    const occurances = (password.match(new RegExp(letter, "gi")) || []).length;
    if (occurances < min) return false;
    if (occurances > max) return false;
    return true;
  }).length;
}
