console.time()
const { assert } = require("console")
const fs = require("fs")

let data = fs.readFileSync("data.txt", "utf8").trim()

const abc = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/
const iol = /i|o|l/
function check(string) {
  if (!abc.test(string)) return false
  if (iol.test(string)) return false
  if (new Set(string.match(/(.)\1/g)).size < 2) return false
  return true
}

function increment(str) {
  return (parseInt(str, 36) + 1).toString(36).replace(/0/g, "a")
}

function find(prev) {
  let pass = increment(prev)
  while (!check(pass)) {
    pass = increment(pass)
  }
  return pass
}

const resultA = find(data)
const resultB = find(resultA)
console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

const test = () => {
  assert(check("hijklmmn") === false)
  assert(check("abbceffg") === false)
  assert(check("abbcegjk") === false)
  assert(check("abcdffaa") === true)
  assert(check("ghjaabcc") === true)
  assert(check("vzcaabcc") === true)
  assert(find("abcdefgh") === "abcdffaa")
  assert(find("ghijklmn") === "ghjaabcc")
}
test()
