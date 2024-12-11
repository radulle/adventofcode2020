const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const reports = input.split("\n").map(r => r.split(" ").map(Number))
  return reports
}

function process(reports) {
  let safe = [];

  reports: for (const report of reports) {
    const asc = report[1] > report[0]

    for (let i = 1; i < report.length; i++) {
      if (Math.abs(report[i] - report[i - 1]) > 3) continue reports;
      if (report[i] === report[i - 1]) continue reports
      if (asc && report[i] < report[i - 1]) continue reports
      if (!asc && report[i] > report[i - 1]) continue reports
    }

    safe.push(report)
  }

  return safe.length
}
