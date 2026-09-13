import { Request, Response, NextFunction } from 'express';
export type Role = 'super_admin' | 'organization_admin' | 'biller' | 'clinician' | 'supervisor' | 'support_staff' | 'read_only';
export declare const Permissions: Record<Role, string[]>;
export declare function requireRole(roles: Role[]): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare function requirePermission(permission: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=rbac.middleware.d.ts.map