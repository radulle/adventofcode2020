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
  const combos = new Map()
  const amps = data.sort((a, b) => b - a)
  amps.push(0)
  combos.set(amps[0], 1)
  for (let jdx = 1; jdx < amps.length; jdx++) {
    const amp = amps[jdx]
    let sum = 0
    for (let idx = amp + 1; idx < amp + 4; idx++) {
      sum += combos.get(idx) || 0
    }
    combos.set(amp, sum)
  }
  return combos.get(0)
}
