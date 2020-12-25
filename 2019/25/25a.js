const readline = require("readline")
const fs = require("fs")
const intCode = require("../intCode")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const program = fs.readFileSync("data.txt", "utf8").split(",").map(Number)

const toAscii = (ans) => ans.split("").map((e) => e.charCodeAt(0))

const game = intCode(program)
const que = []

console.info(question())

rl.on("line", (input) => {
  que.push(...toAscii(input), 10)
  console.info(question())
})

function question() {
  let output = ""
  while (true) {
    const char = game.next(que.shift()).value
    if (char === undefined && !que.length) break
    output += String.fromCharCode(char)
  }
  return output
}

/*
To pass the door you need:
- astronaut ice cream
- easter egg
- dark matter
- weather machine
 */
