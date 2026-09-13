"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScheduleRoutes = createScheduleRoutes;
const express_1 = require("express");
const http_1 = require("./http");
function todayIsoDate() {
    return new Date().toISOString().slice(0, 10);
}
function createScheduleRoutes(args) {
    const router = (0, express_1.Router)();
    const { scheduleService, requireRole } = args;
    router.get("/schedule", requireRole(["clinician", "supervisor", "billing_specialist", "admin", "super_admin"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.query.organization_id || "").trim();
        const date = String(req.query.date || todayIsoDate()).trim();
        const provider_id = req.query.provider_id ? String(req.query.provider_id).trim() : undefined;
        const location_id = req.query.location_id ? String(req.query.location_id).trim() : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const offset = req.query.offset ? Number(req.query.offset) : undefined;
        if (!organization_id) {
            return (0, http_1.badRequest)(res, "organization_id is required");
        }
        const request = {
            organization_id,
            date,
            provider_id,
            location_id,
            limit: Number.isFinite(limit) ? limit : undefined,
            offset: Number.isFinite(offset) ? offset : undefined,
        };
        const response = await scheduleService.getScheduleDay(request);
        return (0, http_1.ok)(res, response);
    }));
    router.post("/appointments/:appointmentId/resolve-encounter", requireRole(["clinician", "supervisor", "billing_specialist", "admin", "super_admin"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.body?.organization_id || req.query.organization_id || "").trim();
        const appointment_id = String(req.params.appointmentId || "").trim();
        const requested_by_user_id = req.body?.requested_by_user_id
            ? String(req.body.requested_by_user_id).trim()
            : undefined;
        if (!organization_id) {
            return (0, http_1.badRequest)(res, "organization_id is required");
        }
        if (!appointment_id) {
            return (0, http_1.badRequest)(res, "appointmentId is required");
        }
        const request = {
            organization_id,
            appointment_id,
            requested_by_user_id,
        };
        try {
            const response = await scheduleService.resolveEncounterForAppointment(request);
            return (0, http_1.ok)(res, response);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes("Appointment not found")) {
                return (0, http_1.notFound)(res, error.message);
            }
            throw error;
        }
    }));
    return router;
}
