console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

const neighbors = (data, pos) =>
  [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ].reduce(
    (acc, cur) => acc + (data[pos[0] + cur[0]]?.[pos[1] + cur[1]] ? 1 : 0),
    0
  )

function parseData(data) {
  return data
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((row) => row.split("").map((e) => (e === "#" ? 1 : 0)))
}

const data = parseData(getData("data-test.txt"))

let state = data
let count
const history = new Set()
while (true) {
  const temp = new Array(state.length)
    .fill()
    .map((_, i) => new Array(state[i].length).fill(0))
  for (let idx = 0; idx < state.length; idx++) {
    for (let jdx = 0; jdx < state[idx].length; jdx++) {
      count = neighbors(state, [idx, jdx])
      if (state[idx][jdx]) {
        if (count === 1) temp[idx][jdx] = 1
        continue
      }
      if (count === 1 || count === 2) temp[idx][jdx] = 1
    }
  }
  state = temp
  const hash = temp
    .map((row) => row.map((e) => (e ? "#" : ".")).join(""))
    .join("\n")
  if (history.has(hash)) {
    console.info("\n" + hash)
    break
  }
  history.add(hash)
}

const result = state
  .flat()
  .reduce((acc, cur, idx) => acc + Math.pow(2, idx) * cur, 0)

console.info()
console.info("Solution:")
console.info(result)
console.info()
console.timeEnd()
