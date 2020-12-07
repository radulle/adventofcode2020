const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .split("\r\n")
    .map((row) =>
      row.split(" => ").map((e) =>
        e.split(", ").map((q) => ({
          amt: Number(q.split(" ")[0]),
          mat: q.split(" ")[1],
        }))
      )
    )
    .map((e) => ({ res: e[1][0], ing: e[0] }))
  console.infoTime(() => solve(data, 1e12))
} catch (err) {
  console.error(err)
}

function getRequiredOre(data, fuelAmount) {
  const storage = new Map()
  let ore = 0

  function getIngredients(required) {
    if (required.mat === "ORE") {
      ore += required.amt
      return
    }
    if (required.amt === 0) return required
    const reaction = data.find((r) => r.res.mat === required.mat)
    const stored = storage.get(required.mat) || 0
    const missing = required.amt - stored
    const reactions = Math.ceil(missing / reaction.res.amt)
    storage.set(required.mat, reactions * reaction.res.amt - missing)
    return reaction.ing.map((ing) => {
      const amt = ing.amt * reactions
      const { mat } = ing
      return getIngredients({ mat, amt })
    })
  }

  getIngredients({ mat: "FUEL", amt: fuelAmount })
  return ore
}

function solve(data, storedOre) {
  let low = 0
  let high = storedOre
  while (low < high) {
    const mid = Math.ceil((low + high) / 2)
    if (getRequiredOre(data, mid) <= storedOre) {
      low = mid
    } else {
      high = mid - 1
    }
  }
  return [low, high]
}
