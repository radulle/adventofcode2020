const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.split("\n").map(BigInt);
}

function process(secrets) {
  const _secrets = [];
  let curr;
  for (let secret of secrets) {
    _secrets.push([]);
    curr = secret % 10n;
    _secrets.at(-1).push([curr, null]);
    for (let i = 0; i < 2000; i++) {
      secret = prune(mix(secret, secret * 64n));
      secret = prune(mix(secret, secret / 32n));
      secret = prune(mix(secret, secret * 2048n));
      const nCurr = secret % 10n;
      _secrets.at(-1).push([nCurr, nCurr - curr]);
      curr = nCurr;
    }
  }

  const trends = new Array(_secrets.length).fill(null).map(() => ({}));

  for (let i = 0; i < _secrets.length; i++) {
    for (let j = 4; j < _secrets[i].length; j++) {
      const sequence = `${_secrets[i][j][1]},${_secrets[i][j - 1][1]},${_secrets[i][j - 2][1]},${_secrets[i][j - 3][1]}`;
      if (trends[i][sequence]) continue;
      trends[i][sequence] = _secrets[i][j][0];
    }
  }

  let sequencesCount = {};
  for (let i = 0; i < trends.length; i++) {
    for (let sequence of Object.keys(trends[i])) {
      if (!sequencesCount[sequence]) sequencesCount[sequence] = 0;
      sequencesCount[sequence]++;
    }
  }
  sequencesCount = Object.entries(sequencesCount).sort((a, b) => b[1] - a[1]);

  const sums = [];
  for (let i = 0; i < sequencesCount.length / 1000; i++) {
    const sequence = sequencesCount[i][0];
    let sum = 0n;
    for (let j = 0; j < trends.length; j++) {
      if (trends[j][sequence]) sum += trends[j][sequence] || 0n;
    }
    sums[i] = sum;
  }

  return sums.reduce((acc, curr) => (acc > curr ? acc : curr), 0n).toString();
}

function mix(secret, value) {
  return secret ^ value;
}

function prune(secret) {
  return secret % 16777216n;
}
