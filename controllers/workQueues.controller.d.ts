import type { NextFunction, Request, Response } from 'express';
export declare class WorkQueuesController {
    static list(req: Request, res: Response, next: NextFunction): Promise<void>;
    static create(req: Request, res: Response, next: NextFunction): Promise<void>;
    static update(req: Request, res: Response, next: NextFunction): Promise<void>;
    static addComment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=workQueues.controller.d.ts.map