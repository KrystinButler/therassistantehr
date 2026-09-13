"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseAlertRepository = createSupabaseAlertRepository;
const helpers_1 = require("./helpers");
function createSupabaseAlertRepository(db) {
    return {
        async listOpenByClaimId(organization_id, claim_id) {
            return (0, helpers_1.expectMany)(db
                .from("billing_alerts")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("source_object_type", "claim")
                .eq("source_object_id", claim_id)
                .eq("status", "open")
                .is("archived_at", null)
                .order("created_at", { ascending: false }));
        },
        async listOpenByEncounterId(organization_id, encounter_id) {
            return (0, helpers_1.expectMany)(db
                .from("billing_alerts")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("source_object_type", "encounter")
                .eq("source_object_id", encounter_id)
                .eq("status", "open")
                .is("archived_at", null)
                .order("created_at", { ascending: false }));
        },
    };
}
