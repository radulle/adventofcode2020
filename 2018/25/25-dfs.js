// #dfs #dfs-tree #groups
const fs = require("fs")
console.time()

function getDist(A, B) {
  return (
    Math.abs(A[0] - B[0]) +
    Math.abs(A[1] - B[1]) +
    Math.abs(A[2] - B[2]) +
    Math.abs(A[3] - B[3])
  )
}

const map = new Map()
for (const r of fs.readFileSync("data.txt", "utf8").split(/\r?\n/)) {
  const row = r.trim().split(",").map(Number)
  const rowAdj = []
  for (const [key, adj] of map.entries()) {
    if (getDist(key, row) <= 3) {
      adj.push(row)
      rowAdj.push(key)
    }
  }
  map.set(row, rowAdj)
}

function dfs(source, map) {
  const visited = new Map()

  function dfs(source, visited, step = 0) {
    visited.set(source, step)
    const adj = map.get(source)
    map.delete(source)
    for (let node of adj) {
      if (!visited.has(node)) {
        dfs(node, visited, step + 1)
      }
    }
  }

  dfs(source, visited)
  return visited
}

const keys = map.keys()
let node,
  groups = []
while (!(node = keys.next()).done) {
  groups.push(dfs(node.value, map))
}

const resultA = groups.length

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.timeEnd()
