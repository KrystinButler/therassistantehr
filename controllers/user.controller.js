"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_service_1 = require("../services/user.service");
class UserController {
    static async getUser(req, res, next) {
        try {
            const user = (0, auth_middleware_1.getAuthenticatedUser)(req);
            const foundUser = await user_service_1.UserService.getUserById(user.organizationId, req.params.id);
            res.json(foundUser);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map