"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../../controllers/dashboard.controller");
const organization_middleware_1 = require("../../middleware/organization.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
router.get('/metrics', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'supervisor', 'read_only']), organization_middleware_1.organizationAccess, dashboard_controller_1.DashboardController.getMetrics);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map