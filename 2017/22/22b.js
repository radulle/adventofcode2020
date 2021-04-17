// #grid #map #movement

console.time()
const fs = require("fs")

const hash = (...coords) => coords.join(",")

const map = new Map()
const grid = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/g)
  .map((row) => row.split(""))
grid.forEach((row, i) =>
  row.forEach((cell, j) => cell === "#" && map.set(hash(i, j), cell))
)

let y = Math.floor(grid.length / 2)
let x = y
let dir = "u"

const mv = {
  d: [1, 0],
  u: [-1, 0],
  r: [0, 1],
  l: [0, -1],
}
const rot = (o) => {
  switch (dir) {
    case "l":
      dir = o === "l" ? "d" : o === "b" ? "r" : "u"
      break
    case "r":
      dir = o === "l" ? "u" : o === "b" ? "l" : "d"
      break
    case "u":
      dir = o === "l" ? "l" : o === "b" ? "d" : "r"
      break
    case "d":
      dir = o === "l" ? "r" : o === "b" ? "u" : "l"
      break
  }
}

let val
let count = 0
let steps = 0

while (steps < 10_000_000) {
  val = map.get(hash(y, x))
  switch (val) {
    case "#":
      rot("r")
      map.set(hash(y, x), "F")
      break
    case "F":
      rot("b")
      map.delete(hash(y, x))
      break
    case "W":
      map.set(hash(y, x), "#")
      count++
      break
    default:
      rot("l")
      map.set(hash(y, x), "W")
  }
  y += mv[dir][0]
  x += mv[dir][1]
  steps++
}

const resultB = count

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
