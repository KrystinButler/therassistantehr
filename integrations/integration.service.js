"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationService = void 0;
const http_1 = require("../lib/http");
class IntegrationService {
    static async syncWithExternalSystem(orgId, integrationId) {
        if (!integrationId.trim()) {
            throw (0, http_1.createHttpError)(400, 'integrationId is required');
        }
        return {
            integrationId,
            organizationId: orgId,
            status: 'queued',
            syncedAt: new Date().toISOString(),
        };
    }
}
exports.IntegrationService = IntegrationService;
//# sourceMappingURL=integration.service.js.map