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
    nReport: for (let i = 0; i < report.length; i++) {
      const nReport = report.filter((_, k) => k !== i)
      const asc = nReport[1] > nReport[0]
      for (let j = 1; j < nReport.length; j++) {
        if (Math.abs(nReport[j] - nReport[j - 1]) > 3) continue nReport;
        if (nReport[j] === nReport[j - 1]) continue nReport
        if (asc && nReport[j] < nReport[j - 1]) continue nReport
        if (!asc && nReport[j] > nReport[j - 1]) continue nReport
      }
      safe.push(report)
      continue reports
    }
  }

  return safe.length
}
