export declare class IntegrationService {
    static syncWithExternalSystem(orgId: string, integrationId: string): Promise<{
        integrationId: string;
        organizationId: string;
        status: string;
        syncedAt: string;
    }>;
}
//# sourceMappingURL=integration.service.d.ts.map