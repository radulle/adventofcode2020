const fs = require("fs")
const { Graph, Grid, toKey } = require("./graph")

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(""))

const grid = new Grid()
const neighbors = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const edges = []
const height = data.length
const width = data[0].length
for (let i = 1; i < height - 1; i++) {
  for (let j = 1; j < width - 1; j++) {
    parseCell(i, j)
  }
}
edges.forEach(([A, B]) => grid.addEdge(A, B))

function parseCell(i, j) {
  const type = data[i][j]
  if (type === "#") return
  let group
  if (/[A-Z]/.test(type)) group = "door"
  if (/[a-z]/.test(type)) group = "key"
  const node = grid.addNode([i, j], { type, group })
  neighbors.forEach(([y, x]) => {
    if (data[i + y][j + x] !== "#")
      edges.push([toKey([i, j]), toKey([i + y, j + x])])
  })
}

// Compress paths between distinct nodes
const allKeys = grid.getDistinctCells().filter((e) => e.group === "key")
const allDoors = grid.getDistinctCells().filter((e) => e.group === "door")
const start = grid.getCellByType("@")
const notDoors = [...allKeys, start]
const filter = allDoors.map((e) => e.key)
const compressed = grid
  .compress()
  .filter((e) => !(filter.includes(e[0]) || filter.includes(e[1])))
  .filter((e) => e[0] !== e[1])
  .map((e) => {
    e[2].keyA = e[0]
    e[2].keyB = e[1]
    e[2].typeA = notDoors.find(({ key }) => e[0] === key).type
    e[2].typeB = notDoors.find(({ key }) => e[1] === key).type
    return e[2]
  })

const finalists = []
let que = [{ ...start, keyChain: [], depth: 0 }]
const visited = new Map()

for (let i = 0; i < allKeys.length; i++) {
  const newQue = []
  que.forEach((node) => {
    const paths = compressed.filter(
      ({ keyA, typeB, doors }) =>
        keyA === node.key &&
        typeB !== "@" &&
        !node.keyChain.includes(typeB.toUpperCase()) &&
        doors.every((door) => node.keyChain.includes(door))
    )
    const sources = paths.map(({ keyB: key, typeB, depth }) => ({
      key,
      keyChain: [...node.keyChain, typeB.toUpperCase()],
      depth: depth + node.depth,
    }))
    sources
      .sort((a, b) => a.depth - b.depth)
      .forEach((source) => {
        const list = [...source.keyChain]
        const last = list.pop()
        const hash = list.sort().join("") + last
        const visitedDepth = visited.get(hash)
        if (!visitedDepth || visitedDepth > source.depth) {
          visited.set(hash, source.depth)
          newQue.push(source)
        }
        if (source.keyChain.length === allKeys.length) {
          finalists.push(source)
        }
      })
  })
  que = newQue
  console.info(i, que.length)
}

console.info(finalists.sort((a, b) => a.depth - b.depth)[0])
