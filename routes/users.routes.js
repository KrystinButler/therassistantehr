"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const organization_middleware_1 = require("../middleware/organization.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const user_schemas_1 = require("../validators/user.schemas");
const validateAll_1 = require("../validators/validateAll");
const router = (0, express_1.Router)();
router.get('/:id', (0, role_middleware_1.roleAccess)(['super_admin', 'organization_admin']), organization_middleware_1.organizationAccess, (0, validateAll_1.validateAll)({ params: user_schemas_1.userIdParamSchema }), user_controller_1.UserController.getUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map