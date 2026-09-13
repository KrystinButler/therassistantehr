"use strict";
// File: shared/contracts/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBlockers = hasBlockers;
exports.hasWarnings = hasWarnings;
exports.isClaimTerminal = isClaimTerminal;
exports.isWorkqueueOpen = isWorkqueueOpen;
/* =========================
   Helper type guards
   ========================= */
function hasBlockers(result) {
    return result.blockers.length > 0;
}
function hasWarnings(result) {
    return result.warnings.length > 0;
}
function isClaimTerminal(status) {
    return status === "paid" || status === "voided";
}
function isWorkqueueOpen(status) {
    return status !== "completed" && status !== "archived";
}
