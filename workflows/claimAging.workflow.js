"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClaimAging = onClaimAging;
const index_1 = require("../queues/index");
async function onClaimAging(claim) {
    await index_1.agingQueue.add('moveToAgingQueue', { claimId: claim.id, aging: claim.aging });
}
//# sourceMappingURL=claimAging.workflow.js.map