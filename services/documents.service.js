"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const crypto_1 = require("crypto");
const devStore_1 = require("../data/devStore");
const http_1 = require("../lib/http");
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
function getScopedDocument(id, organizationId) {
    const document = devStore_1.devDocuments.find((item) => item.id === id && item.organizationId === organizationId);
    if (!document) {
        throw (0, http_1.createHttpError)(404, 'Document not found');
    }
    return document;
}
class DocumentsService {
    static async upload(file, category, tags = [], expiresAt, organizationId, userId) {
        const id = (0, crypto_1.randomUUID)();
        const timestamp = new Date().toISOString();
        const document = {
            category,
            createdAt: timestamp,
            expiresAt,
            id,
            mimeType: file.mimetype,
            name: file.originalname,
            organizationId,
            size: file.size,
            tags,
            updatedAt: timestamp,
            uploadedBy: userId,
            url: (0, devStore_1.buildInlineDocumentUrl)(organizationId, file, id),
        };
        devStore_1.devDocuments.unshift(document);
        return clone(document);
    }
    static async getSignedUrl(id, organizationId) {
        const doc = getScopedDocument(id, organizationId);
        return `https://storage.thera.local/${encodeURIComponent(doc.url)}?expiresIn=60`;
    }
    static async list(organizationId, filters) {
        return devStore_1.devDocuments
            .filter((document) => {
            if (document.organizationId !== organizationId) {
                return false;
            }
            if (filters.category && document.category !== filters.category) {
                return false;
            }
            if (filters.tag && !document.tags.includes(String(filters.tag))) {
                return false;
            }
            return true;
        })
            .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
            .map(clone);
    }
    static async update(id, organizationId, data) {
        const document = getScopedDocument(id, organizationId);
        if (data.category !== undefined) {
            document.category = data.category;
        }
        if (data.expiresAt !== undefined) {
            document.expiresAt = data.expiresAt;
        }
        if (data.tags !== undefined) {
            document.tags = data.tags;
        }
        document.updatedAt = new Date().toISOString();
        return clone(document);
    }
    static async delete(id, organizationId) {
        const index = devStore_1.devDocuments.findIndex((document) => document.id === id && document.organizationId === organizationId);
        if (index === -1) {
            throw (0, http_1.createHttpError)(404, 'Document not found');
        }
        devStore_1.devDocuments.splice(index, 1);
    }
}
exports.DocumentsService = DocumentsService;
//# sourceMappingURL=documents.service.js.map