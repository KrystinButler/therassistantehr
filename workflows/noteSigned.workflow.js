"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onNoteSigned = onNoteSigned;
const index_1 = require("../queues/index");
async function onNoteSigned(note) {
    // Run note audit AI
    await index_1.noteAuditAIQueue.add('runNoteAudit', { noteId: note.id });
}
//# sourceMappingURL=noteSigned.workflow.js.map