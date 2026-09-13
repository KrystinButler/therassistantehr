"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(orgId) {
        this.orgId = orgId;
    }
    scope(items, getOrganizationId) {
        return items.filter((item) => getOrganizationId(item) === this.orgId);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map