const fs = require("fs");

module.exports = {
  ...require("./linkedList"),
  ...require("./stackQue"),
  ...require("./queue"),
  ...require("./graph"),
};

let consoleLabel = 0;
module.exports.consoleTime = async (logMe) => {
  const label = consoleLabel++;
  console.time(label);
  console.info(await logMe());
  console.timeEnd(label);
};

module.exports.input = (fileName = "data.txt") =>
  fs.readFileSync(process.argv[2] || fileName, "utf8");

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
