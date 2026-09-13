"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBullQueue = createBullQueue;
exports.createBullWorker = createBullWorker;
exports.getQueueSnapshot = getQueueSnapshot;
exports.listRegisteredQueues = listRegisteredQueues;
const crypto_1 = require("crypto");
const queueStates = new Map();
function getQueueState(name) {
    if (!queueStates.has(name)) {
        queueStates.set(name, { jobs: [], workers: [] });
    }
    return queueStates.get(name);
}
async function processWithWorkers(queueName, job) {
    const state = getQueueState(queueName);
    for (const worker of state.workers) {
        try {
            const result = await worker.process(job);
            job.result = result;
            job.completedAt = new Date().toISOString();
        }
        catch (error) {
            job.failedReason = error instanceof Error ? error.message : 'Unknown worker error';
            throw error;
        }
    }
}
function createBullQueue(name) {
    const state = getQueueState(name);
    return {
        async add(jobName, data) {
            const job = {
                attemptsMade: 0,
                createdAt: new Date().toISOString(),
                data,
                id: (0, crypto_1.randomUUID)(),
                name: jobName,
                queueName: name,
            };
            state.jobs.push(job);
            await processWithWorkers(name, job);
            return job;
        },
        getJobs() {
            return [...state.jobs];
        },
        name,
    };
}
function createBullWorker(name, processor) {
    const state = getQueueState(name);
    const worker = {
        name: `${name}-worker-${state.workers.length + 1}`,
        async process(job) {
            job.attemptsMade += 1;
            return processor(job);
        },
        queueName: name,
    };
    state.workers.push(worker);
    return worker;
}
function getQueueSnapshot(name) {
    const state = getQueueState(name);
    return {
        jobs: [...state.jobs],
        name,
        workerCount: state.workers.length,
    };
}
function listRegisteredQueues() {
    return Array.from(queueStates.keys()).sort();
}
//# sourceMappingURL=bullmq.js.map