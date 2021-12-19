const { input, consoleTime } = require("lib");

// parse
let data = [];
{
  let scanner = -1;
  for (const row of input.split("\n")) {
    if (row[0] === undefined) continue;
    const beacon = row.split(",").map(Number);
    if (beacon.length === 3) {
      data[scanner].push(beacon);
      continue;
    }
    scanner++;
    data.push([]);
  }
}

consoleTime(() => {
  const cos = Math.cos;
  const sin = Math.sin;
  const Rx = (a) => [
    [1, 0, 0],
    [0, cos(a), -sin(a)],
    [0, sin(a), cos(a)],
  ];
  const Ry = (a) => [
    [cos(a), 0, sin(a)],
    [0, 1, 0],
    [-sin(a), 0, cos(a)],
  ];
  const Rz = (a) => [
    [cos(a), -sin(a), 0],
    [sin(a), cos(a), 0],
    [0, 0, 1],
  ];
  const o = Math.PI / 2;

  /** multiply matrices */
  let multiply = (A, B, threshold = 1e-9) =>
    A.map((row, i) =>
      B[0].map((_, j) =>
        row.reduce((acc, _, n) => {
          const res = A[i][n] * B[n][j];
          if (Math.abs(res) < threshold) return acc;
          return acc + res;
        }, 0)
      )
    );

  /** 3d transformation matrices */
  let transform;
  {
    const set = new Set();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          set.add(
            JSON.stringify(multiply(Rx(i * o), multiply(Ry(j * o), Rz(k * o))))
          );
        }
      }
    }
    transform = [...set].map((e) => JSON.parse(e));
  }

  /** transpose 2d matrix [[]] */
  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  const beacons = data.shift();
  const scanners = [[0, 0, 0]];
  data = data.map((row) =>
    transform.map((t) =>
      row.map((v) => transpose(multiply(t, transpose([v])))[0])
    )
  );

  while (data.length) {
    for (let i = 0; i < data.length; i++) {
      const scans = data[i];
      for (let j = 0; j < scans.length; j++) {
        const dists = {};
        const scan = scans[j];
        for (let k = 0; k < scan.length; k++) {
          const beaconS = scan[k];
          for (let l = 0; l < beacons.length; l++) {
            const beacon = beacons[l];
            const dist = beacon.reduce(
              (acc, cur, m) => acc + "," + (cur - beaconS[m]),
              ""
            );
            dists[dist] = (dists[dist] || 0) + 1;
          }
        }
        if (Math.max(...Object.values(dists)) > 11) {
          const [x, y, z] = Object.entries(dists)
            .find(([_, c]) => c > 11)[0]
            .slice(1)
            .split(",")
            .map(Number);
          scanners.push([x, y, z]);
          scan.forEach(([dx, dy, dz]) => {
            const beacon = [x + dx, y + dy, z + dz];
            if (
              !beacons.some(
                (e) =>
                  e[0] === beacon[0] && e[1] === beacon[1] && e[2] === beacon[2]
              )
            )
              beacons.push(beacon);
          });
          data.splice(i, 1);
        }
      }
      data[i];
    }
  }

  const manhattan = scanners.flatMap(([x, y, z]) =>
    scanners.map(
      ([x1, y1, z1]) => Math.abs(x - x1) + Math.abs(y - y1) + Math.abs(z - z1)
    )
  );

  return [beacons.length, Math.max(...manhattan)];
});
