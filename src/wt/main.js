import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const results = [];

    const createWorker = (index) => {
        return new Promise((resolve) => {
            const worker = new Worker(path.resolve(__dirname, 'worker.js'));

            worker.postMessage(10 + index);

            worker.on('message', (result) => {
                results[index] = { status: 'resolved', data: result };
                resolve();
            });

            worker.on('error', () => {
                results[index] = { status: 'error', data: null };
                resolve();
            });
        });
    };

    const workerPromises = [];
    for (let i = 0; i < numCores; i++) {
        workerPromises.push(createWorker(i));
    }

    await Promise.all(workerPromises);
    console.log(results);
};

await performCalculations();
