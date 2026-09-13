export declare class ReportingService {
    static generateReport(orgId: string, reportType: string): Promise<{
        generatedAt: string;
        organizationId: string;
        report: {
            communicationCount: number;
            documentCount: number;
            reportType: string;
            workQueueCount: number;
        };
    }>;
}
//# sourceMappingURL=reporting.service.d.ts.map