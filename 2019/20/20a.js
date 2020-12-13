const fs = require("fs")
const Graph = require("./graph")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

const neighbors = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const grid = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(""))

const graph = new Graph()

const portals = []
const edges = []
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    gridToGraph(edges, grid, i, j)
  }
}
edges.push(
  ...portals
    .map((a) => [
      a[0],
      portals.find((b) => b[0] !== a[0] && b[1] === a[1])?.[0],
    ])
    .filter((e) => e[1] !== undefined)
)
edges.forEach(([A, B]) => graph.addEdge(A, B))

function gridToGraph(edges, grid, i, j) {
  const type = grid[i][j]
  if (type === "#" || /[A-Z ]/.test(type)) return
  const node = graph.addNode([i, j], type)
  neighbors.forEach(([y, x]) => {
    const neighbor = grid[i + y][j + x]
    if (/[A-Z]/.test(neighbor)) {
      let portal = neighbor
      neighbors.forEach(([y1, x1]) => {
        const neighbor = grid[i + y + y1][j + x + x1]
        if (/[A-Z]/.test(neighbor)) {
          if (y1 === -1 || x1 === -1) {
            portal = neighbor + portal
          } else {
            portal += neighbor
          }
          if (portal === "AA") node.type = "AA"
          if (portal === "ZZ") node.type = "ZZ"
        }
      })
      portals.push([[i, j], portal])
    }
    if (neighbor === ".") {
      edges.push([
        [i, j],
        [i + y, j + x],
      ])
    }
  })
}

console.info(
  [...graph.bfs(graph.getNodeByType("AA").key)]
    .map((e) => ({
      ...graph.adjacent[e[0]],
      steps: e[1],
    }))
    .filter((e) => e.type === "ZZ")
)
