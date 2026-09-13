import type { NextFunction, Request, Response } from 'express';
import type { User } from '../types/context';
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): void;
export declare function getAuthenticatedUser(req: Request): User;
//# sourceMappingURL=auth.middleware.d.ts.map