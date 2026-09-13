import { type Schema } from './schema';
import { type PaginationQuery } from './common.schemas';
declare const channelValues: readonly ["email", "sms", "push", "in_app", "webhook"];
declare const statusValues: readonly ["system", "user", "reminder", "alert", "info", "warning", "error"];
export interface CommunicationMutationInput {
    body?: string;
    channel?: (typeof channelValues)[number];
    recipientId?: string;
    senderId?: string;
    status?: (typeof statusValues)[number];
    subject?: string;
}
export declare const communicationCreateSchema: Schema<CommunicationMutationInput>;
export declare const communicationUpdateSchema: Schema<CommunicationMutationInput>;
export interface CommunicationSearchQuery {
    channel?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    recipientId?: string;
    senderId?: string;
    status?: string;
}
export declare const communicationSearchSchema: Schema<CommunicationSearchQuery>;
export declare const communicationListQuerySchema: Schema<CommunicationSearchQuery & PaginationQuery>;
export declare const communicationExportSchema: Schema<{
    format: 'csv' | 'pdf';
    status?: string;
}>;
export {};
//# sourceMappingURL=communications.schemas.d.ts.map