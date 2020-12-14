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
let start
let finish

const grid = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(""))

const graph = new Graph()

const outer = []
const inner = []
const portals = []
const edges = []
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    gridToGraph(edges, grid, i, j)
  }
}

console.info(outer, inner)

const folds = 12

let tempAdjacent = { ...graph.adjacent }
for (let idx = 1; idx < folds; idx++) {
  tempAdjacent = { ...tempAdjacent, ...graph.fold(idx) }
}
graph.adjacent = tempAdjacent
for (let idx = 1; idx < folds; idx++) {
  edges.push(
    ...inner.map((a) => [
      a[0].replace("(0)", `(${idx - 1})`),
      outer
        .find((b) => b[0] !== a[0] && b[1] === a[1])?.[0]
        .replace("(0)", `(${idx})`),
    ])
  )
  edges.push(
    ...outer.map((a) => [
      a[0].replace("(0)", `(${idx})`),
      inner
        .find((b) => b[0] !== a[0] && b[1] === a[1])?.[0]
        .replace("(0)", `(${idx - 1})`),
    ])
  )
}
edges.forEach(([A, B]) => graph.addEdge(A, B))
console.info('folded')

function gridToGraph(edges, grid, i, j) {
  const type = grid[i][j]
  if (type === "#" || /[A-Z ]/.test(type)) return
  const node = graph.addNode(`(0)${i},${j}`, type)
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
          if (portal === "AA") start = node
          if (portal === "ZZ") finish = node
        }
      })
      if (
        i === 2 ||
        j === 2 ||
        grid.length - 3 === i ||
        grid[i].length - 3 === j
      ) {
        !(portal === "AA" || portal === "ZZ") &&
          outer.push([`(0)${i},${j}`, portal])
      } else {
        inner.push([`(0)${i},${j}`, portal])
      }
      portals.push([`(0)${i},${j}`, portal])
    }
    if (neighbor === ".") {
      edges.push([`(0)${i},${j}`, `(0)${i + y},${j + x}`])
    }
  })
}

console.info(
  [...graph.dfs(start.key)]
    .map((e) => ({
      ...graph.adjacent[e[0]],
      steps: e[1],
    }))
    .filter((e) => e.key === finish.key)
)
