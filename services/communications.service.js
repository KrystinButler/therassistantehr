"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationsService = void 0;
const crypto_1 = require("crypto");
const devStore_1 = require("../data/devStore");
const http_1 = require("../lib/http");
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
function getScopedCommunication(id, organizationId) {
    const communication = devStore_1.devCommunications.find((item) => item.id === id && item.organizationId === organizationId);
    if (!communication) {
        throw (0, http_1.createHttpError)(404, 'Communication not found');
    }
    return communication;
}
function sortCommunications(communications, sortField, order = 'desc') {
    const direction = order === 'asc' ? 1 : -1;
    const field = sortField === 'updatedAt' ? 'updatedAt' : 'createdAt';
    communications.sort((left, right) => left[field].localeCompare(right[field]) * direction);
}
function toCsv(communications) {
    const header = ['id', 'channel', 'status', 'subject', 'senderId', 'recipientId', 'createdAt'];
    const rows = communications.map((item) => [
        item.id,
        item.channel,
        item.status,
        item.subject ?? '',
        item.senderId,
        item.recipientId,
        item.createdAt,
    ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(','));
    return [header.join(','), ...rows].join('\n');
}
class CommunicationsService {
    static async create(organizationId, data, actorUserId) {
        const timestamp = new Date().toISOString();
        const communication = {
            body: data.body ?? '',
            channel: data.channel ?? 'in_app',
            createdAt: timestamp,
            id: (0, crypto_1.randomUUID)(),
            organizationId,
            recipientId: data.recipientId ?? actorUserId,
            senderId: data.senderId ?? actorUserId,
            status: data.status ?? 'user',
            subject: data.subject,
            updatedAt: timestamp,
        };
        devStore_1.devCommunications.unshift(communication);
        return clone(communication);
    }
    static async list(organizationId, query) {
        const filtered = devStore_1.devCommunications.filter((item) => {
            if (item.organizationId !== organizationId) {
                return false;
            }
            if (query.status && item.status !== query.status) {
                return false;
            }
            if (query.channel && item.channel !== query.channel) {
                return false;
            }
            if (query.senderId && item.senderId !== query.senderId) {
                return false;
            }
            if (query.recipientId && item.recipientId !== query.recipientId) {
                return false;
            }
            if (query.createdAtFrom && item.createdAt < query.createdAtFrom) {
                return false;
            }
            if (query.createdAtTo && item.createdAt > query.createdAtTo) {
                return false;
            }
            return true;
        });
        sortCommunications(filtered, query.sort, query.order);
        const total = filtered.length;
        const page = query.page;
        const pageSize = query.pageSize;
        const start = (page - 1) * pageSize;
        const items = filtered.slice(start, start + pageSize).map(clone);
        return {
            items,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: total === 0 ? 0 : Math.ceil(total / pageSize),
            },
        };
    }
    static async export(organizationId, query) {
        if (query.format === 'pdf') {
            throw (0, http_1.createHttpError)(501, 'PDF export is not implemented in dev mode');
        }
        const communications = devStore_1.devCommunications.filter((item) => item.organizationId === organizationId &&
            (!query.status || item.status === query.status));
        return toCsv(communications);
    }
    static async getById(organizationId, id) {
        return clone(getScopedCommunication(id, organizationId));
    }
    static async update(organizationId, id, data) {
        const communication = getScopedCommunication(id, organizationId);
        if (data.body !== undefined) {
            communication.body = data.body;
        }
        if (data.channel !== undefined) {
            communication.channel = data.channel;
        }
        if (data.recipientId !== undefined) {
            communication.recipientId = data.recipientId;
        }
        if (data.senderId !== undefined) {
            communication.senderId = data.senderId;
        }
        if (data.status !== undefined) {
            communication.status = data.status;
        }
        if (data.subject !== undefined) {
            communication.subject = data.subject;
        }
        communication.updatedAt = new Date().toISOString();
        return clone(communication);
    }
    static async delete(organizationId, id) {
        const index = devStore_1.devCommunications.findIndex((item) => item.id === id && item.organizationId === organizationId);
        if (index === -1) {
            throw (0, http_1.createHttpError)(404, 'Communication not found');
        }
        devStore_1.devCommunications.splice(index, 1);
    }
}
exports.CommunicationsService = CommunicationsService;
//# sourceMappingURL=communications.service.js.map