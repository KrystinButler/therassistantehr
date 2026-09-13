import type { NextFunction, Request, Response } from 'express';
export declare class DocumentsController {
    static upload(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getSignedUrl(req: Request, res: Response, next: NextFunction): Promise<void>;
    static list(req: Request, res: Response, next: NextFunction): Promise<void>;
    static update(req: Request, res: Response, next: NextFunction): Promise<void>;
    static delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=documents.controller.d.ts.map