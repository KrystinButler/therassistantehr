"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const devStore_1 = require("../data/devStore");
const http_1 = require("../lib/http");
class UserService {
    static async getUserById(orgId, userId) {
        const user = devStore_1.devUsers.find((candidate) => candidate.organizationId === orgId && candidate.id === userId);
        if (!user) {
            throw (0, http_1.createHttpError)(404, 'User not found');
        }
        return { ...user };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map