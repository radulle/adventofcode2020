const fs = require("fs")
const getGroups = require(".")
console.time()

const data = fs.readFileSync("data.txt", "utf8").matchAll(/(\d+) <-> (.+)/g)

const nodes = new Map()
for (node of data) {
  nodes.set(node[1], node[2].split(", "))
}

const groups = getGroups(nodes)

const resultA = groups[0].size

const resultB = groups.length

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
