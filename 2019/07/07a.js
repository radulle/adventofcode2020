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
  return perms([0, 1, 2, 3, 4])
    .map((e) => e.reduce((acc, cur) => intCode.eval([...data], [cur, acc]), 0))
    .sort((a, b) => b - a)[0]
}

function perms(arr) {
  if (!arr.length) return [[]]
  return arr.flatMap((x) => {
    return perms(arr.filter((y) => y !== x)).map((z) => [x, ...z])
  })
}
