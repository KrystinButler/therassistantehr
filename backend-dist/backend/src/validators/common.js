"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRule = makeRule;
exports.emptyReadiness = emptyReadiness;
exports.finalizeReadiness = finalizeReadiness;
exports.addBlocker = addBlocker;
exports.addWarning = addWarning;
exports.isBlank = isBlank;
exports.isPositiveMoneyString = isPositiveMoneyString;
exports.hasValue = hasValue;
exports.hasAnyAllocationTargets = hasAnyAllocationTargets;
exports.routeTitleForRequest = routeTitleForRequest;
function makeRule(args) {
    return { ...args };
}
function emptyReadiness() {
    return { is_ready: true, blockers: [], warnings: [] };
}
function finalizeReadiness(result) {
    return { ...result, is_ready: result.blockers.length === 0 };
}
function addBlocker(result, rule) {
    result.blockers.push(rule);
    result.is_ready = false;
}
function addWarning(result, rule) {
    result.warnings.push(rule);
}
function isBlank(value) {
    return value == null || (typeof value === "string" && value.trim().length === 0);
}
function isPositiveMoneyString(value) {
    if (isBlank(value))
        return false;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0;
}
function hasValue(value) {
    return value !== null && value !== undefined;
}
function hasAnyAllocationTargets(input) {
    return Boolean(input.claim_id || input.claim_service_line_id || input.encounter_id || input.client_id);
}
function routeTitleForRequest(request) {
    if (request.title && request.title.trim())
        return request.title.trim();
    return request.source_object_type === "claim"
        ? "Claim requires billing follow-up"
        : "Encounter requires billing review";
}
