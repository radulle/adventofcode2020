console.time()
const fs = require("fs")
const intCode = require("../intCode")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

const program = getData("data.txt", "utf8").split(",").map(Number)

const network = new Array(50).fill().map(() => intCode(program, [], false))

network.forEach((comp) => console.info(comp.next()))

network.forEach((comp, idx) => console.info(comp.next(idx)))

for (let i = 0; i < 100000; i++) {
  network.forEach((comp) => {
    const response = comp.next(-1)
    if (response.value) console.info(response)
  })
}

console.timeEnd()
