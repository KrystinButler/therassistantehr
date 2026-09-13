export declare class BaseRepository<T> {
    protected readonly orgId: string;
    constructor(orgId: string);
    protected scope(items: T[], getOrganizationId: (item: T) => string): T[];
}
//# sourceMappingURL=base.repository.d.ts.map