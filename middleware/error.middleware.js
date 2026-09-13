"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const http_1 = require("../lib/http");
function errorHandler(err, req, res, _next) {
    const status = (0, http_1.isHttpError)(err) ? err.status : 500;
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    if (status >= 500) {
        console.error(err);
    }
    res.status(status).json({
        details: (0, http_1.isHttpError)(err) ? err.details : undefined,
        error: message,
        requestId: req.requestId,
    });
}
//# sourceMappingURL=error.middleware.js.map