const fs = require("fs")
console.time()

const sort = (a, b) => a.time - b.time
const log = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/\[(.+)\] (falls|wakes|Guard) (?:#(\d+))?/g),
]
  .map(([_, time, act, guard]) => ({
    guard,
    time: new Date(time),
    act,
  }))
  .sort(sort)

const guards = {}
let start, current
for (const { act, time, guard } of log) {
  if (guard) {
    if (!guards[guard]) {
      guards[guard] = {}
      guards[guard].sleep = 0
      guards[guard].slots = Array(60).fill(0)
    }
    current = guards[guard]
    continue
  }
  if (act === "falls") {
    start = time.getMinutes()
    continue
  }
  if (act === "wakes") {
    const end = time.getMinutes()
    current.sleep += end - start
    for (let min = start; min < end; min++) {
      current.slots[min]++
    }
  }
}

const sleepiestGuard = Object.entries(guards).reduce(
  (acc, [id, { sleep, slots }]) => {
    if (sleep > acc.sleep) return { id, sleep, slots }
    return acc
  },
  { sleep: 0 }
)

const resultA =
  sleepiestGuard.slots.reduce(
    (acc, cur, idx) => {
      if (cur > acc[1]) {
        return [idx, cur]
      }
      return acc
    },
    [0, 0]
  )[0] * +sleepiestGuard.id

const reliableGuard = Object.entries(guards).reduce(
  (acc, [id, { sleep, slots }]) => {
    const max = Math.max(...slots)
    if (max > acc.max) return { id, sleep, slots, max }
    return acc
  },
  { max: 0 }
)

const resultB =
  reliableGuard.slots.findIndex((e) => e === reliableGuard.max) *
  +reliableGuard.id

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
