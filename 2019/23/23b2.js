const fs = require("fs")
const intCode = require("../intCode")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

const program = getData("data.txt", "utf8").split(",").map(Number)

const run = function* (endEarly) {
  const network = new Array(50).fill().map((_, i) => ({
    nic: intCode([...program], [], false),
    inputs: [i],
    outputs: [],
  }))
  network.forEach((c) => c.nic.next())
  let idle = false
  let nat = []

  while (true) {
    for (const { nic, inputs, outputs } of network) {
      const { value } = nic.next(inputs[0] ?? -1)
      if (value == null) {
        if (!inputs.length && index === 0) idle = true
        else if (inputs.length) idle = false
        if (idle && index === network.length - 1) {
          const [x, y] = nat
          yield y
          network[0].inputs.push(x, y)
          nat = []
          idle = false
        }
        inputs.shift()
      } else {
        outputs.push(value)
        idle = false
      }
  
      if (outputs.length === 3) {
        const [address, x, y] = outputs
        if (address === 255) {
          if (endEarly) return yield y
          nat = [x, y]
        } else network[address].inputs.push(x, y)
        network[index].outputs = []
      }

    }

   
  }
}

console.info(
  (() => {
    const natHistory = new Set()
    for (const y of run()) {
      if (natHistory.has(y)) return "First repeating Y value sent by NAT: " + y
      natHistory.add(y)
    }
  })()
)
