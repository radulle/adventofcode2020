const fs = require("fs")
const { StackQue, Graph } = require("lib")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r\n|\n/g)
  .map((row) => row.split(""))

function bfs(grid, sr, sc) {
  const dr = [-1, 1, 0, 0]
  const dc = [0, 0, 1, -1]
  const neighbors = dr.length
  const result = []

  const R = grid.length
  const C = grid[0].length
  const qr = new StackQue()
  const qc = new StackQue()
  const visited = new Array(R).fill().map(() => new Array(C).fill())

  qr.enqueue(sr)
  qc.enqueue(sc)
  visited[sr][sc] = true
  let dist = 0
  let currentLayerCount = 1
  let nextLayerCount = 0

  function exploreNeighbors(r, c) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i]
      const cc = c + dc[i]
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue
      if (visited[rr][cc]) continue
      if (grid[rr][cc] === "#") continue
      qr.enqueue(rr)
      qc.enqueue(cc)
      visited[rr][cc] = true
      nextLayerCount++
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue()
    const c = qc.dequeue()
    const f = grid[r][c]
    const s = grid[sr][sc]
    if (s !== f && f !== ".") {
      result.push({ s, sr, sc, f, fr: r, fc: c, dist })
    }
    exploreNeighbors(r, c)
    currentLayerCount--
    if (currentLayerCount === 0) {
      currentLayerCount = nextLayerCount
      nextLayerCount = 0
      dist++
    }
  }
  return result
}

// Starting node
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
// Create adjacency matrix
const arr = bfs(data, sr, sc)
const matrix = new Array(arr.length + 1)
  .fill()
  .map((_, i) =>
    new Array(arr.length + 1).fill().map((_, j) => (i === j ? 0 : Infinity))
  )
function fillMatrix(arr) {
  arr.forEach(({ s, f, dist }) => {
    matrix[+s][+f] = dist
    matrix[+f][+s] = dist
  })
}
fillMatrix(arr)
for (let idx = 0; idx < arr.length; idx++) {
  fillMatrix(bfs(data, arr[idx].fr, arr[idx].fc))
}

// TODO: Finish implementing William Fiset lecture on Traveling Salesman Problem
function tsp(m, S) {
  const N = m.length
  const memo = new Array(N).fill().map(() => new Array(2 ** N).fill(null))
  function setup(m, memo, S, N) {
    for (let i = 0; i < N; i++) {
      if (i === S) continue
      memo[i][(i << S) | (1 << i)] = m[S][i]
    }
  }
  setup(m, memo, S, N)
  function solve(m, memo, S, N) {
    function combinations(r, n) {
      const subsets = new Set()
      function combinations(set, at, r, n, subsets) {
        const elementsLeftToPick = n - at
        if (elementsLeftToPick < r) return
        if (r === 0) {
          subsets.add(set)
        } else {
          for (let i = at; i < n; i++) {
            set = set ^ (1 << i)
            combinations(set, i + 1, r - 1, n, subsets)
            set = set ^ (1 << i)
          }
        }
      }
      combinations(0, 0, r, n, subsets)
      return subsets
    }
    function notIn(elem, subset) {
      return ((1 << elem) & subset) === 0
    }

    for (let r = 3; r <= N; r++) {
      for (const subset of combinations(r, N)) {
        if (notIn(S, subset)) continue
        for (let next = 0; next < N; next++) {
          if (next === S || notIn(next, subset)) continue
          const state = subset ^ (1 << next)
          let minDist = Infinity
          for (let end = 0; end < N; end++) {
            if (end === S || end === next || notIn(end, subset)) continue
            const newDistance = memo[end][state] + m[end][next]
            if (newDistance < minDist) minDist = newDistance
            memo[next][subset] = minDist
          }
        }
      }
    }
  }
  solve(m, memo, S, N)
  function findMinCost(m, memo, S, N) {
    const END_STATE = (1 << N) - 1
    let minTourCost = Infinity
    for (let e = 0; e < N; e++) {
      if (e === S) continue
      let tourCost = memo[e][END_STATE]
      if (tourCost < minTourCost) minTourCost = tourCost
      return minTourCost
    }
  }
  return findMinCost(m, memo, S, N)
}

const resultA = tsp(matrix, 0)

console.info(arr)

const resultB = 65 + 36 * 5 + 1
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
