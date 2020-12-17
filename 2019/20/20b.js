const fs = require("fs")
const { Graph, Grid, toKey } = require("./graph")

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(""))

// Parse problem specific data into a Grid/Graph
const grid = new Grid()
const neighbors = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]
function parseCell(i, j) {
  const type = data[i][j]
  if (type === "#" || /[A-Z ]/.test(type)) return
  const node = grid.addNode([i, j], { type })
  neighbors.forEach(([y, x]) => {
    const neighbor = data[i + y][j + x]
    if (/[A-Z]/.test(neighbor)) {
      let portal = neighbor
      neighbors.forEach(([y1, x1]) => {
        const neighbor = data[i + y + y1][j + x + x1]
        if (/[A-Z]/.test(neighbor)) {
          if (y1 === -1 || x1 === -1) {
            portal = neighbor + portal
          } else {
            portal += neighbor
          }
          node.type = portal
          if (height - i < 4 || i < 3 || width - j < 4 || j < 3) {
            node.group = "outer"
          } else {
            node.group = "inner"
          }
          if (portal === "AA" || portal === "ZZ") node.group = "exit"
        }
      })
    }
    if (neighbor === ".") {
      edges.push([toKey([i, j]), toKey([i + y, j + x])])
    }
  })
}
const edges = []
const height = data.length
const width = data[0].length
for (let i = 1; i < height - 1; i++) {
  for (let j = 1; j < width - 1; j++) {
    parseCell(i, j)
  }
}
edges.forEach(([A, B]) => grid.addEdge(A, B))

// Compress paths between distinct nodes
const compressed = grid.compress()
const outer = grid.getDistinctCells().filter((e) => e.group === "outer")
const inner = grid.getDistinctCells().filter((e) => e.group === "inner")
const exit = grid.getDistinctCells().filter((e) => e.group === "exit")
const start = grid.getCellByType("AA").key
const finish = grid.getCellByType("ZZ").key

// Solution on a new Graph using compressed paths
const graph = new Graph()

const z = (i) => (i ? i + "," : "")
const connectLevels = (i) =>
  inner
    .map(({ key: keyA, type: portalA }) => [
      z(i) + keyA,
      z(i + 1) +
        outer.find(
          ({ key: keyB, type: portalB }) => keyA !== keyB && portalA === portalB
        )?.key,
      1,
    ])
    .flatMap((e) => [e, [e[1], e[0], e[2]]])

// Level 0
const nodes0 = outer.map((e) => e.key)
const edges0 = compressed.filter(
  (e) => !(nodes0.includes(e[0]) || nodes0.includes(e[1]))
)
const nodes = new Set(compressed.map(([A]) => A))
nodes.forEach((key) => graph.addNode(key))
edges0.forEach((edge) => graph.addEdge(...edge))

// Level N
let result
let level = 1
const nodesN = exit.map((e) => e.key)
const edgesN = compressed.filter(
  (e) => !(nodesN.includes(e[0]) || nodesN.includes(e[1]))
)
while (!(result = graph.wbfs(start).get(finish))) {
  nodes.forEach((key) => graph.addNode(z(level) + key))
  edgesN.forEach(([A, B, weight]) =>
    graph.addEdge(z(level) + A, z(level) + B, weight)
  )
  connectLevels(level - 1).forEach((edge) => graph.addEdge(...edge))
  level++
}

console.info({ result, level })
