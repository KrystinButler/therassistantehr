"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRouter = createApiRouter;
const express_1 = require("express");
const billing_1 = require("./billing");
const claims_1 = require("./claims");
const encounters_1 = require("./encounters");
const schedule_1 = require("./schedule");
const workqueue_1 = require("./workqueue");
function createApiRouter(args) {
    const router = (0, express_1.Router)();
    router.use((0, schedule_1.createScheduleRoutes)({
        scheduleService: args.scheduleService,
        requireRole: args.requireRole,
    }));
    router.use((0, encounters_1.createEncounterRoutes)({
        encounterService: args.encounterService,
        requireRole: args.requireRole,
    }));
    router.use((0, claims_1.createClaimRoutes)({
        claimService: args.claimService,
        requireRole: args.requireRole,
    }));
    router.use((0, workqueue_1.createWorkqueueRoutes)({
        workqueueService: args.workqueueService,
        requireRole: args.requireRole,
    }));
    router.use((0, billing_1.createBillingRoutes)({
        billingService: args.billingService,
        requireRole: args.requireRole,
    }));
    return router;
}
