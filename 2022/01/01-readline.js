const { consoleTime } = require("lib");

consoleTime(() => solve());

async function processLines(filePath, processLine) {
  const rl = require("readline").createInterface({
    input: require("fs").createReadStream(filePath),
    crlfDelay: Infinity,
  });
  rl.on("line", processLine);
  await require("events").once(rl, "close");
}

async function solve() {
  const sums = [0];
  let i = 0;

  await processLines("./data.txt", (line) => {
    if (!line) {
      i++;
      sums[i] = 0;
      return;
    }
    sums[i] += +line;
  });

  sums.sort((a, b) => b - a);
  console.info(sums[0]);

  sums.splice(3);
  let sum = 0;
  for (let i = 0; i < sums.length; i++) {
    sum += sums[i];
  }
  console.info(sum);
}

// conclusion: readline is slightly slower on small data sets, while faster by several orders of magnitude on large.
