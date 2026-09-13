declare const prisma: {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    status(): {
        communications: number;
        documents: number;
        mode: string;
        users: number;
        workQueues: number;
    };
};
export default prisma;
//# sourceMappingURL=prisma.d.ts.map