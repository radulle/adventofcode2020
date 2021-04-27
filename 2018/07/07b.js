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
let step = 0
let que = []
const MAX_LENGTH = 5,
  DELAY = 60
const delay = (s) => DELAY + s.charCodeAt() - "A".charCodeAt() + 1

while (S.length || que.length) {
  while (S.length && que.length < MAX_LENGTH) {
    const s = S.shift()
    que.push({ s, t: step + delay(s) })
    que.sort((a, b) => a.t - b.t)
  }
  step++
  if (que[0].t > step) continue
  const { s: n } = que.shift()
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

const resultB = step

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
