const fs = require("fs")
const lib = require("lib")
console.time()

const nodes = new Map()
const groups = []
for (node of fs.readFileSync("data.txt", "utf8").matchAll(/(\d+) <-> (.+)/g)) {
  nodes.set(node[1], node[2].split(", "))
}

function drill(key, group) {
  if (group.has(key)) return
  group.add(key)
  nodes.get(key).forEach((n) => drill(n, group))
}

while (nodes.size) {
  const group = new Set()
  groups.push(group)
  const key = nodes.keys().next().value
  drill(key, group)
  for (const key of group) {
    nodes.delete(key)
  }
}
const resultA = groups[0].size

const resultB = groups.length

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
