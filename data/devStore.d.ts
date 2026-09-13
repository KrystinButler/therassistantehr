import type { User, UploadedFile } from '../types/context';
export type CommunicationChannel = 'email' | 'sms' | 'push' | 'in_app' | 'webhook';
export type CommunicationStatus = 'system' | 'user' | 'reminder' | 'alert' | 'info' | 'warning' | 'error';
export interface WorkQueueComment {
    comment: string;
    createdAt: string;
    id: string;
    userId: string;
}
export interface WorkQueueRecord {
    alertId?: string;
    assignedUserId?: string;
    claimId?: string;
    createdAt: string;
    createdBy: string;
    documentId?: string;
    dueDate?: string;
    eraId?: string;
    id: string;
    notes: WorkQueueComment[];
    organizationId: string;
    patientId?: string;
    payerId?: string;
    priority: string;
    snoozeDate?: string;
    taskId?: string;
    ticketId?: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
}
export interface DocumentRecord {
    category: string;
    createdAt: string;
    expiresAt?: string;
    id: string;
    mimeType: string;
    name: string;
    organizationId: string;
    size: number;
    tags: string[];
    updatedAt: string;
    uploadedBy: string;
    url: string;
}
export interface CommunicationRecord {
    body: string;
    channel: CommunicationChannel;
    createdAt: string;
    id: string;
    organizationId: string;
    recipientId: string;
    senderId: string;
    status: CommunicationStatus;
    subject?: string;
    updatedAt: string;
}
export interface DashboardSnapshot {
    billingAlertsCount: number;
    claimsByAgingBucket: Array<{
        _count: {
            _all: number;
        };
        agingBucket: string;
    }>;
    claimsByPayer: Array<{
        _count: {
            _all: number;
        };
        payerId: string;
    }>;
    collectionRate: number;
    collectionsThisMonth: number;
    denialsByCARC: Array<{
        _count: {
            _all: number;
        };
        carcCode: string;
    }>;
    denialsByRARC: Array<{
        _count: {
            _all: number;
        };
        rarcCode: string;
    }>;
    deniedClaimsCount: number;
    insuranceAR: number;
    missingClaimsCount: number;
    missingEligibilityCount: number;
    missingNotesCount: number;
    noResponseClaims: number;
    overdueTasksCount: number;
    patientAR: number;
    paymentsPostedThisMonth: number;
    productivityByProvider: Array<{
        _sum: {
            value: number;
        };
        providerId: string;
    }>;
    revenueByPayer: Array<{
        _sum: {
            amount: number;
        };
        payerId: string;
    }>;
    revenueByProvider: Array<{
        _sum: {
            amount: number;
        };
        providerId: string;
    }>;
    revenueTrendByMonth: Array<{
        _sum: {
            amount: number;
        };
        month: string;
    }>;
    totalAR: number;
    totalClaimsOutstanding: number;
    totalClaimsSubmittedToday: number;
}
export declare const defaultOrganizationId = "11111111-1111-4111-8111-111111111111";
export declare const defaultUserId = "22222222-2222-4222-8222-222222222222";
export declare const devUsers: User[];
export declare const devWorkQueues: WorkQueueRecord[];
export declare const devDocuments: DocumentRecord[];
export declare const devCommunications: CommunicationRecord[];
export declare const dashboardSnapshots: Record<string, DashboardSnapshot>;
export declare const devStore: {
    defaultOrganizationId: string;
    defaultUserId: string;
    getDashboardSnapshot(organizationId: string): DashboardSnapshot | undefined;
    listCommunications(organizationId: string): CommunicationRecord[];
    listDocuments(organizationId: string): DocumentRecord[];
    listUsers(organizationId: string): User[];
    listWorkQueues(organizationId: string): WorkQueueRecord[];
};
export declare function buildInlineDocumentUrl(organizationId: string, file: UploadedFile, documentId: string): string;
//# sourceMappingURL=devStore.d.ts.map