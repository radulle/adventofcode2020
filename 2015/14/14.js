const fs = require("fs")

console.time()
const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .replace(
    /can fly | km\/s for| seconds, but then must rest for| seconds./g,
    ""
  )
  .split("\n")
  .map((row) => row.split(" "))
  .map(([reindeer, speed, duration, rest]) => ({
    reindeer,
    speed: Number(speed),
    duration: Number(duration),
    rest: Number(rest),
  }))

const limit = 2503
const resultA = data
  .map((stats) => {
    const { reindeer, speed, duration, rest } = stats
    let dist = 0
    let time = limit
    while (time >= duration) {
      dist += speed * duration
      time -= duration + rest
    }
    dist += time * speed
    return { ...stats, dist }
  })
  .sort((a, b) => b.dist - a.dist)[0].dist

const resultB = data
  .map((stats) => {
    const { speed, duration, rest } = stats
    let race = []
    for (let time = 1; time < limit + 1; time++) {
      const mod = time % (duration + rest)
      if (mod <= duration && mod !== 0)
        race.push((race[race.length - 1] || 0) + speed)
      else {
        race.push(race[race.length - 1])
      }
    }
    return { ...stats, race }
  })
  .map((stats, _, arr) => {
    const { race } = stats
    let points = 0
    race.forEach((dist, idx) => {
      if (arr.some(({ race: raceB }) => raceB[idx] > dist)) return
      points++
    })
    return { ...stats, points }
  })
  .sort((a, b) => b.points - a.points)[0].points

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
