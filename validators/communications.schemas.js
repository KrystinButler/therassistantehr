"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationExportSchema = exports.communicationListQuerySchema = exports.communicationSearchSchema = exports.communicationUpdateSchema = exports.communicationCreateSchema = void 0;
const schema_1 = require("./schema");
const common_schemas_1 = require("./common.schemas");
const channelValues = ['email', 'sms', 'push', 'in_app', 'webhook'];
const statusValues = ['system', 'user', 'reminder', 'alert', 'info', 'warning', 'error'];
function parseCommunicationInput(input, mode) {
    const record = (0, schema_1.ensureRecord)(input, 'body');
    if (mode === 'create') {
        return (0, schema_1.omitUndefined)({
            body: (0, schema_1.readRequiredString)(record, 'body'),
            channel: (0, schema_1.readEnumValue)(record, 'channel', channelValues),
            recipientId: (0, schema_1.readRequiredUuid)(record, 'recipientId'),
            senderId: (0, schema_1.readRequiredUuid)(record, 'senderId'),
            status: (0, schema_1.readEnumValue)(record, 'status', statusValues, { required: false }),
            subject: (0, schema_1.readOptionalString)(record, 'subject', { maxLength: 255 }),
        });
    }
    return (0, schema_1.omitUndefined)({
        body: (0, schema_1.readOptionalString)(record, 'body'),
        channel: (0, schema_1.readEnumValue)(record, 'channel', channelValues, { required: false }),
        recipientId: (0, schema_1.readOptionalUuid)(record, 'recipientId'),
        senderId: (0, schema_1.readOptionalUuid)(record, 'senderId'),
        status: (0, schema_1.readEnumValue)(record, 'status', statusValues, { required: false }),
        subject: (0, schema_1.readOptionalString)(record, 'subject', { maxLength: 255 }),
    });
}
exports.communicationCreateSchema = {
    parse(input) {
        return parseCommunicationInput(input, 'create');
    },
};
exports.communicationUpdateSchema = {
    parse(input) {
        return parseCommunicationInput(input, 'update');
    },
};
exports.communicationSearchSchema = {
    parse(input) {
        const record = (0, schema_1.ensureRecord)(input, 'query');
        return (0, schema_1.omitUndefined)({
            channel: (0, schema_1.readOptionalString)(record, 'channel'),
            createdAtFrom: (0, schema_1.readOptionalDateTime)(record, 'createdAtFrom'),
            createdAtTo: (0, schema_1.readOptionalDateTime)(record, 'createdAtTo'),
            recipientId: (0, schema_1.readOptionalUuid)(record, 'recipientId'),
            senderId: (0, schema_1.readOptionalUuid)(record, 'senderId'),
            status: (0, schema_1.readOptionalString)(record, 'status'),
        });
    },
};
exports.communicationListQuerySchema = {
    parse(input) {
        const search = exports.communicationSearchSchema.parse(input);
        const pagination = common_schemas_1.paginationSchema.parse(input);
        return { ...pagination, ...search };
    },
};
exports.communicationExportSchema = {
    parse(input) {
        const record = (0, schema_1.ensureRecord)(input, 'query');
        return (0, schema_1.omitUndefined)({
            format: (0, schema_1.readEnumValue)(record, 'format', ['csv', 'pdf']),
            status: (0, schema_1.readOptionalString)(record, 'status'),
        });
    },
};
//# sourceMappingURL=communications.schemas.js.map