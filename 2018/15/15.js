// #bfs #grid #path #fisset
const fs = require("fs")
const { StackQue } = require("lib")
console.time()

const grid = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/g)
  .map((row) => row.split(""))

const actors = []
grid.forEach((row, r) => {
  row.forEach((type, c) => {
    if (type === "E" || type === "G") {
      actors.push({ hp: 200, r, c, type, a: 3 })
    }
  })
})

function bfs(grid, sr, sc, { breakOnClosest = false, walls = ["#"] } = {}) {
  const s = grid[sr][sc]
  const dr = [-1, 0, 0, 1]
  const dc = [0, -1, 1, 0]
  const neighbors = dr.length
  const found = []

  const R = grid.length
  const C = grid[0].length
  const qr = new StackQue()
  const qc = new StackQue()
  const visited = new Array(R).fill().map(() => new Array(C).fill())

  qr.enqueue(sr)
  qc.enqueue(sc)
  visited[sr][sc] = null
  let dist = 0
  let currentLayerCount = 1
  let nextLayerCount = 0

  function exploreNeighbors(r, c) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i]
      const cc = c + dc[i]
      if (rr < 0 || cc < 0 || rr >= R || cc >= C) continue
      if (visited[rr][cc] !== undefined) continue
      if (walls.includes(grid[rr][cc])) continue
      qr.enqueue(rr)
      qc.enqueue(cc)
      visited[rr][cc] = [r, c]
      nextLayerCount++
    }
  }

  while (qr.size > 0) {
    const r = qr.dequeue()
    const c = qc.dequeue()
    const f = grid[r][c]
    if (s !== f && f !== ".") {
      found.push({ s, sr, sc, f, fr: r, fc: c, dist })
    }
    exploreNeighbors(r, c)
    currentLayerCount--
    if (currentLayerCount === 0) {
      if (breakOnClosest && found.length) break
      currentLayerCount = nextLayerCount
      nextLayerCount = 0
      dist++
    }
  }
  return { found, visited }
}

function path(grid, sr, sc, options) {
  const paths = []
  const { found, visited } = bfs(grid, sr, sc, {
    breakOnClosest: true,
    ...options,
  })
  for (const target of found) {
    const path = []
    let { fr, fc } = target
    while (true) {
      ;[fr, fc] = visited[fr][fc]
      if (sr === fr && sc === fc) break
      path.push([fr, fc])
    }
    path.reverse()
    paths.push({ target, path })
  }
  return paths
}

function battle(grid, actors, { elvesMustSurvive = false } = {}) {
  let round = 0
  main: while (true) {
    // round
    for (const actor of actors) {
      if (actor.hp <= 0) continue
      if (!actors.find(({ type, hp }) => type !== actor.type && hp)) break main
      // move
      let targets = path(grid, actor.r, actor.c, { walls: ["#", actor.type] })
      let len
      if ((len = targets[0]?.path.length)) {
        if (len > 1)
          targets.sort(
            (a, b) => a.target.fr - b.target.fr || a.target.fc - b.target.fc
          )
        const n = targets[0].path[0]
        grid[actor.r][actor.c] = "."
        grid[n[0]][n[1]] = actor.type
        actor.r = n[0]
        actor.c = n[1]
      }
      // attack
      const neighbors = []
      const dr = [-1, 0, 0, 1]
      const dc = [0, -1, 1, 0]
      for (let i = 0; i < dr.length; i++) {
        const found = actors.find(
          ({ r, c, hp, type }) =>
            hp > 0 &&
            actor.type !== type &&
            actor.r + dr[i] === r &&
            actor.c + dc[i] === c
        )
        if (found) {
          neighbors.push(found)
        }
      }
      neighbors.sort((a, b) => a.hp - b.hp || a.r - b.r || a.c - b.c)
      if (neighbors.length) {
        const target = neighbors[0]
        target.hp = Math.max((target.hp -= actor.a), 0)
        if (target.hp <= 0) {
          grid[target.r][target.c] = "."
          if (elvesMustSurvive && target.type === "E") {
            return undefined
          }
        }
      }
    }
    round++
    actors.sort((a, b) => a.r - b.r || a.c - b.c)
  }
  return { grid, actors, round }
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const A = battle(copy(grid), copy(actors))
const resultA =
  A.actors.map((e) => e.hp).reduce((acc, cur) => acc + cur) * A.round

let B
while (
  (B = battle(copy(grid), copy(actors), { elvesMustSurvive: true })) ===
  undefined
) {
  actors.forEach((e) => {
    if (e.type === "E") e.a++
  })
}
const resultB =
  B.actors.map((e) => e.hp).reduce((acc, cur) => acc + cur) * B.round

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
