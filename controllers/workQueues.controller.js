"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkQueuesController = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
const workQueues_service_1 = require("../services/workQueues.service");
class WorkQueuesController {
    static async list(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const items = await workQueues_service_1.WorkQueuesService.list(user.organizationId, req.query);
            res.json(items);
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const item = await workQueues_service_1.WorkQueuesService.create(user.organizationId, req.body, user.id);
            res.status(201).json(item);
        }
        catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const item = await workQueues_service_1.WorkQueuesService.update(user.organizationId, req.params.id, req.body, user.id);
            res.json(item);
        }
        catch (err) {
            next(err);
        }
    }
    static async addComment(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const item = await workQueues_service_1.WorkQueuesService.addComment(user.organizationId, req.params.id, req.body.comment, user.id);
            res.json(item);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.WorkQueuesController = WorkQueuesController;
//# sourceMappingURL=workQueues.controller.js.map