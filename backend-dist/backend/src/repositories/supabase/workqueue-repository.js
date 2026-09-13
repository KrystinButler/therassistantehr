"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseWorkqueueRepository = createSupabaseWorkqueueRepository;
const helpers_1 = require("./helpers");
function createSupabaseWorkqueueRepository(db) {
    return {
        async findOpenBySource(organization_id, source_object_type, source_object_id) {
            return (0, helpers_1.expectOne)(db
                .from("workqueue_items")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("source_object_type", source_object_type)
                .eq("source_object_id", source_object_id)
                .in("status", ["open", "in_progress", "blocked"])
                .is("archived_at", null)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle());
        },
        async create(item) {
            const { data, error } = await db
                .from("workqueue_items")
                .insert(item)
                .select("*")
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        async update(item) {
            const { data, error } = await db
                .from("workqueue_items")
                .update(item)
                .eq("organization_id", item.organization_id)
                .eq("id", item.id)
                .select("*")
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        async listByClaimId(organization_id, claim_id) {
            return (0, helpers_1.expectMany)(db
                .from("workqueue_items")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("claim_id", claim_id)
                .is("archived_at", null)
                .order("created_at", { ascending: false }));
        },
        async listByEncounterId(organization_id, encounter_id) {
            return (0, helpers_1.expectMany)(db
                .from("workqueue_items")
                .select("*")
                .eq("organization_id", organization_id)
                .eq("encounter_id", encounter_id)
                .is("archived_at", null)
                .order("created_at", { ascending: false }));
        },
    };
}
