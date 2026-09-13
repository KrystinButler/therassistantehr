"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectOne = expectOne;
exports.expectMany = expectMany;
exports.buildScheduleDateRange = buildScheduleDateRange;
exports.mapCount = mapCount;
async function expectOne(query) {
    const { data, error } = await query;
    if (error)
        throw new Error(error.message);
    return data;
}
async function expectMany(query) {
    const { data, error } = await query;
    if (error)
        throw new Error(error.message);
    return data ?? [];
}
function buildScheduleDateRange(date) {
    const start = `${date}T00:00:00.000Z`;
    const end = `${date}T23:59:59.999Z`;
    return { start, end };
}
function mapCount(rows) {
    return Array.isArray(rows) ? rows.length : 0;
}
