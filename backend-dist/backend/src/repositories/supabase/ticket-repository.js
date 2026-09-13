"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseTicketRepository = createSupabaseTicketRepository;
const helpers_1 = require("./helpers");
function createSupabaseTicketRepository(db) {
    return {
        async listByClaimId(organization_id, claim_id) {
            return (0, helpers_1.expectMany)(db
                .from("support_tickets")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("source_object_type", "claim")
                .eq("source_object_id", claim_id)
                .is("archived_at", null)
                .order("created_at", { ascending: false }));
        },
    };
}
