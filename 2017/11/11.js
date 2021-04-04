const fs = require("fs")
const lib = require("lib")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(",")

function move(pos, dir) {
  switch (dir) {
    case "s":
      return [pos[0], pos[1] + 2]
    case "se":
      return [pos[0] + 1, pos[1] + 1]
    case "sw":
      return [pos[0] - 1, pos[1] + 1]
    case "n":
      return [pos[0], pos[1] - 2]
    case "ne":
      return [pos[0] + 1, pos[1] - 1]
    case "nw":
      return [pos[0] - 1, pos[1] - 1]
  }
}

let path = [[0, 0]]
data.forEach((dir) => {
  path.push(move(path[path.length - 1], dir))
})

const dist = ([x, y]) =>
  Math.abs(x) + Math.max(0, (Math.abs(y) - Math.abs(x)) / 2)

const resultA = dist(path[path.length - 1])
const resultB = Math.max(...path.map(dist))

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
