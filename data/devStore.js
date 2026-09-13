"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devStore = exports.dashboardSnapshots = exports.devCommunications = exports.devDocuments = exports.devWorkQueues = exports.devUsers = exports.defaultUserId = exports.defaultOrganizationId = void 0;
exports.buildInlineDocumentUrl = buildInlineDocumentUrl;
const crypto_1 = require("crypto");
exports.defaultOrganizationId = '11111111-1111-4111-8111-111111111111';
exports.defaultUserId = '22222222-2222-4222-8222-222222222222';
const now = new Date();
const isoHoursAgo = (hours) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
const isoDaysFromNow = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
exports.devUsers = [
    {
        email: 'admin@thera.local',
        id: exports.defaultUserId,
        organizationId: exports.defaultOrganizationId,
        role: 'organization_admin',
    },
    {
        email: 'biller@thera.local',
        id: '33333333-3333-4333-8333-333333333333',
        organizationId: exports.defaultOrganizationId,
        role: 'biller',
    },
    {
        email: 'support@thera.local',
        id: '44444444-4444-4444-8444-444444444444',
        organizationId: exports.defaultOrganizationId,
        role: 'support_staff',
    },
    {
        email: 'readonly@thera.local',
        id: '55555555-5555-4555-8555-555555555555',
        organizationId: exports.defaultOrganizationId,
        role: 'read_only',
    },
];
exports.devWorkQueues = [
    {
        assignedUserId: '33333333-3333-4333-8333-333333333333',
        claimId: (0, crypto_1.randomUUID)(),
        createdAt: isoHoursAgo(18),
        createdBy: exports.defaultUserId,
        dueDate: isoDaysFromNow(1),
        id: '77777777-7777-4777-8777-777777777777',
        notes: [
            {
                comment: 'Verify ERA remittance details before follow-up.',
                createdAt: isoHoursAgo(12),
                id: (0, crypto_1.randomUUID)(),
                userId: exports.defaultUserId,
            },
        ],
        organizationId: exports.defaultOrganizationId,
        patientId: (0, crypto_1.randomUUID)(),
        priority: 'high',
        type: 'claim_follow_up',
        updatedAt: isoHoursAgo(12),
        updatedBy: exports.defaultUserId,
    },
    {
        assignedUserId: '44444444-4444-4444-8444-444444444444',
        createdAt: isoHoursAgo(30),
        createdBy: exports.defaultUserId,
        dueDate: isoDaysFromNow(3),
        id: '88888888-8888-4888-8888-888888888888',
        notes: [],
        organizationId: exports.defaultOrganizationId,
        priority: 'medium',
        taskId: (0, crypto_1.randomUUID)(),
        type: 'document_expiration',
        updatedAt: isoHoursAgo(4),
        updatedBy: '44444444-4444-4444-8444-444444444444',
    },
];
exports.devDocuments = [
    {
        category: 'intake',
        createdAt: isoHoursAgo(48),
        expiresAt: isoDaysFromNow(30),
        id: '99999999-9999-4999-8999-999999999999',
        mimeType: 'application/pdf',
        name: 'consent-form.pdf',
        organizationId: exports.defaultOrganizationId,
        size: 48120,
        tags: ['consent', 'new-patient'],
        updatedAt: isoHoursAgo(48),
        uploadedBy: exports.defaultUserId,
        url: `documents/${exports.defaultOrganizationId}/consent-form.pdf`,
    },
];
exports.devCommunications = [
    {
        body: 'Claim follow-up reminder sent to payer queue.',
        channel: 'in_app',
        createdAt: isoHoursAgo(6),
        id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        organizationId: exports.defaultOrganizationId,
        recipientId: '33333333-3333-4333-8333-333333333333',
        senderId: exports.defaultUserId,
        status: 'reminder',
        subject: 'Follow-up reminder',
        updatedAt: isoHoursAgo(6),
    },
    {
        body: 'Document expiring in 30 days.',
        channel: 'email',
        createdAt: isoHoursAgo(24),
        id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        organizationId: exports.defaultOrganizationId,
        recipientId: '44444444-4444-4444-8444-444444444444',
        senderId: exports.defaultUserId,
        status: 'alert',
        subject: 'Expiration warning',
        updatedAt: isoHoursAgo(24),
    },
];
exports.dashboardSnapshots = {
    [exports.defaultOrganizationId]: {
        billingAlertsCount: 3,
        claimsByAgingBucket: [
            { _count: { _all: 7 }, agingBucket: '0-30' },
            { _count: { _all: 4 }, agingBucket: '31-60' },
            { _count: { _all: 2 }, agingBucket: '61-90' },
        ],
        claimsByPayer: [
            { _count: { _all: 8 }, payerId: 'payer-blue' },
            { _count: { _all: 5 }, payerId: 'payer-green' },
        ],
        collectionRate: 0.73,
        collectionsThisMonth: 14320,
        denialsByCARC: [
            { _count: { _all: 3 }, carcCode: '16' },
            { _count: { _all: 2 }, carcCode: '45' },
        ],
        denialsByRARC: [
            { _count: { _all: 2 }, rarcCode: 'N130' },
            { _count: { _all: 1 }, rarcCode: 'M51' },
        ],
        deniedClaimsCount: 5,
        insuranceAR: 13100,
        missingClaimsCount: 2,
        missingEligibilityCount: 1,
        missingNotesCount: 2,
        noResponseClaims: 4,
        overdueTasksCount: 3,
        patientAR: 5240,
        paymentsPostedThisMonth: 19600,
        productivityByProvider: [
            { _sum: { value: 82 }, providerId: 'provider-a' },
            { _sum: { value: 76 }, providerId: 'provider-b' },
        ],
        revenueByPayer: [
            { _sum: { amount: 9120 }, payerId: 'payer-blue' },
            { _sum: { amount: 6480 }, payerId: 'payer-green' },
        ],
        revenueByProvider: [
            { _sum: { amount: 10420 }, providerId: 'provider-a' },
            { _sum: { amount: 9180 }, providerId: 'provider-b' },
        ],
        revenueTrendByMonth: [
            { _sum: { amount: 15200 }, month: '2026-02' },
            { _sum: { amount: 17640 }, month: '2026-03' },
            { _sum: { amount: 19600 }, month: '2026-04' },
        ],
        totalAR: 18340,
        totalClaimsOutstanding: 13,
        totalClaimsSubmittedToday: 6,
    },
};
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
exports.devStore = {
    defaultOrganizationId: exports.defaultOrganizationId,
    defaultUserId: exports.defaultUserId,
    getDashboardSnapshot(organizationId) {
        const snapshot = exports.dashboardSnapshots[organizationId];
        return snapshot ? clone(snapshot) : undefined;
    },
    listCommunications(organizationId) {
        return clone(exports.devCommunications.filter((item) => item.organizationId === organizationId));
    },
    listDocuments(organizationId) {
        return clone(exports.devDocuments.filter((item) => item.organizationId === organizationId));
    },
    listUsers(organizationId) {
        return clone(exports.devUsers.filter((item) => item.organizationId === organizationId));
    },
    listWorkQueues(organizationId) {
        return clone(exports.devWorkQueues.filter((item) => item.organizationId === organizationId));
    },
};
function buildInlineDocumentUrl(organizationId, file, documentId) {
    const safeName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    return `documents/${organizationId}/${documentId}-${safeName}`;
}
//# sourceMappingURL=devStore.js.map