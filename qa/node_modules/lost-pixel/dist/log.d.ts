import type { ShotMode } from './types';
type LogLevel = 'info' | 'error' | 'warn' | 'debug';
type LogEntry = {
    timestamp: Date;
    level: LogLevel;
    item?: {
        shotMode: ShotMode;
        uniqueItemId: string;
        itemIndex: number;
        totalItems: number;
    };
    source: 'process' | 'browser';
    context: 'general' | 'api' | 'console' | 'network' | 'timeout' | 'config';
    content: unknown[];
};
export type LogMemory = LogEntry[];
export declare const logMemory: LogMemory;
export declare const log: {
    item: (item: LogEntry["item"]) => {
        process(level: LogEntry["level"], context: LogEntry["context"], ...content: unknown[]): void;
        browser(level: LogEntry["level"], context: LogEntry["context"], ...content: unknown[]): void;
    };
    process(level: LogEntry["level"], context: LogEntry["context"], ...content: unknown[]): void;
    browser(level: LogEntry["level"], context: LogEntry["context"], ...content: unknown[]): void;
};
export {};
