import { type Schema } from './schema';
export interface PaginationQuery {
    order?: 'asc' | 'desc';
    page: number;
    pageSize: number;
    sort?: string;
}
export declare const paginationSchema: Schema<PaginationQuery>;
export declare const idParamSchema: Schema<{
    id: string;
}>;
//# sourceMappingURL=common.schemas.d.ts.map