import { type WorkQueueRecord } from '../data/devStore';
interface WorkQueueMutationInput {
    alertId?: string;
    assignedUserId?: string;
    claimId?: string;
    documentId?: string;
    dueDate?: string;
    eraId?: string;
    notes?: string;
    patientId?: string;
    payerId?: string;
    priority?: string;
    snoozeDate?: string;
    taskId?: string;
    ticketId?: string;
    type?: string;
}
export declare class WorkQueuesService {
    static list(organizationId: string, filters: any): Promise<WorkQueueRecord[]>;
    static create(organizationId: string, data: WorkQueueMutationInput, userId: string): Promise<WorkQueueRecord>;
    static update(organizationId: string, id: string, data: WorkQueueMutationInput, userId: string): Promise<WorkQueueRecord>;
    static addComment(organizationId: string, id: string, comment: string, userId: string): Promise<WorkQueueRecord>;
}
export {};
//# sourceMappingURL=workQueues.service.d.ts.map