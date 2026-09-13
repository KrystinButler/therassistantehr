"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseClientRepository = createSupabaseClientRepository;
const helpers_1 = require("./helpers");
function createSupabaseClientRepository(db) {
    return {
        async getById(organization_id, client_id) {
            return (0, helpers_1.expectOne)(db
                .from("clients")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("id", client_id)
                .is("archived_at", null)
                .maybeSingle());
        },
        async getBillingSnapshot(_organization_id, client_id) {
            return {
                client_id,
                insurance_balance: "0.00",
                patient_balance: "0.00",
                total_balance: "0.00",
                unposted_amount: "0.00",
            };
        },
    };
}
