"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleQueue = void 0;
const bullmq_1 = require("../utils/bullmq");
const exampleQueue = (0, bullmq_1.createBullQueue)('example');
class ExampleQueue {
    static async addToQueue(orgId, data) {
        return exampleQueue.add('example', { ...data, orgId });
    }
}
exports.ExampleQueue = ExampleQueue;
//# sourceMappingURL=example.queue.js.map