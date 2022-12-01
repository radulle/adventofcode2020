const fs = require("fs");

module.exports = {
  ...require("./linkedList"),
  ...require("./stackQue"),
  ...require("./queue"),
  ...require("./graph"),
};

module.exports.consoleTime = async (logMe) => {
  console.time();
  await logMe();
  console.timeEnd();
};

module.exports.input = (fileName = "data.txt") =>
  fs.readFileSync(fileName, "utf8");

module.exports.processLines = async function processLines(
  filePath,
  processLine
) {
  const rl = require("readline").createInterface({
    input: require("fs").createReadStream(filePath),
    crlfDelay: Infinity,
  });
  rl.on("line", processLine);
  await require("events").once(rl, "close");
};
