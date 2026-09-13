"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.paginationSchema = void 0;
const schema_1 = require("./schema");
exports.paginationSchema = {
    parse(input) {
        const record = (0, schema_1.ensureRecord)(input, 'query');
        return {
            order: (0, schema_1.readEnumValue)(record, 'order', ['asc', 'desc'], { required: false }),
            page: (0, schema_1.readInt)(record, 'page', { defaultValue: 1, min: 1 }),
            pageSize: (0, schema_1.readInt)(record, 'pageSize', { defaultValue: 20, max: 100, min: 1 }),
            sort: typeof record.sort === 'string' ? record.sort : undefined,
        };
    },
};
exports.idParamSchema = {
    parse(input) {
        const record = (0, schema_1.ensureRecord)(input, 'params');
        return { id: (0, schema_1.readRequiredUuid)(record, 'id') };
    },
};
//# sourceMappingURL=common.schemas.js.map