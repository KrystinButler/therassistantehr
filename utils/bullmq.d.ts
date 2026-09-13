export interface QueueJob<TData = unknown> {
    attemptsMade: number;
    completedAt?: string;
    createdAt: string;
    data: TData;
    failedReason?: string;
    id: string;
    name: string;
    queueName: string;
    result?: unknown;
}
export interface QueueHandle<TData = unknown> {
    add(name: string, data: TData): Promise<QueueJob<TData>>;
    getJobs(): QueueJob<TData>[];
    name: string;
}
export interface WorkerHandle<TData = unknown> {
    name: string;
    process(job: QueueJob<TData>): Promise<unknown>;
    queueName: string;
}
type JobProcessor<TData = unknown> = (job: QueueJob<TData>) => Promise<unknown> | unknown;
export declare function createBullQueue<TData = unknown>(name: string): QueueHandle<TData>;
export declare function createBullWorker<TData = unknown>(name: string, processor: JobProcessor<TData>): WorkerHandle<TData>;
export declare function getQueueSnapshot(name: string): {
    jobs: QueueJob<unknown>[];
    name: string;
    workerCount: number;
};
export declare function listRegisteredQueues(): string[];
export {};
//# sourceMappingURL=bullmq.d.ts.map