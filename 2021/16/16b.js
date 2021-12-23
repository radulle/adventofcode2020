const { input, consoleTime } = require("lib");

function hex2bin(hex) {
  const table = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let bin = "";
  for (const c of hex) {
    bin += table[c];
  }
  return bin;
}

function bin2dec(bin) {
  return parseInt(bin, 2);
}

function solve(data) {
  const bin = hex2bin(data);

  function parse(bin) {
    const v = bin2dec(bin.slice(0, 3));
    const t = bin2dec(bin.slice(3, 6));
    let i = 6;
    let l = "";
    let dec;

    if (t === 4) {
      while (true) {
        l += bin.slice(i + 1, i + 5);
        if (bin[i] !== "1") {
          i += 5;
          break;
        }
        i += 5;
      }
      dec = bin2dec(l);
    } else {
      const args = [];
      if (bin[i] === "0") {
        const bits = bin2dec(bin.slice(i + 1, i + 16));
        i += 16;
        const I = i + bits;
        while (i < I) {
          const res = parse(bin.slice(i, I));
          args.push(res);
          i += res.i;
        }
      } else {
        let sub = 0;
        const subs = bin2dec(bin.slice(i + 1, i + 12));
        i += 12;
        while (sub < subs) {
          const res = parse(bin.slice(i));
          args.push(res);
          i += res.i;
          sub++;
        }
      }

      switch (t) {
        case 0:
          dec = args.reduce((acc, { dec }) => acc + dec, 0);
          break;
        case 1:
          dec = args.reduce((acc, { dec }) => acc * dec, 1);
          break;
        case 2:
          dec = args.reduce(
            (acc, { dec }) => (acc > dec ? dec : acc),
            Infinity
          );
          break;
        case 3:
          dec = args.reduce(
            (acc, { dec }) => (acc < dec ? dec : acc),
            -Infinity
          );
          break;
        case 5:
          dec = args[0].dec > args[1].dec ? 1 : 0;
          break;
        case 6:
          dec = args[0].dec < args[1].dec ? 1 : 0;
          break;
        case 7:
          dec = args[0].dec === args[1].dec ? 1 : 0;
          break;
      }
    }

    return { v, t, dec, i };
  }

  return parse(bin).dec;
}

consoleTime(() => solve(input()));
