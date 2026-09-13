"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workQueues_controller_1 = require("../../controllers/workQueues.controller");
const validate_1 = require("../../validators/validate");
const validateAll_1 = require("../../validators/validateAll");
const common_schemas_1 = require("../../validators/common.schemas");
const workQueues_schemas_1 = require("../../validators/workQueues.schemas");
const organization_middleware_1 = require("../../middleware/organization.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
router.get('/', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'supervisor']), organization_middleware_1.organizationAccess, workQueues_controller_1.WorkQueuesController.list);
router.post('/', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller']), organization_middleware_1.organizationAccess, (0, validate_1.validate)(workQueues_schemas_1.workQueueCreateSchema), workQueues_controller_1.WorkQueuesController.create);
router.put('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema, body: workQueues_schemas_1.workQueueUpdateSchema }), workQueues_controller_1.WorkQueuesController.update);
router.post('/:id/comment', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin', 'biller', 'supervisor']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: common_schemas_1.idParamSchema, body: workQueues_schemas_1.workQueueCommentSchema }), workQueues_controller_1.WorkQueuesController.addComment);
exports.default = router;
//# sourceMappingURL=workQueues.routes.js.map