const fs = require("fs")
const { Graph, gridBFS: bfs } = require("lib")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r\n|\n/g)
  .map((row) => row.split(""))

let sr, sc
main: for (let idx = 0; idx < data.length; idx++) {
  for (let jdx = 0; jdx < data[0].length; jdx++) {
    if (data[idx][jdx] === "0") {
      sr = idx
      sc = jdx
      break main
    }
  }
}

const graph = new Graph()
const arr = bfs(data, sr, sc)
for (let i = 0; i < arr.length + 1; i++) {
  graph.addNode(i)
}
arr.forEach(({ s, f, dist }) => {
  graph.addEdge(+s, +f, dist)
})
for (let idx = 0; idx < arr.length; idx++) {
  bfs(data, arr[idx].fr, arr[idx].fc).forEach(({ s, f, dist }) => {
    graph.addEdge(+s, +f, dist)
  })
}

const resultA = graph.tsp({ startKey: 0 })
const resultB = graph.tsp({ startKey: 0, roundTrip: true })

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
