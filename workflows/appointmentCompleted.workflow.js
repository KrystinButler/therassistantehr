"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAppointmentCompleted = onAppointmentCompleted;
const index_1 = require("../queues/index");
const index_2 = require("../queues/index");
async function onAppointmentCompleted(appointment) {
    // 1. Create claim draft
    await index_1.claimsQueue.add('createClaimDraft', { appointmentId: appointment.id });
    // 2. Trigger eligibility check
    await index_2.eligibilityQueue.add('checkEligibility', { appointmentId: appointment.id });
}
//# sourceMappingURL=appointmentCompleted.workflow.js.map