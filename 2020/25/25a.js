console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

function parseData(data) {
  return data.replace(/\r\n/g, "\n").split("\n").map(Number)
}

function transform(pubKey, loopSize) {
  let number = 1
  for (let i = 0; i < loopSize; i++) {
    number = (number * pubKey) % 20201227
  }
  return number
}

function getLoopSize(pubKey) {
  let number = 1
  let loop = 0
  while (number !== pubKey) {
    number = (number * 7) % 20201227
    loop++
  }
  return loop
}

{
  const pubKeys = parseData(getData("data-test.txt"))
  const loopSizes = pubKeys.map(getLoopSize).reverse()
  const encKeys = pubKeys.map((e, i) => transform(e, loopSizes[i]))
  console.info("Test:")
  console.info(encKeys)
}
console.info()
{
  const pubKeys = parseData(getData("data.txt"))
  const loopSizes = pubKeys.map(getLoopSize).reverse()
  const encKeys = pubKeys.map((e, i) => transform(e, loopSizes[i]))
  console.info("Solution:")
  console.info(encKeys)
}
console.info()
console.timeEnd()
