"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClaimCreation = validateClaimCreation;
const encounter_readiness_1 = require("./encounter-readiness");
const common_1 = require("./common");
function validateClaimCreation(input) {
    const base = (0, encounter_readiness_1.validateEncounterCompletion)(input);
    const result = {
        ...(0, common_1.emptyReadiness)(),
        encounter_id: input.encounter.id,
        candidate_claim_id: input.existing_claim?.id ?? null,
        duplicate_detection_key: input.duplicate_detection_key,
        blockers: [...base.blockers],
        warnings: [...base.warnings],
    };
    if (input.existing_claim)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "CLAIM_DUPLICATE_ENCOUNTER", severity: "blocker", message: "A claim already exists for this encounter.",
            source_object_type: "claim", source_object_id: input.existing_claim.id,
        }));
    if (!input.insurance_policy) {
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "CLAIM_INSURANCE_POLICY_MISSING", severity: "blocker", message: "An insurance policy is required before claim creation.",
            source_object_type: "encounter", source_object_id: input.encounter.id,
        }));
    }
    else if ((0, common_1.isBlank)(input.insurance_policy.payer_id)) {
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "CLAIM_PAYER_ID_MISSING", severity: "blocker", message: "Insurance payer ID is required before claim creation.",
            source_object_type: "insurance_policy", source_object_id: input.insurance_policy.id, field_path: "payer_id",
        }));
    }
    const totalCharges = input.service_lines.reduce((sum, line) => sum + (Number(line.charge_amount || "0") || 0), 0);
    if (!(totalCharges > 0))
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "CLAIM_TOTAL_CHARGE_INVALID", severity: "blocker", message: "Claim total charges must be greater than zero.",
            source_object_type: "encounter", source_object_id: input.encounter.id,
        }));
    const dateOfService = input.encounter.date_of_service || input.encounter.service_date;
    if (!dateOfService)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "CLAIM_DATE_OF_SERVICE_MISSING", severity: "blocker", message: "Date of service is required before claim creation.",
            source_object_type: "encounter", source_object_id: input.encounter.id, field_path: "date_of_service",
        }));
    if (!input.duplicate_detection_key || input.duplicate_detection_key.trim().length === 0)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "CLAIM_DUPLICATE_KEY_MISSING", severity: "blocker", message: "Duplicate submission key could not be generated.",
            source_object_type: "encounter", source_object_id: input.encounter.id,
        }));
    if (!input.latest_eligibility)
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "ELIGIBILITY_MISSING", severity: "warning", message: "No eligibility check is on file.",
            source_object_type: "encounter", source_object_id: input.encounter.id,
        }));
    else if (input.latest_eligibility.eligibility_stale)
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "ELIGIBILITY_STALE_30D", severity: "warning", message: "Eligibility is older than 30 days.",
            source_object_type: "eligibility_check", source_object_id: input.latest_eligibility.id,
        }));
    if (input.active_authorization && !["approved", "not_required"].includes(input.active_authorization.authorization_status)) {
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "AUTH_REQUIRED_NOT_APPROVED", severity: "warning", message: "Authorization/referral may be required and is not approved.",
            source_object_type: "authorization_or_referral", source_object_id: input.active_authorization.id,
        }));
    }
    return (0, common_1.finalizeReadiness)(result);
}
