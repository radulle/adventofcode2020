const fs = require("fs");

global.console.infoTime = (logMe) => {
  console.time();
  console.info(typeof logMe === "function" ? logMe() : logMe);
  console.timeEnd();
};

function parse(row) {
  return row.split("").map((e) => (e === "." ? 0 : 1));
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\r\n").map(parse);
  console.infoTime(() => solve(data));
} catch (err) {
  console.error(err);
}

function solve(data) {
  return data.reduce((acc, cur, idx) => {
    return acc + cur[(idx * 3) % cur.length];
  }, 0);
}
