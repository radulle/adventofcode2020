const fs = require("fs")
console.time()

const boss = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((e) => Number(e.split(": ")[1]))

function play([hitA, atkA, defA], [hitB, atkB, defB]) {
  while (true) {
    if ((hitB -= Math.max(atkA - defB, 1)) <= 0) return 0
    if ((hitA -= Math.max(atkB - defA, 1)) <= 0) return 1
  }
}

const weapons = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
]

const armors = [
  [0, 0, 0],
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
]

const rings = [
  [0, 0, 0],
  [25, 1, 0],
  [50, 2, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3],
]

let min = Infinity
let max = 0
for (let w = 0; w < weapons.length; w++) {
  for (let a = 0; a < armors.length; a++) {
    for (let l = 0; l < rings.length; l++) {
      for (let r = 0; r < rings.length; r++) {
        if (l === r) continue
        const atk = weapons[w][1] + rings[l][1] + rings[r][1]
        const def = armors[a][2] + rings[l][2] + rings[r][2]
        const cost =
          weapons[w][0] +
          armors[a][0] +
          rings[l][0] +
          rings[r][0]
        if (!play([100, atk, def], boss)) {
          if (cost < min) min = cost
        } else {
          if (cost > max) max = cost
        }
      }
    }
  }
}

const resultA = min
const resultB = max

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB)
console.timeEnd()
