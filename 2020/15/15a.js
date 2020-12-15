const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)

const map = new Map()

for (let i = 0; i < data.length - 1; i++) {
  map.set(data[i], i)
}

let last = data[data.length - 1]
let prev
let result
console.time()
for (let idx = data.length - 1; idx < 2020; idx++) {
  result = last
  prev = map.get(last)
  prev = prev !== undefined ? idx - prev : 0
  map.set(last, idx)
  last = prev
}
console.timeLog()
console.info(result)
console.timeEnd()
