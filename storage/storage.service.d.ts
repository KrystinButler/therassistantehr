import type { UploadedFile } from '../types/context';
export declare class StorageService {
    static uploadFile(orgId: string, file: UploadedFile): Promise<{
        mimeType: string;
        size: number;
        url: string;
    }>;
}
//# sourceMappingURL=storage.service.d.ts.map