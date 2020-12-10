const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\r\n").map(Number)
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
  let ones = 0
  let threes = 1
  const amps = data.sort((a, b) => a - b)
  amps.unshift(0)
  for (let idx = 0; idx < amps.length - 1; idx++) {
    if (amps[idx + 1] === amps[idx] + 1) ones++
    if (amps[idx + 1] === amps[idx] + 3) threes++
  }
  return [amps.length, ones, threes, ones * threes]
}
