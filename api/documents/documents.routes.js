"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documents_controller_1 = require("../../controllers/documents.controller");
const file_middleware_1 = require("../../middleware/file.middleware");
const validate_1 = require("../../validators/validate");
const validateAll_1 = require("../../validators/validateAll");
const documents_schemas_1 = require("../../validators/documents.schemas");
const common_schemas_1 = require("../../validators/common.schemas");
const organization_middleware_1 = require("../../middleware/organization.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post('/upload', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'support_staff']), organization_middleware_1.organizationAccess, file_middleware_1.attachInlineFile, (0, validate_1.validate)(documents_schemas_1.documentUploadSchema), documents_controller_1.DocumentsController.upload);
router.get('/:id/signed-url', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'clinician', 'support_staff']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema }), documents_controller_1.DocumentsController.getSignedUrl);
router.get('/', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'clinician', 'support_staff', 'read_only']), organization_middleware_1.organizationAccess, documents_controller_1.DocumentsController.list);
router.put('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'support_staff']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema, body: documents_schemas_1.documentUpdateSchema }), documents_controller_1.DocumentsController.update);
router.delete('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema }), documents_controller_1.DocumentsController.delete);
exports.default = router;
//# sourceMappingURL=documents.routes.js.map