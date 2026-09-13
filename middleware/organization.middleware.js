"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationAccess = organizationAccess;
function organizationAccess(req, res, next) {
    const orgId = req.user?.organizationId;
    if (!orgId) {
        return res.status(403).json({ error: 'Organization access denied' });
    }
    next();
}
//# sourceMappingURL=organization.middleware.js.map