"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBillingRoutes = createBillingRoutes;
const express_1 = require("express");
const http_1 = require("./http");
function createBillingRoutes(args) {
    const router = (0, express_1.Router)();
    const { billingService, requireRole } = args;
    router.post("/billing/post-payment", requireRole(["billing_specialist", "supervisor", "admin", "super_admin"]), (0, http_1.asyncHandler)(async (req, res) => {
        const { organization_id, requested_by_user_id, payment_import_item_id, posting_reference, allocations } = req.body || {};
        if (!organization_id || !requested_by_user_id || !posting_reference) {
            return (0, http_1.badRequest)(res, "organization_id, requested_by_user_id, and posting_reference are required");
        }
        const request = {
            organization_id: String(organization_id),
            requested_by_user_id: String(requested_by_user_id),
            payment_import_item_id: payment_import_item_id ? String(payment_import_item_id) : undefined,
            posting_reference: String(posting_reference),
            allocations: Array.isArray(allocations) ? allocations : [],
        };
        const response = await billingService.postPayment(request);
        return (0, http_1.ok)(res, response);
    }));
    router.get("/billing/unposted-payments", requireRole(["billing_specialist", "supervisor", "admin", "super_admin", "clinician"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.query.organization_id || "").trim();
        if (!organization_id) {
            return (0, http_1.badRequest)(res, "organization_id is required");
        }
        const payments = await billingService.getUnpostedPayments(organization_id);
        return (0, http_1.ok)(res, { payments });
    }));
    router.get("/billing/ready-to-submit", requireRole(["billing_specialist", "supervisor", "admin", "super_admin", "clinician"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.query.organization_id || "").trim();
        if (!organization_id) {
            return (0, http_1.badRequest)(res, "organization_id is required");
        }
        const claims = await billingService.getReadyToSubmitClaims(organization_id);
        return (0, http_1.ok)(res, { claims });
    }));
    router.get("/billing/batches", requireRole(["billing_specialist", "supervisor", "admin", "super_admin", "clinician"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.query.organization_id || "").trim();
        if (!organization_id) {
            return (0, http_1.badRequest)(res, "organization_id is required");
        }
        const batches = await billingService.getSubmissionBatches(organization_id);
        return (0, http_1.ok)(res, { batches });
    }));
    router.get("/billing/client-snapshot/:clientId", requireRole(["billing_specialist", "supervisor", "admin", "super_admin", "clinician"]), (0, http_1.asyncHandler)(async (req, res) => {
        const organization_id = String(req.query.organization_id || "").trim();
        const client_id = String(req.params.clientId || "").trim();
        if (!organization_id || !client_id) {
            return (0, http_1.badRequest)(res, "organization_id and clientId are required");
        }
        const response = await billingService.getBillingSnapshot(organization_id, client_id);
        return (0, http_1.ok)(res, response);
    }));
    return router;
}
