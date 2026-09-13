"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
const dashboard_service_1 = require("../services/dashboard.service");
class DashboardController {
    static async getMetrics(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const metrics = await dashboard_service_1.DashboardService.getMetrics(user.organizationId);
            res.json(metrics);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map