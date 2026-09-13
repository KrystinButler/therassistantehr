"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file registers all API routes for the application
const express_1 = require("express");
const communications_routes_1 = __importDefault(require("./communications/communications.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard/dashboard.routes"));
const documents_routes_1 = __importDefault(require("./documents/documents.routes"));
const workQueues_routes_1 = __importDefault(require("./work-queues/workQueues.routes"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        endpoints: ['dashboard', 'work-queues', 'documents', 'communications', 'users'],
        status: 'ok',
    });
});
router.use('/communications', communications_routes_1.default);
router.use('/dashboard', dashboard_routes_1.default);
router.use('/documents', documents_routes_1.default);
router.use('/work-queues', workQueues_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map