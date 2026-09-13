"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseServiceClient = createSupabaseServiceClient;
const supabase_js_1 = require("@supabase/supabase-js");
function createSupabaseServiceClient() {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !serviceKey) {
        throw new Error("SUPABASE_URL and SUPABASE_SERVICE_KEY are required");
    }
    return (0, supabase_js_1.createClient)(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}
