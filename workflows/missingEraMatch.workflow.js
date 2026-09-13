"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMissingEraMatch = onMissingEraMatch;
const index_1 = require("../queues/index");
async function onMissingEraMatch(era) {
    await index_1.workQueuesQueue.add('createReconciliationWorkQueue', { eraId: era.id });
}
//# sourceMappingURL=missingEraMatch.workflow.js.map