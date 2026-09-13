"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkQueuesService = void 0;
const crypto_1 = require("crypto");
const devStore_1 = require("../data/devStore");
const http_1 = require("../lib/http");
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
function findScopedWorkQueue(organizationId, id) {
    const item = devStore_1.devWorkQueues.find((candidate) => candidate.id === id && candidate.organizationId === organizationId);
    if (!item) {
        throw (0, http_1.createHttpError)(404, 'Work queue item not found');
    }
    return item;
}
function createComment(comment, userId) {
    return {
        comment,
        createdAt: new Date().toISOString(),
        id: (0, crypto_1.randomUUID)(),
        userId,
    };
}
const priorityRank = {
    high: 3,
    low: 1,
    medium: 2,
};
class WorkQueuesService {
    static async list(organizationId, filters) {
        const filtered = devStore_1.devWorkQueues.filter((item) => {
            if (item.organizationId !== organizationId) {
                return false;
            }
            if (filters.type && item.type !== filters.type) {
                return false;
            }
            if (filters.priority && item.priority !== filters.priority) {
                return false;
            }
            if (filters.assignedUserId && item.assignedUserId !== filters.assignedUserId) {
                return false;
            }
            return true;
        });
        filtered.sort((left, right) => {
            const priorityDelta = (priorityRank[right.priority] ?? 0) - (priorityRank[left.priority] ?? 0);
            if (priorityDelta !== 0) {
                return priorityDelta;
            }
            return (left.dueDate ?? '').localeCompare(right.dueDate ?? '');
        });
        return filtered.map(clone);
    }
    static async create(organizationId, data, userId) {
        const timestamp = new Date().toISOString();
        const item = {
            alertId: data.alertId,
            assignedUserId: data.assignedUserId,
            claimId: data.claimId,
            createdAt: timestamp,
            createdBy: userId,
            documentId: data.documentId,
            dueDate: data.dueDate,
            eraId: data.eraId,
            id: (0, crypto_1.randomUUID)(),
            notes: data.notes ? [createComment(data.notes, userId)] : [],
            organizationId,
            patientId: data.patientId,
            payerId: data.payerId,
            priority: data.priority ?? 'medium',
            snoozeDate: data.snoozeDate,
            taskId: data.taskId,
            ticketId: data.ticketId,
            type: data.type ?? 'general',
            updatedAt: timestamp,
            updatedBy: userId,
        };
        devStore_1.devWorkQueues.unshift(item);
        return clone(item);
    }
    static async update(organizationId, id, data, userId) {
        const item = findScopedWorkQueue(organizationId, id);
        if (data.alertId !== undefined)
            item.alertId = data.alertId;
        if (data.assignedUserId !== undefined)
            item.assignedUserId = data.assignedUserId;
        if (data.claimId !== undefined)
            item.claimId = data.claimId;
        if (data.documentId !== undefined)
            item.documentId = data.documentId;
        if (data.dueDate !== undefined)
            item.dueDate = data.dueDate;
        if (data.eraId !== undefined)
            item.eraId = data.eraId;
        if (data.notes !== undefined)
            item.notes.push(createComment(data.notes, userId));
        if (data.patientId !== undefined)
            item.patientId = data.patientId;
        if (data.payerId !== undefined)
            item.payerId = data.payerId;
        if (data.priority !== undefined)
            item.priority = data.priority;
        if (data.snoozeDate !== undefined)
            item.snoozeDate = data.snoozeDate;
        if (data.taskId !== undefined)
            item.taskId = data.taskId;
        if (data.ticketId !== undefined)
            item.ticketId = data.ticketId;
        if (data.type !== undefined)
            item.type = data.type;
        item.updatedAt = new Date().toISOString();
        item.updatedBy = userId;
        return clone(item);
    }
    static async addComment(organizationId, id, comment, userId) {
        const item = findScopedWorkQueue(organizationId, id);
        item.notes.push(createComment(comment, userId));
        item.updatedAt = new Date().toISOString();
        item.updatedBy = userId;
        return clone(item);
    }
}
exports.WorkQueuesService = WorkQueuesService;
//# sourceMappingURL=workQueues.service.js.map