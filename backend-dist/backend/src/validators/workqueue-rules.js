"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRouteToBiller = validateRouteToBiller;
const common_1 = require("./common");
function validateRouteToBiller(input) {
    const result = (0, common_1.emptyReadiness)();
    const { request, encounter, claim, existing_open_workqueue_item } = input;
    if (request.source_object_type === "encounter" && !encounter) {
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "ROUTE_ENCOUNTER_NOT_FOUND", severity: "blocker", message: "Encounter was not found.",
            source_object_type: "encounter", source_object_id: request.source_object_id,
        }));
    }
    if (request.source_object_type === "claim" && !claim) {
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "ROUTE_CLAIM_NOT_FOUND", severity: "blocker", message: "Claim was not found.",
            source_object_type: "claim", source_object_id: request.source_object_id,
        }));
    }
    if ((0, common_1.hasValue)(existing_open_workqueue_item))
        (0, common_1.addWarning)(result, (0, common_1.makeRule)({
            rule_code: "ROUTE_EXISTING_OPEN_WORK_ITEM", severity: "warning", message: "An open workqueue item already exists for this source object.",
            source_object_type: "workqueue_item", source_object_id: existing_open_workqueue_item.id,
        }));
    if ((0, common_1.routeTitleForRequest)(request).length < 5)
        (0, common_1.addBlocker)(result, (0, common_1.makeRule)({
            rule_code: "ROUTE_TITLE_INVALID", severity: "blocker", message: "Workqueue title is required.",
            source_object_type: request.source_object_type, source_object_id: request.source_object_id,
        }));
    return (0, common_1.finalizeReadiness)(result);
}
