const fs = require("fs")
const hash = require("../10")
const getGroups = require("../12")
console.time()

const data = fs.readFileSync("data.txt", "utf8")

const grid = []
for (let i = 0; i < 128; i++) {
  grid.push(
    hash(data + "-" + i)
      .map((e) => parseInt(e, 16).toString(2).padStart(8, "0"))
      .join("")
      .split("")
      .map(Number)
  )
}

const nodes = new Map()

const neighbors = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (!grid[i][j]) continue
    const adj = []
    for (const [di, dj] of neighbors) {
      const ni = i + di
      const nj = j + dj
      if (!grid[ni]?.[nj]) continue
      adj.push(ni + "," + nj)
    }
    nodes.set(i + "," + j, adj)
  }
}

const resultB = getGroups(nodes).length

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
