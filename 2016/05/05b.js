const fs = require("fs")
var crypto = require("crypto")
console.time()

const data = fs.readFileSync("data.txt", "utf8").trim()

let i = 0
let resultB = new Array(8).fill(".")
while (resultB.includes(".")) {
  const md5 = crypto
    .createHash("md5")
    .update(data + i)
    .digest("hex")
  if (md5.slice(0, 5) === "00000") {
    if (
      /[0-7]/.test(md5.slice(5, 6)) &&
      resultB[Number(md5.slice(5, 6))] === "."
    )
      resultB[Number(md5.slice(5, 6))] = md5.slice(6, 7)
    console.info(md5, resultB.join(""))
  }
  i++
}

resultB = resultB.join("")

console.info("\nSolution B:")
console.info(resultB, "\n")

console.timeEnd()
