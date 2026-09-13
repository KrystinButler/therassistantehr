"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDocumentExpiring = onDocumentExpiring;
const index_1 = require("../queues/index");
async function onDocumentExpiring(document) {
    await index_1.reminderSendQueue.add('sendDocumentExpirationReminder', { documentId: document.id });
    await index_1.billingAlertQueue.add('createDocumentExpirationAlert', { documentId: document.id });
}
//# sourceMappingURL=documentExpiring.workflow.js.map