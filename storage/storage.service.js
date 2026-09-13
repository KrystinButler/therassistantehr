"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const devStore_1 = require("../data/devStore");
class StorageService {
    static async uploadFile(orgId, file) {
        const url = (0, devStore_1.buildInlineDocumentUrl)(orgId, file, `storage-${Date.now()}`);
        return {
            mimeType: file.mimetype,
            size: file.size,
            url,
        };
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map