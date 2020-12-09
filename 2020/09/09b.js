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

function getWeakness(data) {
  for (let idx = 25; idx < data.length; idx++) {
    const range = data.slice(idx - 25, idx)
    const test = range.every(
      (a) => range.findIndex((b) => a + b === data[idx] && a !== b) === -1
    )
    if (test) return data[idx]
  }
}

function getRange(data) {
  const weakness = getWeakness(data)

  const arr = [...data]
  for (let jdx = 1; jdx < data.length; jdx++) {
    for (let idx = 0; idx < data.length - jdx; idx++) {
      if (
        [...Array(jdx + 1).keys()].reduce(
          (acc, cur) => acc + data[idx + cur],
          0
        ) === weakness
      )
        return [idx, jdx]
    }
  }
}

function solve(data) {
  const [idx, jdx] = getRange(data)
  const range = data.slice(idx, jdx + idx + 1)
  return Math.max(...range) + Math.min(...range)
}
