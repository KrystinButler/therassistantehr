"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEncounterRoutes = createEncounterRoutes;
const express_1 = require("express");
const http_1 = require("./http");
function createEncounterRoutes(args) {
    const router = (0, express_1.Router)();
    const { encounterService, requireRole } = args;
    router.get("/encounters/:encounterId/workspace", requireRole(["clinician", "supervisor", "billing_specialist", "admin", "super_admin"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.query.organization_id || "").trim();
        const encounter_id = String(req.params.encounterId || "").trim();
        if (!organization_id) {
            return (0, http_1.badRequest)(res, "organization_id is required");
        }
        if (!encounter_id) {
            return (0, http_1.badRequest)(res, "encounterId is required");
        }
        const request = {
            organization_id,
            encounter_id,
        };
        const response = await encounterService.getEncounterWorkspace(request);
        return (0, http_1.ok)(res, response);
    }));
    return router;
}
