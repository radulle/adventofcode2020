const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
  return [...intCode(data)]
    .filter((_, i) => (i + 1) % 3 === 0)
    .filter((e) => e === 2).length
}
