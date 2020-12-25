console.time()
const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8").split("")

function move(posStr, dir) {
  pos = posStr.split(",").map(Number)
  switch (dir) {
    case "^":
      return [pos[0] - 1, pos[1]].join(",")
    case "v":
      return [pos[0] + 1, pos[1]].join(",")
    case ">":
      return [pos[0], pos[1] + 1].join(",")
    case "<":
      return [pos[0], pos[1] - 1].join(",")
  }
}

const visited = new Set()
let positionA = "0,0"
let positionB = "0,0"
visited.add("0,0")
data.forEach((instruction, index) => {
  if (index % 2) {
    positionA = move(positionA, instruction)
    visited.add(positionA)
  } else {
    positionB = move(positionB, instruction)
    visited.add(positionB)
  }
})

const result = visited.size

console.info("Solution:")
console.info(result, "\n")
console.timeEnd()
