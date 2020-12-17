const fs = require("fs")
const intCode = require("../intCode")

const program = fs.readFileSync("data.txt", "utf8").split(",").map(Number)

// ( !B | !C ) & D & H ) | !A
const instructions = `NOT B J 
NOT C T
OR T J
AND D J
AND H J
NOT A T
OR T J 
RUN
`

const ascii = instructions.split("").map((e) => e.charCodeAt(0))

const output = [...intCode(program, ascii)]
console.info(output[output.length - 1])
console.info(output.map((cell) => String.fromCharCode(cell)).join(""))