const fs = require("fs")
console.time()

const input = fs.readFileSync("data.txt", "utf8").split("")

class Grid {
  data = {}

  set(node) {
    if (!this.data[node.y]) this.data[node.y] = {}
    this.data[node.y][node.x] = node
    return node
  }

  get(x, y) {
    return this.data[y]?.[x] || { x, y, dist: Infinity }
  }
}

const grid = new Grid()
let cNode = grid.set({ x: 0, y: 0, dist: 0 })
const branches = []

function set(dx, dy) {
  const node = grid.get(cNode.x + dx, cNode.y + dy)
  if (cNode.dist + 1 < node.dist) node.dist = cNode.dist + 1
  cNode = node
  grid.set(node)
}

for (const el of input) {
  switch (el) {
    case "N":
      set(0, -1)
      break
    case "S":
      set(0, 1)
      break
    case "E":
      set(1, 0)
      break
    case "W":
      set(-1, 0)
      break
    case "(":
      branches.push(cNode)
      break
    case ")":
      cNode = branches.pop()
      break
    case "|":
      cNode = branches[branches.length - 1]
      break
  }
}

const nodes = Object.values(grid.data)
  .map((cur) => Object.values(cur))
  .flat()
const resultA = Math.max(...nodes.map((e) => e.dist))
const resultB = nodes.filter((e) => e.dist > 999).length

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("Solution B:\n")
console.info(resultB, "\n")
console.timeEnd()
