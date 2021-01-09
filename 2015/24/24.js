const fs = require("fs")
console.time()

const getSum = (arr) => arr.reduce((acc, cur) => acc + cur, 0)
const getMul = (arr) => arr.reduce((acc, cur) => acc * cur, 1)

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map(Number)

function getSums(numbers, target) {
  let length = Infinity
  const combos = []
  numbers.sort((a, b) => b - a)
  function getSums(numbers, target, combo) {
    const sum = getSum(combo)

    if (combo.length > length || sum > target) return

    if (sum === target) {
      if (combo.length < length) {
        combos.length = 0
        length = combo.length
        combos.push(combo)
        return
      }
      if (combo.length === length) {
        combos.push.partial
        return
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      getSums(numbers.slice(i + 1), target, [...combo, numbers[i]])
    }
  }

  getSums(numbers, target, [])
  return combos
}

const sumsA = getSums(data, getSum(data) / 3)
const resultA = sumsA.map((sum) => getMul(sum))

const sumsB = getSums(data, getSum(data) / 4)
const resultB = sumsB.map((sum) => getMul(sum))

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
