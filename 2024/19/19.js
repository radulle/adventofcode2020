const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [towels, designs] = input.split("\n\n");
  towels = towels.split(", ");
  towels.sort((a, b) => b.length - a.length);
  designs = designs.split("\n");
  return [towels, designs];
}

function process([towels, designs]) {
  const isValid = memoize((d) => {
    if (!d.length) return true;
    return (
      towels
        .filter((t) => d.startsWith(t))
        .map((t) => d.substring(t.length))
        .filter(isValid).length > 0
    );
  });

  const count = memoize((d) => {
    if (!d.length) return 1;
    return towels
      .filter((t) => d.startsWith(t))
      .map((t) => d.substring(t.length))
      .reduce((acc, cur) => acc + count(cur), 0);
  });

  return [
    designs.map(isValid).filter(Boolean).length,
    designs.map(count).reduce((acc, cur) => acc + cur, 0),
  ];
}

function memoize(fn) {
  const cache = {};
  return function (arg) {
    if (arg in cache) return cache[arg];
    return (cache[arg] = fn(arg));
  };
}
