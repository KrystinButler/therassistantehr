"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportingService = void 0;
const devStore_1 = require("../data/devStore");
class ReportingService {
    static async generateReport(orgId, reportType) {
        return {
            generatedAt: new Date().toISOString(),
            organizationId: orgId,
            report: {
                communicationCount: devStore_1.devCommunications.filter((item) => item.organizationId === orgId).length,
                documentCount: devStore_1.devDocuments.filter((item) => item.organizationId === orgId).length,
                reportType,
                workQueueCount: devStore_1.devWorkQueues.filter((item) => item.organizationId === orgId).length,
            },
        };
    }
}
exports.ReportingService = ReportingService;
//# sourceMappingURL=reporting.service.js.map