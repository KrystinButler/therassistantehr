"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachInlineFile = attachInlineFile;
const http_1 = require("../lib/http");
function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
function readString(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw (0, http_1.createHttpError)(400, `${fieldName} must be a non-empty string`);
    }
    return value.trim();
}
function attachInlineFile(req, _res, next) {
    try {
        if (req.file || !isRecord(req.body) || !('file' in req.body)) {
            next();
            return;
        }
        const rawFile = req.body.file;
        if (!isRecord(rawFile)) {
            throw (0, http_1.createHttpError)(400, 'file must be an object');
        }
        const originalname = readString(rawFile.name, 'file.name');
        const content = readString(rawFile.content, 'file.content');
        const encoding = rawFile.encoding === 'base64' ? 'base64' : 'utf8';
        const mimetype = typeof rawFile.mimeType === 'string' && rawFile.mimeType.trim() !== ''
            ? rawFile.mimeType
            : 'application/octet-stream';
        const buffer = Buffer.from(content, encoding);
        req.file = {
            buffer,
            encoding,
            mimetype,
            originalname,
            size: buffer.byteLength,
        };
        delete req.body.file;
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=file.middleware.js.map