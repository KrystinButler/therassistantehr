import { type DocumentRecord } from '../data/devStore';
import type { UploadedFile } from '../types/context';
interface DocumentUpdateInput {
    category?: string;
    expiresAt?: string;
    tags?: string[];
}
export declare class DocumentsService {
    static upload(file: UploadedFile, category: string, tags: string[] | undefined, expiresAt: string | undefined, organizationId: string, userId: string): Promise<DocumentRecord>;
    static getSignedUrl(id: string, organizationId: string): Promise<string>;
    static list(organizationId: string, filters: any): Promise<DocumentRecord[]>;
    static update(id: string, organizationId: string, data: DocumentUpdateInput): Promise<DocumentRecord>;
    static delete(id: string, organizationId: string): Promise<void>;
}
export {};
//# sourceMappingURL=documents.service.d.ts.map