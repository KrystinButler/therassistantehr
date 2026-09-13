export declare class DashboardService {
    static getMetrics(orgId: string): Promise<{
        billingAlertsCount: number;
        missingClaimsCount: number;
        noResponseClaims: number;
        claimsByAgingBucket: Array<{
            _count: {
                _all: number;
            };
            agingBucket: string;
        }>;
        claimsByPayer: Array<{
            _count: {
                _all: number;
            };
            payerId: string;
        }>;
        collectionRate: number;
        collectionsThisMonth: number;
        denialsByCARC: Array<{
            _count: {
                _all: number;
            };
            carcCode: string;
        }>;
        denialsByRARC: Array<{
            _count: {
                _all: number;
            };
            rarcCode: string;
        }>;
        deniedClaimsCount: number;
        insuranceAR: number;
        missingEligibilityCount: number;
        missingNotesCount: number;
        overdueTasksCount: number;
        patientAR: number;
        paymentsPostedThisMonth: number;
        productivityByProvider: Array<{
            _sum: {
                value: number;
            };
            providerId: string;
        }>;
        revenueByPayer: Array<{
            _sum: {
                amount: number;
            };
            payerId: string;
        }>;
        revenueByProvider: Array<{
            _sum: {
                amount: number;
            };
            providerId: string;
        }>;
        revenueTrendByMonth: Array<{
            _sum: {
                amount: number;
            };
            month: string;
        }>;
        totalAR: number;
        totalClaimsOutstanding: number;
        totalClaimsSubmittedToday: number;
    }>;
}
//# sourceMappingURL=dashboard.service.d.ts.map