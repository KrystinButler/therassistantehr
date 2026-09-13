"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEncounterCompletion = validateEncounterCompletion;
const common_1 = require("./common");
function validateEncounterCompletion(input) {
    const result = (0, common_1.emptyReadiness)();
    const { encounter, note, diagnoses, service_lines } = input;
    if (!encounter.started_at)
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "ENCOUNTER_STARTED_AT_MISSING", severity: "warning", message: "Encounter start time is missing.",
            source_object_type: "encounter", source_object_id: encounter.id, field_path: "started_at",
        }));
    if (!encounter.ended_at)
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "ENCOUNTER_ENDED_AT_MISSING", severity: "warning", message: "Encounter end time is missing.",
            source_object_type: "encounter", source_object_id: encounter.id, field_path: "ended_at",
        }));
    if (!note && encounter.note_status !== "not_started")
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "ENCOUNTER_NOTE_RECORD_MISSING", severity: "warning", message: "Encounter note record is missing.",
            source_object_type: "encounter", source_object_id: encounter.id,
        }));
    if (encounter.note_status !== "signed")
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "ENCOUNTER_NOTE_UNSIGNED", severity: "blocker", message: "Documentation must be signed before encounter completion.",
            source_object_type: "encounter", source_object_id: encounter.id, field_path: "note_status",
        }));
    if (diagnoses.length === 0)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "ENCOUNTER_NO_DIAGNOSIS", severity: "blocker", message: "At least one diagnosis is required.",
            source_object_type: "encounter", source_object_id: encounter.id,
        }));
    if (service_lines.length === 0)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "ENCOUNTER_NO_SERVICE_LINES", severity: "blocker", message: "At least one service line is required.",
            source_object_type: "encounter", source_object_id: encounter.id,
        }));
    for (const line of service_lines) {
        if ((0, common_1.isBlank)(line.cpt_hcpcs_code))
            (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
                rule_code: "SERVICE_LINE_CPT_MISSING", severity: "blocker", message: "Service line CPT/HCPCS code is required.",
                source_object_type: "claim_service_line", source_object_id: line.id, field_path: "cpt_hcpcs_code",
            }));
        if (!(0, common_1.isPositiveMoneyString)(line.units))
            (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
                rule_code: "SERVICE_LINE_UNITS_INVALID", severity: "blocker", message: "Service line units must be greater than zero.",
                source_object_type: "claim_service_line", source_object_id: line.id, field_path: "units",
            }));
        if (!(0, common_1.isPositiveMoneyString)(line.charge_amount))
            (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
                rule_code: "SERVICE_LINE_CHARGE_INVALID", severity: "blocker", message: "Service line charge amount must be greater than zero.",
                source_object_type: "claim_service_line", source_object_id: line.id, field_path: "charge_amount",
            }));
    }
    return (0, common_1.finalizeReadiness)(result);
}
