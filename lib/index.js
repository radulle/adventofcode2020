const fs = require("fs");

module.exports = {
  ...require("./linkedList"),
  ...require("./stackQue"),
  ...require("./queue"),
  ...require("./graph"),
};

module.exports.consoleTime = (logMe) => {
  console.time();
  console.info(logMe());
  console.timeEnd();
};

module.exports.input = fs.readFileSync("data.txt", "utf8");
