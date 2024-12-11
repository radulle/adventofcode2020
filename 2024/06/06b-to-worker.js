const { Worker } = require("node:worker_threads");
function toWorker(grid, sr, sc, rmin, rmax) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./06b-worker.js', {
            workerData: { grid, sr, sc, rmin, rmax },
        });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}
exports.toWorker = toWorker;
