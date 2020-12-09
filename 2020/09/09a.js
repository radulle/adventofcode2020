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
  for (let idx = 25; idx < data.length; idx++) {
    const range = data.slice(idx - 25, idx)
    const test = range.every(
      (a) => range.findIndex((b) => a + b === data[idx] && a !== b) === -1
    )
    if (test) return data[idx]
  }
}
