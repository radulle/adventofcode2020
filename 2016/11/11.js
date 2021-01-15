const fs = require("fs")
console.time()

const input = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")

let initial = {}
input.forEach((row, idx) => {
  for (const match of row.matchAll(
    /(\w+)(-compatible microchip| generator)/g
  )) {
    if (!initial[match[1]]) initial[match[1]] = []
    if (match[2] === " generator") {
      initial[match[1]][1] = idx
    } else {
      initial[match[1]][0] = idx
    }
  }
})

const top = input.length - 1
const done = (state) => !state.some(([c, g]) => c !== top || g !== top)
const valid = (state) =>
  !state.some(([c, g]) => c !== g && state.some(([, g1]) => c === g1))
const hash = (items, elv) =>
  JSON.stringify([
    [...items].sort((a, b) => `${a[0]}${a[1]}`.localeCompare(`${b[0]}${b[1]}`)),
    elv,
  ])
const parse = (string) => JSON.parse(string)
const clone = (arr) => [...arr.map((e) => [...e])]
const moveC = (state, elv, idx, inc, nQue, movables) => {
  const nState = clone(state)
  const nElv = elv + inc
  nState[idx][0] += inc
  push(nQue, nState, nElv)
  if (movables[idx][1] !== -1) {
    const nStateG = clone(nState)
    nStateG[idx][1] += inc
    push(nQue, nStateG, nElv)
  }
  movables
    .filter(([c], jdx) => c !== -1 && jdx !== idx)
    .forEach(([c]) => {
      const nStateC = clone(nState)
      nStateC[c][0] += inc
      push(nQue, nStateC, nElv)
    })
}
const moveG = (state, elv, idx, inc, nQue, movables) => {
  const nState = clone(state)
  const nElv = elv + inc
  nState[idx][1] += inc
  push(nQue, nState, nElv)
  movables
    .filter(([, g], jdx) => g !== -1 && jdx !== idx)
    .forEach(([, g]) => {
      const nStateG = clone(nState)
      nStateG[g][1] += inc
      push(nQue, nStateG, nElv)
    })
}
const push = (que, state, elv) => {
  if (!tested.has((hsh = hash(state, elv))) && valid(state, elv)) {
    que.push(hsh)
    tested.add(hsh)
  }
}

initial = Object.values(initial)
const tested = new Set()
let que = [hash(initial, 0)]
let i = 0
let result

const go = () => {
  main: while (que.length) {
    const nQue = []
    for (const hsh of que) {
      const [state, elv] = parse(hsh)
      if (done(state)) {
        result = i
        break main
      }
      const movables = state.map(([c, g], idx) => [
        c === elv ? idx : -1,
        g === elv ? idx : -1,
      ])
      movables.forEach(([c, g], idx) => {
        if (c !== -1) {
          if (elv < top) moveC(state, elv, idx, 1, nQue, movables)
          if (elv > 0) moveC(state, elv, idx, -1, nQue, movables)
        }
        if (g !== -1) {
          if (elv < top) moveG(state, elv, idx, 1, nQue, movables)
          if (elv > 0) moveG(state, elv, idx, -1, nQue, movables)
        }
      })
    }
    que = nQue
    i++
  }
}
go()
const resultA = result

tested.clear()
initial.push([0, 0], [0, 0])
que = [hash(initial, 0)]
i = 0
go()
const resultB = result

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
