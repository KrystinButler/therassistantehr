"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaymentPosting = validatePaymentPosting;
const common_1 = require("./common");
function sumAllocations(allocations) {
    return allocations.reduce((sum, allocation) => sum + (Number(allocation.allocated_amount || "0") || 0), 0);
}
function validatePaymentPosting(input) {
    const result = (0, common_1.emptyReadiness)();
    const { request, existing_posting } = input;
    if ((0, common_1.isBlank)(request.posting_reference))
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "PAYMENT_POSTING_REFERENCE_MISSING", severity: "blocker", message: "Posting reference is required.",
            source_object_type: "payment_posting", source_object_id: null, field_path: "posting_reference",
        }));
    if (request.allocations.length === 0)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "PAYMENT_ALLOCATIONS_MISSING", severity: "blocker", message: "At least one payment allocation is required.",
            source_object_type: "payment_posting", source_object_id: null, field_path: "allocations",
        }));
    request.allocations.forEach((allocation, index) => {
        if (!(0, common_1.hasAnyAllocationTargets)(allocation))
            (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
                rule_code: "PAYMENT_ALLOCATION_TARGET_MISSING", severity: "blocker",
                message: "Each allocation must target a claim, line, encounter, or client.",
                source_object_type: "payment_posting", source_object_id: null, field_path: `allocations[${index}]`,
            }));
        if (!(0, common_1.isPositiveMoneyString)(allocation.allocated_amount))
            (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
                rule_code: "PAYMENT_ALLOCATION_AMOUNT_INVALID", severity: "blocker", message: "Allocation amount must be greater than zero.",
                source_object_type: "payment_posting", source_object_id: null, field_path: `allocations[${index}].allocated_amount`,
            }));
    });
    if (sumAllocations(request.allocations) <= 0)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "PAYMENT_TOTAL_INVALID", severity: "blocker", message: "Total posted amount must be greater than zero.",
            source_object_type: "payment_posting", source_object_id: null,
        }));
    if (existing_posting)
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "PAYMENT_POSTING_REFERENCE_EXISTS", severity: "warning",
            message: "Posting reference already exists and may indicate a duplicate post.",
            source_object_type: "payment_posting", source_object_id: existing_posting.id,
        }));
    return (0, common_1.finalizeReadiness)(result);
}
