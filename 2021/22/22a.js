const { input, consoleTime } = require("lib");

consoleTime(() => {
  const instructions = [
    ...input.matchAll(
      /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g
    ),
  ].map(([_, state, xMin, xMax, yMin, yMax, zMin, zMax]) => ({
    state: state === "on" ? 1 : 0,
    xMin: +xMin,
    xMax: +xMax,
    yMin: +yMin,
    yMax: +yMax,
    zMin: +zMin,
    zMax: +zMax,
  }));

  const set = new Set();

  const hash = (x, y, z) => x + "," + y + "," + z;

  for (const { state, xMin, xMax, yMin, yMax, zMin, zMax } of instructions) {
    for (let x = Math.max(xMin, -50); x <= Math.min(xMax, 50); x++) {
      for (let y = Math.max(yMin, -50); y <= Math.min(yMax, 50); y++) {
        for (let z = Math.max(zMin, -50); z <= Math.min(zMax, 50); z++) {
          if (state === 1) {
            set.add(hash(x, y, z));
          } else {
            set.delete(hash(x, y, z));
          }
        }
      }
    }
  }

  return set.size;
});
