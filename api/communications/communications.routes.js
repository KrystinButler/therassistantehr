"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const communications_controller_1 = require("../../controllers/communications.controller");
const validateAll_1 = require("../../validators/validateAll");
const communications_schemas_1 = require("../../validators/communications.schemas");
const common_schemas_1 = require("../../validators/common.schemas");
const organization_middleware_1 = require("../../middleware/organization.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post('/', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'support_staff']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ body: communications_schemas_1.communicationCreateSchema }), communications_controller_1.CommunicationsController.create);
router.get('/', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'clinician', 'supervisor', 'support_staff', 'read_only']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ query: communications_schemas_1.communicationListQuerySchema }), communications_controller_1.CommunicationsController.list);
router.get('/export', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ query: communications_schemas_1.communicationExportSchema }), communications_controller_1.CommunicationsController.export);
router.get('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'clinician', 'supervisor', 'support_staff', 'read_only']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema }), communications_controller_1.CommunicationsController.getById);
router.put('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'support_staff']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema, body: communications_schemas_1.communicationUpdateSchema }), communications_controller_1.CommunicationsController.update);
router.delete('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema }), communications_controller_1.CommunicationsController.delete);
exports.default = router;
//# sourceMappingURL=communications.routes.js.map