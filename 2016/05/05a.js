const fs = require("fs")
var crypto = require("crypto")
console.time()

const data = fs.readFileSync("data.txt", "utf8").trim()

let i = 0
let resultA = ""
while (resultA.length !== 8) {
  const md5 = crypto
    .createHash("md5")
    .update(data + i)
    .digest("hex")
  if (md5.slice(0, 5) === "00000") {
    resultA += md5.slice(5, 6)
    console.info(md5)
  }
  i++
}

console.info("\nSolution A:")
console.info(resultA, "\n")

console.timeEnd()
