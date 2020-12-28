const fs = require("fs")
console.time()

let data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split("").map((e) => (e === "#" ? 1 : 0)))

const resultA = convey(data, 100).flat(Infinity).reduce(sum)

const mod = (data) => {
  const max = data.length - 1
  data[0][0] = 1
  data[max][0] = 1
  data[0][max] = 1
  data[max][max] = 1
  return data
}

const resultB = convey(data, 100, mod).flat(Infinity).reduce(sum)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

function sum(acc, cur) {
  return acc + cur
}
function count(lights, y, x) {
  let num = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      num += lights[y + i]?.[x + j] || 0
    }
  }
  num -= lights[y][x]
  return num
}

function newState(size) {
  return new Array(size).fill(null).map(() => new Array(size).fill(0))
}

function convey(data, cycles, mod = (data) => data) {
  const size = data.length
  let lights = mod(data)
  for (let idx = 0; idx < cycles; idx++) {
    let newLights = newState(size)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cnt = count(lights, i, j)
        if (lights[i][j] === 1) {
          if (cnt === 2 || cnt === 3) {
            newLights[i][j] = 1
            continue
          }
          newLights[i][j] = 0
          continue
        }
        if (cnt === 3) newLights[i][j] = 1
      }
    }
    lights = mod(newLights)
  }
  return lights
}
