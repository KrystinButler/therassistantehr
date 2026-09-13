"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDenialPosted = onDenialPosted;
const index_1 = require("../queues/index");
async function onDenialPosted(denial) {
    await index_1.billingAlertQueue.add('createBillingAlert', { denialId: denial.id });
    await index_1.tasksQueue.add('createTask', { denialId: denial.id });
    await index_1.workQueuesQueue.add('addToWorkQueue', { denialId: denial.id });
}
//# sourceMappingURL=denialPosted.workflow.js.map