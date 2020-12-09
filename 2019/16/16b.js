const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

const REPEATS = 10000

try {
  const data = fs.readFileSync("data.txt", "utf8")
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
  const offset = Number(data.slice(0, 7))
  data = data.repeat(REPEATS).slice(offset).split("").map(Number)
  for (let i = 0; i < 100; i++) {
    for (let j = data.length - 1; j > 0; j--) {
      data[j - 1] = Math.abs(data[j] + data[j - 1]) % 10
    }
  }
  return Number(data.slice(0, 8).join(""))
}
