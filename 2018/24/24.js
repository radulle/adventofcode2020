const fs = require("fs")
console.time()

const groups = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n\r?\n/)
  .map((e, i) =>
    [
      ...e.matchAll(
        /(\d+) units each with (\d+) hit points (?:\((.+)\) )?with an attack that does (\d+) (\w+) damage at initiative (\d+)/g
      ),
    ].map(([_, units, hp, spec, attPower, attType, initiative], j) => {
      let weak = [],
        immune = []
      spec
        ?.trim()
        .split(";")
        .forEach((s) => {
          const match = s.matchAll(/(\w+) to (.+)/g).next().value
          if (match) {
            if (match[1] === "weak") weak = match[2].split(", ")
            if (match[1] === "immune") immune = match[2].split(", ")
          }
        })
      return {
        team: i === 0 ? "immune" : "infection",
        units: +units,
        hp: +hp,
        weak,
        immune,
        attPower: +attPower,
        attType,
        initiative: +initiative,
      }
    })
  )
  .flat()

function copy(groups) {
  return JSON.parse(JSON.stringify(groups))
}

function battle(groups) {
  let targets = []
  let round = 0
  while (true) {
    // targeting
    groups.sort(
      (a, b) =>
        b.attPower * b.units - a.attPower * a.units ||
        b.initiative - a.initiative
    )
    for (const attacker of groups) {
      if (!attacker.units) continue
      let defenders = groups.filter(
        (defender) =>
          attacker.team !== defender.team &&
          defender.units &&
          !targets.includes(defender) &&
          !defender.immune.includes(attacker.attType)
      )
      if (!defenders.length) continue
      const weak = defenders.filter((defender) =>
        defender.weak.includes(attacker.attType)
      )
      if (weak.length) defenders = weak
      defenders.sort(
        (a, b) =>
          b.attPower * b.units - a.attPower * a.units ||
          b.initiative - a.initiative
      )
      const target = defenders[0]
      target.attacker = attacker
      targets.push(target)
    }
    if (!targets.length) break

    // attack
    targets.sort((a, b) => b.attacker.initiative - a.attacker.initiative)
    let kills = 0
    for (const target of targets) {
      if (!target.attacker.units) continue
      const damage =
        target.attacker.attPower *
        target.attacker.units *
        (target.weak.includes(target.attacker.attType) ? 2 : 1)
      const kill = Math.floor(damage / target.hp)
      kills += kill
      target.units = Math.max(0, target.units - kill)
      target.attacker = null
    }
    if (kills === 0) return null
    targets.length = 0
    round++
  }
  return groups.reduce(
    (acc, { team, units }) => {
      acc[team] += units
      return acc
    },
    { immune: 0, infection: 0 }
  )
}

const resultA = battle(copy(groups))

let boost = 1,
  resultB
while (true) {
  resultB = battle(
    copy(groups).map((group) => {
      if (group.team === "immune") group.attPower += boost
      return group
    })
  )
  if (resultB?.immune) break
  boost++
}

console.info("\nSolution A:\n")
console.info(resultA.infection, "\n")
console.info("Solution B:\n")
console.info(resultB.immune, "\n")
console.timeEnd()
