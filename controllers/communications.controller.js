"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationsController = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
const communications_service_1 = require("../services/communications.service");
class CommunicationsController {
    static async create(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const communication = await communications_service_1.CommunicationsService.create(user.organizationId, req.body, user.id);
            res.status(201).json(communication);
        }
        catch (error) {
            next(error);
        }
    }
    static async list(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const result = await communications_service_1.CommunicationsService.list(user.organizationId, req.query);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    static async export(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const csv = await communications_service_1.CommunicationsService.export(user.organizationId, req.query);
            res.setHeader('Content-Disposition', 'attachment; filename="communications.csv"');
            res.type('text/csv').send(csv);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const communication = await communications_service_1.CommunicationsService.getById(user.organizationId, req.params.id);
            res.json(communication);
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const communication = await communications_service_1.CommunicationsService.update(user.organizationId, req.params.id, req.body);
            res.json(communication);
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            await communications_service_1.CommunicationsService.delete(user.organizationId, req.params.id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CommunicationsController = CommunicationsController;
//# sourceMappingURL=communications.controller.js.map