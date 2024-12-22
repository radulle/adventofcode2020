const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.split("\n").map(BigInt);
}

function process(secrets) {
  let sum = 0n;
  for (let secret of secrets) {
    for (let i = 0; i < 2000; i++) {
      secret = prune(mix(secret, secret * 64n));
      secret = prune(mix(secret, secret / 32n));
      secret = prune(mix(secret, secret * 2048n));
    }
    sum += secret;
  }
  return sum;
}

function mix(secret, value) {
  return secret ^ value;
}

function prune(secret) {
  return secret % 16777216n;
}
