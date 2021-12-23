const { input, consoleTime } = require("lib");

const data = input().split("\n");

function parse(slug) {
  return [...slug.matchAll(/(\d+)|(,)|(\[)|(\])/g)];
}

function split(slug) {
  slug.match(/(\d{2})/);
  const match = slug.match(/\d{2}/);
  if (!match) return null;
  const number = Number(match[0]);
  const index = match.index;
  return (
    slug.substring(0, index) +
    "[" +
    Math.floor(number / 2) +
    "," +
    Math.ceil(number / 2) +
    "]" +
    slug.substring(index + 2)
  );
}

function add(...args) {
  let sum = args[0];
  for (let i = 1; i < args.length; i++) {
    sum = `[${sum},${args[i]}]`;
    while (true) {
      const exploded = explode(sum);
      if (exploded) {
        sum = exploded;
        continue;
      }
      const splitted = split(sum);
      if (splitted) {
        sum = splitted;
        continue;
      }
      break;
    }
  }
  return sum;
}

function explode(slug) {
  const parsed = parse(slug);
  let depth = 0;
  for (let i = 0; i < parsed.length; i++) {
    if (parsed[i][3] !== undefined) {
      depth++;
      if (depth > 4) {
        const left = Number(parsed[i + 1][0]);
        const right = Number(parsed[i + 3][0]);
        left: for (let j = i - 1; j >= 0; j--) {
          if (parsed[j][1] !== undefined) {
            parsed[j][0] = Number(parsed[j][0]) + left;
            break left;
          }
        }
        right: for (let j = i + 5; j < parsed.length; j++) {
          if (parsed[j][1] !== undefined) {
            parsed[j][0] = Number(parsed[j][0]) + right;
            break right;
          }
        }
        return parsed.reduce((acc, [cur], k) => {
          if (k < i || k > i + 4) return acc + cur;
          if (k === i) return acc + "0";
          return acc;
        }, "");
      }
    }
    if (parsed[i][4] !== undefined) {
      depth--;
    }
  }
  return null;
}

function magnitude(slug) {
  while (isNaN(slug)) {
    slug = slug.replace(
      /\[(\d+),(\d+)\]/g,
      (_, a, b) => 3 * Number(a) + 2 * Number(b)
    );
  }
  return slug;
}

consoleTime(() => Number(magnitude(add(...data))));

consoleTime(() => {
  let max = -Infinity;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (i === j) continue;
      const m = Number(magnitude(add(data[i], data[j])));
      if (max < m) max = m;
    }
  }
  return max;
});
