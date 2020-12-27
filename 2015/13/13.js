const fs = require("fs")
const { Graph } = require("../graph")

console.time()
const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .replace(/happiness units by sitting next to |would |gain |\./g, "")
  .replace(/lose /g, "-")
  .split("\n")
  .map((row) => row.split(" "))

const combined = []

data.forEach(([A, w, B]) => {
  combined.push([
    A,
    B,
    Number(w) + Number(data.find(([a, w, b]) => b === A && a === B)[1] || 0),
  ])
})

const graph = new Graph()

const guests = new Set(combined.map((e) => e[0]))
guests.forEach((A) => {
  graph.addNode(A)
})
combined.forEach(([A, B, weight]) => {
  graph.addEdge(A, B, Number(weight))
})

const resultA = graph.rtp({ longest: true })

graph.addNode("radulle")
guests.forEach((guest) => {
  graph.addEdge("radulle", guest, 0)
  graph.addEdge(guest, "radulle", 0)
})

const resultB = graph.rtp({ longest: true })

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
