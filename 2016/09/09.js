const { assert } = require("console")
const fs = require("fs")
console.time()

const input = fs.readFileSync("data.txt", "utf8").trim().replace(/ /g, "")

const regExp = /\((\d+)x(\d+)\)(?=(.*))/

let output = "",
  rest = input,
  match
while ((match = regExp.exec(rest))) {
  output +=
    rest.slice(0, match.index) + match[3].slice(0, match[1]).repeat(match[2])
  rest = match[3].slice(match[1])
}
output += rest
let resultA = output.length

function decompress(str, n = 1) {
  const match = regExp.exec(str)
  if (!match) {
    return str.length * n
  }
  return (
    n *
    (match.index +
      decompress(match[3].slice(0, +match[1]), +match[2]) +
      decompress(match[3].slice(+match[1])))
  )
}
const resultB = decompress(input)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

assert(decompress("(3x3)XYZ") === 9)
assert(decompress("X(8x2)(3x3)ABCY") === "XABCABCABCABCABCABCY".length, "asd")
assert(decompress("(27x12)(20x12)(13x14)(7x10)(1x12)A") === 241920)
assert(
  decompress("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN") === 445
)
