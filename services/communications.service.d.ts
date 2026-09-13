import { type CommunicationChannel, type CommunicationRecord, type CommunicationStatus } from '../data/devStore';
export interface CommunicationMutationInput {
    body?: string;
    channel?: CommunicationChannel;
    recipientId?: string;
    senderId?: string;
    status?: CommunicationStatus;
    subject?: string;
}
export interface CommunicationListQuery {
    channel?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    order?: 'asc' | 'desc';
    page: number;
    pageSize: number;
    recipientId?: string;
    senderId?: string;
    sort?: string;
    status?: string;
}
export interface CommunicationExportQuery {
    format: 'csv' | 'pdf';
    status?: string;
}
export declare class CommunicationsService {
    static create(organizationId: string, data: CommunicationMutationInput, actorUserId: string): Promise<CommunicationRecord>;
    static list(organizationId: string, query: CommunicationListQuery): Promise<{
        items: CommunicationRecord[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    static export(organizationId: string, query: CommunicationExportQuery): Promise<string>;
    static getById(organizationId: string, id: string): Promise<CommunicationRecord>;
    static update(organizationId: string, id: string, data: CommunicationMutationInput): Promise<CommunicationRecord>;
    static delete(organizationId: string, id: string): Promise<void>;
}
//# sourceMappingURL=communications.service.d.ts.map