"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
exports.requireRole = requireRole;
exports.requirePermission = requirePermission;
exports.Permissions = {
    super_admin: [
        'system:full_access',
    ],
    organization_admin: [
        'org:settings',
        'org:feature_flags',
        'org:integrations',
        'org:reports',
        'org:patients',
        'org:billing',
    ],
    biller: [
        'claims:manage',
        'denials:manage',
        'payments:manage',
        'era:manage',
        'eligibility:manage',
        'work_queues:manage',
        'tickets:manage',
        'appeals:manage',
        'reporting:access',
    ],
    clinician: [
        'schedule:own',
        'clients:own',
        'balances:own',
        'eligibility:own',
        'docusistant:access',
        'notes:own',
        'treatment_plans:own',
        'superbills:own',
        'billing_alerts:own',
    ],
    supervisor: [
        'notes:review',
        'notes:sign',
        'notes:audit',
        'treatment_plans:review',
        'reports:productivity',
    ],
    support_staff: [
        'reminders:manage',
        'scheduling:manage',
        'documents:upload',
        'tickets:route',
        'intake:track',
    ],
    read_only: [
        'reporting:access',
    ],
};
function requireRole(roles) {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ error: 'Forbidden: insufficient role' });
        }
        next();
    };
}
function requirePermission(permission) {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole) {
            return res.status(403).json({ error: 'Forbidden: no role' });
        }
        const allowed = userRole === 'super_admin' ||
            exports.Permissions[userRole]?.includes(permission) ||
            exports.Permissions[userRole]?.includes('system:full_access');
        if (!allowed) {
            return res.status(403).json({ error: 'Forbidden: insufficient permission' });
        }
        next();
    };
}
//# sourceMappingURL=rbac.middleware.js.map