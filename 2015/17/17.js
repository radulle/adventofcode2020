const fs = require("fs")

console.time()
const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map(Number)
  .sort((a, b) => a - b)

const total = 150

const combos = new Set()
const tested = new Set()
for (let idx = 0; idx < data.length; idx++) {
  let que = [{ key: idx, vol: data[idx], used: [idx] }]
  for (let jdx = 0; jdx < data.length; jdx++) {
    const newQue = []
    for (const { key, vol, used } of que) {
      for (let kdx = 0; kdx < data.length; kdx++) {
        if (used.includes(kdx)) continue
        const newVolume = vol + data[kdx]
        if (newVolume > total) continue
        const newUsed = [...used, kdx]
        newUsed.sort((a, b) => a - b)
        if (tested.has(newUsed.join(","))) continue
        if (newVolume === total) {
          combos.add(newUsed.join(","))
          continue
        }
        tested.add(newUsed.join(","))
        newQue.push({
          key,
          vol: newVolume,
          used: newUsed,
        })
      }
    }
    que = newQue
  }
}

const resultA = combos.size
const commas = [...combos.values()]
  .map((row) => (row.match(/,/g) || []).length)
  .sort((a, b) => a - b)

let resultB = 0
while (commas[0] === commas[resultB]) {
  resultB++
}

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
