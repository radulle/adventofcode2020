// #DAG
// Kahn's algorithm https://en.wikipedia.org/wiki/Topological_sorting

const fs = require("fs")
console.time()

const graph = {}
let S = new Set()
for (const [_, a, b] of fs
  .readFileSync("data.txt", "utf8")
  .matchAll(/Step (.) must be finished before step (.) can begin./g)) {
  if (!graph[b]) graph[b] = []
  graph[b].push(a)
  S.add(a)
}

S = [...S].filter((e) => !Object.keys(graph).includes(e))
const L = []

while (S.length) {
  const n = S.sort().shift()
  L.push(n)
  for (const node of Object.keys(graph)) {
    const index = graph[node].findIndex((e) => e === n)
    if (index !== -1) {
      graph[node].splice(index, 1)
      if (!graph[node].length) {
        delete graph[node]
        S.push(node)
      }
    }
  }
}

if (Object.keys(graph).length) {
  throw new Error("This is not a DAG.")
}

const resultA = L.join("")

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()
