const fs = require("fs")
const { Grid, toKey } = require("./graph")

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
function gridToGraph(i, j) {
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
        }
      })
      portals.push({ key: toKey([i, j]), portal })
    }
    if (neighbor === ".") {
      edges.push([toKey([i, j]), toKey([i + y, j + x])])
    }
  })
}
const portals = []
const edges = []
for (let i = 1; i < data.length - 1; i++) {
  for (let j = 1; j < data[i].length - 1; j++) {
    gridToGraph(edges, data, i, j)
  }
}
edges.push(
  ...portals
    .map(({ key: keyA, portal: portalA }) => [
      keyA,
      portals.find(
        ({ key: keyB, portal: portalB }) => keyA !== keyB && portalA === portalB
      )?.key,
    ])
    .filter((e) => e[1] !== undefined)
)
edges.forEach(([A, B]) => grid.addEdge(A, B))

const start = grid.getCellByType("AA").key
const finish = grid.getCellByType("ZZ").key
const result = [...grid.wbfs(start)].find((e) => e[0] === finish)[1]

console.info(result)
