export interface User {
    id: string;
    organizationId: string;
    role: string;
    email: string;
}
export interface UploadedFile {
    buffer: Buffer;
    encoding?: BufferEncoding;
    mimetype: string;
    originalname: string;
    size: number;
}
export interface RequestContext {
    user?: User;
    requestId?: string;
}
//# sourceMappingURL=context.d.ts.map