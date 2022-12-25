const { input, consoleTime } = require("lib");

consoleTime(() => solve());

function solve() {
  let data = input().split("\n");

  for (let i = 0; i < data.length; i++) {
    const snafu = data[i]
      .split("")
      .reverse()
      .map((c) => {
        if (c === "-") return -1;
        if (c === "=") return -2;
        return +c;
      });
    let dec = 0;
    for (let j = 0; j < snafu.length; j++) {
      dec += snafu[j] * 5 ** j;
    }
    data[i] = dec;
  }

  let sum = data.reduce((a, c) => a + c);

  let snafu = "";
  while (sum !== 0) {
    let d = sum % 5;
    if (d === 3) {
      d = "=";
      sum += 2;
    }
    if (d === 4) {
      d = "-";
      sum += 1;
    }
    snafu = d + snafu;
    sum = Math.floor(sum / 5);
  }

  console.info(snafu);
}
