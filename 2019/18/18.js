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

const edges = []
const locked = []
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    gridToGraph(edges, grid, i, j)
  }
}
edges.forEach(([A, B]) => graph.addEdge(A, B))
locked.forEach(([A, B]) => graph.addLocked(A, B))

function gridToGraph(edges, grid, i, j) {
  const type = grid[i][j]
  const bit =
    (/[a-z]/.test(type) &&
      Math.pow(2, type.charCodeAt(0) - "a".charCodeAt(0))) ||
    0
  if (type === "#") return
  graph.addNode([i, j], type, { bit })
  neighbors.forEach(([y, x]) => {
    if (grid[i + y][j + x] !== "#")
      if (/[A-Z]/.test(type)) {
        locked.push([
          [i, j],
          [i + y, j + x],
        ])
      } else {
        edges.push([
          [i, j],
          [i + y, j + x],
        ])
      }
  })
}

class Scout {
  keys = new Set()

  solve(graph) {
    const finishers = []
    const cache = new Map()
    const que = []

    function getReachableKeys(graph, sourceKey) {
      const reachable = graph.bfs(sourceKey)
      return graph.getKeyNodes().reduce((acc, cur) => {
        const steps = reachable.get(cur.key)
        if (steps) acc.push({ ...cur, steps })
        return acc
      }, [])
    }

    let sources = [graph.getNodeByType("@")]
    for (let idx = 0; idx < graph.getKeyNodes().length; idx++) {
      sources.forEach(key => getReachableKeys(graph, key))
      const reachable = getReachableKeys(graph, sourceKey)
      
    }

  
    const search = (
      graph,
      { key, type, steps = 0, node, bit },
      path = [0, 0]
    ) => {
      // console.info(graph.draw([{ node, type: "X" }]))
      // console.info(
      //   [path[0].toString(2), path[1]],
      //   [...cache].map((e) => [
      //     e[0].toString(2),
      //     // .split("")
      //     // .map((c) => String.fromCharCode("a".charCodeAt(0) + c * Number(c))),
      //     e[1],
      //   ])
      // )
      if (
        [...cache].some(
          (cached) => (cached[0] & path[0]) === path[0] && cached[1] < path[1]
        )
      )
        return
      cache.set(...path)

      const currentGraph = graph.copy()
      const current = currentGraph.getNodeByKey(key)

      current.type = "."
      const door = currentGraph.getNodeByType(type.toUpperCase())
      // console.info(door)
      if (door) {
        door.edges = door.locked
        delete door.locked
        door.type = "."
      }
      // console.info(door)

      const reachables = getReachableKeys(currentGraph, key).sort((a,b) => b.steps - a.steps)

      if (!currentGraph.getKeyNodes().length) return finishers.push(path)
      if (!reachables.length) return

      for (let reachable of reachables) {
        const nodePath = [path[0] + reachable.bit, path[1] + reachable.steps]
        search(currentGraph, reachable, nodePath)
      }
    }
    search(graph, sourceNode)
    return finishers
  }
}

const scout = new Scout()
const result = scout.search(graph, graph.getNodeByType("@"))
console.info(
  // result,
  result
  // .map((route) =>
  //   route.reduce((acc, { steps }) => {
  //     return acc + steps
  //   }, 0)
  // )
  .sort((a, b) => a[1] - b[1])
)

// 3944 too high
