"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const devStore_1 = require("../data/devStore");
const http_1 = require("../lib/http");
class DashboardService {
    static async getMetrics(organizationId) {
        const snapshot = devStore_1.dashboardSnapshots[organizationId];
        if (!snapshot) {
            throw (0, http_1.createHttpError)(404, 'Dashboard metrics unavailable for organization');
        }
        return {
            ...snapshot,
            billingAlertsCount: Math.max(snapshot.billingAlertsCount, devStore_1.devDocuments.filter((document) => document.organizationId === organizationId).length),
            missingClaimsCount: Math.max(snapshot.missingClaimsCount, devStore_1.devWorkQueues.filter((item) => item.organizationId === organizationId).length),
            noResponseClaims: Math.max(snapshot.noResponseClaims, devStore_1.devCommunications.filter((item) => item.organizationId === organizationId && item.status === 'alert').length),
        };
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map