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
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  console.infoTime(() => solve(data, slopes));
} catch (err) {
  console.error(err);
}

function solve(data, slopes) {
  const width = data[0].length;
  return slopes.reduce((mul, [right, down]) => {
    let acc = 0;
    for (let row = 0; row < data.length; row += down) {
      acc = acc + data[row][((row / down) * right) % width];
    }
    return mul * acc;
  }, 1);
}
