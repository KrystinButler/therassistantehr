"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
exports.badRequest = badRequest;
exports.notFound = notFound;
exports.ok = ok;
function asyncHandler(handler) {
    return function wrapped(req, res, next) {
        handler(req, res, next).catch(next);
    };
}
function badRequest(res, error, details) {
    res.status(400).json({ error, details: details ?? null });
}
function notFound(res, error) {
    res.status(404).json({ error });
}
function ok(res, data) {
    res.status(200).json(data);
}
