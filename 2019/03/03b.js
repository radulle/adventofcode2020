const fs = require("fs")
const _ = require("lodash")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const [wire1, wire2] = fs
    .readFileSync("data.txt", "utf8")
    .split("\n")
    .map((e) => e.split(",").map((e) => [e[0], Number(e.substring(1))]))
  console.infoTime(() => calculate(wire1, wire2))
} catch (err) {
  console.error(err)
}

function calculate(wire1, wire2) {
  return length(path(wire1), path(wire2)).sort()[1]
}

function length(path1, path2) {
  return intersections(path1, path2).map(([x, y]) => {
    return (
      path1.findIndex(([x1, y1]) => x1 === x && y1 === y) +
      path2.findIndex(([x2, y2]) => x2 === x && y2 === y)
    )
  })
}

function intersect(a, b) {
  var setA = new Set(a)
  var setB = new Set(b)
  var intersection = new Set([...setA].filter((x) => setB.has(x)))
  return Array.from(intersection)
}

function intersections(path1, path2) {
  return intersect(path1.map(JSON.stringify), path2.map(JSON.stringify)).map(
    JSON.parse
  )
}

function path(data) {
  return data.reduce(
    (acc, [dir, len]) => {
      const [x, y] = acc[acc.length - 1]
      switch (dir) {
        case "L":
          for (let i = 1; i <= len; i++) {
            acc.push([x - i, y])
          }
          break
        case "R":
          for (let i = 1; i <= len; i++) {
            acc.push([x + i, y])
          }
          break
        case "D":
          for (let i = 1; i <= len; i++) {
            acc.push([x, y - i])
          }
          break
        case "U":
          for (let i = 1; i <= len; i++) {
            acc.push([x, y + i])
          }
          break
      }
      return acc
    },
    [[0, 0]]
  )
}
