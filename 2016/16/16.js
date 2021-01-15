const fs = require("fs")
console.time()

let input = fs.readFileSync("data.txt", "utf8").trim()

const run = (input, size) => {
  let nHash
  while (input.length < size) {
    input +=
      "0" +
      input
        .split("")
        .reverse()
        .map((c) => (c === "0" ? "1" : "0"))
        .join("")
  }
  hash = input.slice(0, size)
  while (!(hash.length % 2)) {
    nHash = ""
    for (let idx = 0; idx < hash.length; idx += 2) {
      nHash += hash[idx] === hash[idx + 1] ? "1" : "0"
    }
    hash = nHash
  }
  return hash
}

const resultA = run(input, 272)
const resultB = run(input, 35651584)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
