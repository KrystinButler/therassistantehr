"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
const http_1 = require("../lib/http");
const documents_service_1 = require("../services/documents.service");
class DocumentsController {
    static async upload(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const file = req.file;
            if (!file) {
                throw (0, http_1.createHttpError)(400, 'A file payload is required');
            }
            const { category, expiresAt, tags } = req.body;
            const doc = await documents_service_1.DocumentsService.upload(file, category, tags, expiresAt, user.organizationId, user.id);
            res.status(201).json(doc);
        }
        catch (err) {
            next(err);
        }
    }
    static async getSignedUrl(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const doc = await documents_service_1.DocumentsService.getSignedUrl(req.params.id, user.organizationId);
            res.json({ url: doc });
        }
        catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const docs = await documents_service_1.DocumentsService.list(user.organizationId, req.query);
            res.json(docs);
        }
        catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const doc = await documents_service_1.DocumentsService.update(req.params.id, user.organizationId, req.body);
            res.json(doc);
        }
        catch (err) {
            next(err);
        }
    }
    static async delete(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            await documents_service_1.DocumentsService.delete(req.params.id, user.organizationId);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.DocumentsController = DocumentsController;
//# sourceMappingURL=documents.controller.js.map