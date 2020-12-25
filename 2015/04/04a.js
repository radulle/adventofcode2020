console.time()
const fs = require("fs")
var crypto = require("crypto")

const data = fs.readFileSync("data.txt", "utf8")

let i = 0
while (
  crypto
    .createHash("md5")
    .update(data + i)
    .digest("hex")
    .slice(0, 5) !== "00000"
) {
  i++
}
const result = i

console.info("Solution:")
console.info(result, "\n")
console.timeEnd()
