"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEligibilityInactive = onEligibilityInactive;
const index_1 = require("../queues/index");
async function onEligibilityInactive(eligibility) {
    await index_1.billingAlertQueue.add('createBillingAlert', { eligibilityId: eligibility.id });
}
//# sourceMappingURL=eligibilityInactive.workflow.js.map