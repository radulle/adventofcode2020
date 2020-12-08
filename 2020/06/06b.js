const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .split("\r\n\r\n")
    .map((group) => group.split("\r\n").map((answers) => answers.split("")))
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
  return data
    .map((group) => {
      const set = new Set()
      const flat = group.flat()
      flat.forEach((answer) => set.add(answer))
      return [...set]
        .map(
          (distinct) => flat.filter((element) => element === distinct).length
        )
        .filter((count) => count === group.length).length
    })
    .reduce((acc, cur) => acc + cur)
}
