"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = auditLogger;
function auditLogger(req, res, next) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`[AUDIT] ${req.method} ${req.originalUrl} by ${req.user?.id || 'anonymous'} at ${new Date().toISOString()}`);
    }
    next();
}
//# sourceMappingURL=audit.middleware.js.map