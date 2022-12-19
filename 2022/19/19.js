const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  const blpr = [
    ...input().matchAll(
      /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./g
    ),
  ].map((e) => e.slice(1, 8).map(Number));

  let quality = 0;
  for (let i = 0; i < blpr.length; i++) quality += (i + 1) * sim(24, blpr[i]);
  console.info(quality);

  let prod = 1;
  for (let i = 0; i < 3; i++) prod *= sim(32, blpr[i]);
  console.info(prod);
}

function sim(t, [_, oreOre, oreCla, oreObs, claObs, oreGeo, obsGeo]) {
  let maxGeo = 0;
  const maxOre = Math.max(oreOre, oreCla, oreObs, oreGeo);
  const maxCla = claObs;
  const maxObs = obsGeo;

  function sim(t, ore, cla, obs, geo, oreBot, claBot, obsBot) {
    if (t <= 0) return;
    if (geo > maxGeo) maxGeo = geo;

    if (obsBot > 0) {
      const skip =
        1 +
        (oreGeo <= ore && obsGeo <= obs
          ? 0
          : Math.max(
              Math.ceil((oreGeo - ore) / oreBot),
              Math.ceil((obsGeo - obs) / obsBot)
            ));
      sim(
        t - skip,
        ore + skip * oreBot - oreGeo,
        cla + skip * claBot,
        obs + skip * obsBot - obsGeo,
        geo + t - skip,
        oreBot,
        claBot,
        obsBot
      );
    }

    if (obs < maxObs && claBot > 0) {
      const skip =
        1 +
        (oreObs <= ore && claObs <= cla
          ? 0
          : Math.max(
              Math.ceil((oreObs - ore) / oreBot),
              Math.ceil((claObs - cla) / claBot)
            ));
      sim(
        t - skip,
        ore + skip * oreBot - oreObs,
        cla + skip * claBot - claObs,
        obs + skip * obsBot,
        geo,
        oreBot,
        claBot,
        obsBot + 1
      );
    }

    if (claBot < maxCla) {
      const skip = 1 + (oreCla <= ore ? 0 : Math.ceil((oreCla - ore) / oreBot));
      sim(
        t - skip,
        ore + skip * oreBot - oreCla,
        cla + skip * claBot,
        obs + skip * obsBot,
        geo,
        oreBot,
        claBot + 1,
        obsBot
      );
    }

    if (oreBot < maxOre) {
      const skip = 1 + (oreOre <= ore ? 0 : Math.ceil((oreOre - ore) / oreBot));
      sim(
        t - skip,
        ore + skip * oreBot - oreOre,
        cla + skip * claBot,
        obs + skip * obsBot,
        geo,
        oreBot + 1,
        claBot,
        obsBot
      );
    }
  }

  sim(t, 0, 0, 0, 0, 1, 0, 0);

  return maxGeo;
}
