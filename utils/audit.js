"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = logAudit;
const logger_1 = __importDefault(require("../utils/logger"));
function logAudit(action, userId, orgId, resource, details) {
    logger_1.default.info(`[AUDIT] ${action} by ${userId} in org ${orgId} on ${resource}`, details);
}
//# sourceMappingURL=audit.js.map