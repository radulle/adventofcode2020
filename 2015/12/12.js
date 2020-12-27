console.time()
const { assert } = require("console")
const fs = require("fs")

let data = JSON.parse(fs.readFileSync("data.txt", "utf8").trim())

function sumA(obj) {
  let sum = 0
  function sumObj(obj) {
    for (var i in obj) {
      if (obj[i] != null && typeof obj[i] === "object") sumObj(obj[i])
      else if (typeof obj[i] === "number") sum += obj[i]
    }
  }
  sumObj(obj)
  return sum
}

function sumB(obj) {
  let sum = 0
  function sumObj(obj) {
    if (
      typeof obj === "object" &&
      !Array.isArray(obj) &&
      Object.values(obj).includes("red")
    )
      return
    for (var i in obj) {
      if (obj[i] != null && typeof obj[i] === "object") sumObj(obj[i])
      else if (typeof obj[i] === "number") sum += obj[i]
    }
  }
  sumObj(obj)
  return sum
}

const resultA = sumA(data)
const resultB = sumB(data)
console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

const test = () => {
  assert(sumA([]) === 0)
  assert(sumA({}) === 0)
  assert(sumA([1, 2, 3]) === 6)
  assert(sumA({ a: 1, b: 2, c: 3 }) === 6)
  assert(sumA([[[3]]]) === 3)
  assert(sumA({ a: { b: 4 }, c: -1 }) === 3)
  assert(sumA({ a: [-1, 1] }) === 0)
  assert(sumA([-1, { a: 1 }]) === 0)
  assert(sumB([]) === 0)
  assert(sumB({}) === 0)
  assert(sumB([1, 2, 3]) === 6)
  assert(sumB({ a: 1, b: 2, c: 3 }) === 6)
  assert(sumB([[[3]]]) === 3)
  assert(sumB({ a: { b: 4 }, c: -1 }) === 3)
  assert(sumB({ a: [-1, 1] }) === 0)
  assert(sumB([-1, { a: 1 }]) === 0)
  assert(sumB([1, { c: "red", b: 2 }, 3]) === 4)
  assert(sumB({ d: "red", e: [1, 2, 3, 4], f: 5 }) === 0)
  assert(sumB([1, "red", 5]) === 6)
}
test()
