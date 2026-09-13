"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSignedNoteMissingClaim = onSignedNoteMissingClaim;
const index_1 = require("../queues/index");
async function onSignedNoteMissingClaim(note) {
    await index_1.workQueuesQueue.add('createWorkQueueItem', { noteId: note.id });
}
//# sourceMappingURL=signedNoteMissingClaim.workflow.js.map