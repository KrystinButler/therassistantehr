"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPatientBalanceOverdue = onPatientBalanceOverdue;
const index_1 = require("../queues/index");
async function onPatientBalanceOverdue(balance) {
    await index_1.reminderSendQueue.add('sendPatientBalanceReminder', { balanceId: balance.id });
}
//# sourceMappingURL=patientBalanceOverdue.workflow.js.map