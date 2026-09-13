"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.getAuthenticatedUser = getAuthenticatedUser;
const crypto_1 = require("crypto");
const devStore_1 = require("../data/devStore");
const http_1 = require("../lib/http");
function getHeaderValue(value) {
    return Array.isArray(value) ? value[0] : value;
}
function resolveDevUser(req) {
    const userId = getHeaderValue(req.headers['x-dev-user-id']) ?? devStore_1.defaultUserId;
    const organizationId = getHeaderValue(req.headers['x-dev-org-id']) ?? devStore_1.defaultOrganizationId;
    const role = getHeaderValue(req.headers['x-dev-role']);
    const email = getHeaderValue(req.headers['x-dev-email']);
    const seededUser = devStore_1.devUsers.find((candidate) => candidate.id === userId && candidate.organizationId === organizationId);
    if (seededUser && !role && !email) {
        return seededUser;
    }
    return {
        email: email ?? seededUser?.email ?? 'developer@thera.local',
        id: userId,
        organizationId,
        role: role ?? seededUser?.role ?? 'organization_admin',
    };
}
function authMiddleware(req, res, next) {
    req.requestId = getHeaderValue(req.headers['x-request-id']) ?? (0, crypto_1.randomUUID)();
    res.setHeader('x-request-id', req.requestId);
    req.user = resolveDevUser(req);
    next();
}
function getAuthenticatedUser(req) {
    if (!req.user) {
        throw (0, http_1.createHttpError)(401, 'Authentication required');
    }
    return req.user;
}
//# sourceMappingURL=auth.middleware.js.map