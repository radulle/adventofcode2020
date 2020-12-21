console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

function parseData(data) {
  const split = data
    .replace(/\r\n/g, "\n")
    .replace(/contains /g, "")
    .replace(/\)/g, "")
    .split(/\n/g)
    .map((part) => part.split(" ("))
    .map((row) => ({ food: row[0].split(" "), ingr: row[1].split(", ") }))
  return split
}

const data = parseData(getData("data.txt"))

const allergens = new Map()

new Set(data.flatMap((e) => e.ingr)).forEach((e) => allergens.set(e, []))

data.forEach((row) => {
  row.ingr.forEach((allergen) => {
    if (!allergens.get(allergen).length) {
      allergens.set(allergen, row.food)
    }
    allergens.set(
      allergen,
      allergens.get(allergen).filter((e) => row.food.includes(e))
    )
  })
})

function clean() {
  const allergenFoods = [...allergens]
    .filter((e) => e[1].length === 1)
    .flatMap((e) => e[1])
  allergens.forEach((val, key) =>
    allergens.set(
      key,
      val.length === 1 ? val : val.filter((e) => !allergenFoods.includes(e))
    )
  )
}

while ([...allergens.values()].some((e) => e.length !== 1)) {
  clean()
}

const result = [...allergens.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map((cur) => cur[1])
  .join(",")

console.info()
console.info("Solution:")
console.info(result)
console.info()
console.timeEnd()
