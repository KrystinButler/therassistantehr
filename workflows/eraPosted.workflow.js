"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEraPosted = onEraPosted;
const index_1 = require("../queues/index");
async function onEraPosted(era) {
    await index_1.carcRarcQueue.add('assignCarcRarcWorkQueue', { eraId: era.id });
}
//# sourceMappingURL=eraPosted.workflow.js.map