"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devStore_1 = require("../data/devStore");
const prisma = {
    async $connect() {
        return Promise.resolve();
    },
    async $disconnect() {
        return Promise.resolve();
    },
    status() {
        return {
            communications: devStore_1.devCommunications.length,
            documents: devStore_1.devDocuments.length,
            mode: 'in-memory',
            users: devStore_1.devUsers.length,
            workQueues: devStore_1.devWorkQueues.length,
        };
    },
};
exports.default = prisma;
//# sourceMappingURL=prisma.js.map