"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
class DashboardService {
    static async getMetrics(orgId) {
        return dashboard_service_1.DashboardService.getMetrics(orgId);
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map