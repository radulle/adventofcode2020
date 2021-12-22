const { input, consoleTime } = require("lib");

consoleTime(() => {
  const instructions = [
    ...input.matchAll(
      /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g
    ),
  ].map((row) => [...row.slice(2, 8), row[1] === "on" ? 1 : 0].map(Number));

  const map = [], nMap = [], max = Math.max, min = Math.min;

  for (const [ xMin1, xMax1, yMin1, yMax1, zMin1, zMax1, s1, ] of instructions) {
    for (const [xMin2, xMax2, yMin2, yMax2, zMin2, zMax2, s2] of map) {
      const xMin = max(xMin1, xMin2), xMax = min(xMax1, xMax2);
      if (xMin > xMax) continue;
      const yMin = max(yMin1, yMin2), yMax = min(yMax1, yMax2);
      if (yMin > yMax) continue;
      const zMin = max(zMin1, zMin2), zMax = min(zMax1, zMax2);
      if (zMin > zMax) continue;
      nMap.push([xMin, xMax, yMin, yMax, zMin, zMax, s2 === 1 ? 0 : 1]);
    }
    map.push(...nMap);
    nMap.length = 0;
    if (s1) map.push([xMin1, xMax1, yMin1, yMax1, zMin1, zMax1, 1]);
  }

  return map.reduce((acc, [x1, x2, y1, y2, z1, z2, s]) => 
    acc + (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1) * (s === 1 ? 1 : -1)
  , 0);
});
