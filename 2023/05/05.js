const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(...parse(input, 0)), process(...parse(input, 1))];
}

function parse(input, part) {
  input = input.split("\n\n");

  const seeds = [];
  let _seeds = input
    .shift()
    .split(/ +/)
    .slice(1)
    .map((e) => +e);
  seeds.push(_seeds.map((e) => [e, e + 1]));
  seeds.push([]);
  for (let i = 0; i < _seeds.length - 1; i += 2) {
    seeds[1].push([_seeds[i], _seeds[i] + _seeds[i + 1]]);
  }

  const transforms = [];
  input.forEach((section) => {
    let [, numbers] = section.trim().split(/: ?\n?/);
    numbers = numbers.split("\n").map((e) =>
      e
        .trim()
        .split(/ +/)
        .map((e) => +e)
    );
    numbers = numbers.map((e) => [[e[1], e[1] + e[2]], (n) => n - e[1] + e[0]]);
    transforms.push(numbers);
  });

  return [seeds[part], transforms];
}

function process(seeds, transforms) {
  for (let i = 0; i < transforms.length; i++) {
    const nSeeds = [];
    for (let j = 0; j < seeds.length; j++) {
      let [bot, top] = seeds[j];
      const intersections = [];
      for (let k = 0; k < transforms[i].length; k++) {
        const [[bot1, top1], transform] = transforms[i][k];
        if (bot > top1 || top < bot1) continue;
        if (bot >= bot1) {
          if (top <= top1)
            intersections.push([bot, top]),
              nSeeds.push([transform(bot), transform(top)]);
          else
            intersections.push([bot, top1]),
              nSeeds.push([transform(bot), transform(top1)]);
        } else {
          if (top <= top1)
            intersections.push([bot1, top]),
              nSeeds.push([transform(bot1), transform(top)]);
          else
            intersections.push([bot1, top1]),
              nSeeds.push([transform(bot1), transform(top1)]);
        }
      }
      if (intersections.length) {
        intersections.sort((a, b) => a[0] - b[0]);
        if (intersections[0][0] > bot)
          nSeeds.push([bot, intersections[0][0] - 1]);
        if (intersections[intersections.length - 1][1] < top)
          nSeeds.push([intersections[intersections.length - 1][1] + 1, top]);
        for (let k = 0; k < intersections.length - 2; k++)
          if (intersections[k + 1][0] - intersections[k][1] > 1)
            nSeeds.push([intersections[k][1] + 1, intersections[k + 1][0] - 1]);
      } else nSeeds.push([bot, top]);
    }
    seeds = nSeeds;
  }
  return Math.min(...seeds.map((e) => e[0]));
}
