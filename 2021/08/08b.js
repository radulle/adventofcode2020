const { input, consoleTime } = require("lib");

String.prototype.includesChars = function (str) {
  return str.split("").every((c) => this.includes(c));
};

Object.prototype.addReverseLookup = function () {
  Object.assign(
    this,
    Object.fromEntries(Object.entries(this).map(([k, v]) => [v, k]))
  );
};

const data = input()
  .split("\n")
  .map((row) =>
    row
      .split(" | ")
      .map((half) =>
        half.split(" ").map((str) => str.split("").sort().join(""))
      )
  );

consoleTime(() => solve(data));

function solve(data) {
  let sum = 0;
  for (const [first, second] of data) {
    const digits = new Object(),
      five = [],
      six = [];

    first.forEach((e) => {
      if (e.length === 2) return (digits[1] = e);
      if (e.length === 3) return (digits[7] = e);
      if (e.length === 4) return (digits[4] = e);
      if (e.length === 7) return (digits[8] = e);
      if (e.length === 6) return six.push(e);
      five.push(e);
    });

    six.forEach((e) => {
      if (!e.includesChars(digits[1])) return (digits[6] = e);
      if (e.includesChars(digits[4])) return (digits[9] = e);
      digits[0] = e;
    });

    five.forEach((e) => {
      if (e.includesChars(digits[1])) return (digits[3] = e);
      if (digits[6].includesChars(e)) return (digits[5] = e);
      digits[2] = e;
    });

    digits.addReverseLookup();

    const num = Number(second.reduce((acc, cur) => acc + digits[cur], ""));
    sum += num;
  }

  return sum;
}
