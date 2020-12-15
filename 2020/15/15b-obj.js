const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)

console.time()
const target = 3e7
const map = new Object()

for (let i = 0; i < data.length - 1; i++) {
  map[data[i]] = i
}

let last = data[data.length - 1]
let prev
let result
for (let idx = data.length - 1; idx < target; idx++) {
  result = last
  prev = map[last]
  prev = prev !== undefined ? idx - prev : 0
  map[last] = idx
  last = prev
}
console.timeLog()
console.info(result)
console.timeEnd()
