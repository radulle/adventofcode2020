const fs = require("fs")
const intCode = require("../intCode")

const program = fs.readFileSync("data.txt", "utf8").split(",").map(Number)

area = 50

const matrix = new Array(area).fill(null).map(() => new Array(area).fill(0))

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    matrix[row][col] = intCode.eval([...program], [col, row])
  }
}

const drawing = matrix.map((row) => row.join("")).join("\n")

console.info(drawing)
console.info(drawing.match(/1/g).length)
