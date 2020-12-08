const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .replace(/bags|bag/gi, "")
    .split(".\r\n")
    .map((row) =>
      row.split(" contain ").map((elements) => elements.trim().split(" , "))
    )
    .reduce((acc, cur) => {
      cur[1]
        .map((e) => e.split(" ").slice(1).join(" "))
        .forEach((el) => acc.set(el, [...(acc.get(el) || []), cur[0][0]]))
      return acc
    }, new Map())
  console.infoTime(() => solve(data, "shiny gold"))
} catch (err) {
  console.error(err)
}

function solve(data, initColor) {
  const set = new Set()
  set.add(initColor)
  let size
  while (true) {
    set.forEach((color) => {
      data.get(color)?.forEach((e) => set.add(e))
    })
    if (set.size === size) break
    size = set.size
  }
  return set.size - 1
}
