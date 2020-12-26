const fs = require("fs")
const { Graph } = require("./graph")

console.time()
const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(/ = | to /))

const graph = new Graph()

data.forEach(([A, B]) => {
  if (!graph.hasNode(A)) graph.addNode(A)
  if (!graph.hasNode(B)) graph.addNode(B)
})
data.forEach(([A, B, weight]) => {
  graph.addEdge(A, B, Number(weight))
  graph.addEdge(B, A, Number(weight))
})

const resultA = graph.tsp()
const resultB = graph.tsp({longest: true})

console.info("\nSolution A (shortest path):")
console.info(resultA)
console.info("\nSolution B (longest path):")
console.info(resultB, "\n")
console.timeEnd()
