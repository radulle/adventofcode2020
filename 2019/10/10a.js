const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

function parse(row) {
  return row.split("").map((e) => (e === "." ? 0 : 1))
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\r\n").map(parse)
  console.log(data.flat(Infinity).filter((e) => e === 1).length)
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function sights(data, k, l) {
  const sights = new Set()
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] !== 0) {
        const x = i - k
        const y = j - l
        sights.add(Math.sign(x) + "." + Math.sign(y) + "." + x / y)
      }
    }
  }
  return sights.size
}

function solve(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] !== 0) {
        data[i][j] = sights(data, i, j) - 1
      }
    }
  }
  return data.flat(Infinity).sort((a, b) => b - a)[0]
}
