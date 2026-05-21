import { type LogMemory, log } from './log';
import type { PlatformModeConfig } from './config';
export type ShotConfig = {
    name: string;
    threshold?: number;
};
type ApiPayloadProcessShots = {
    uploadToken: string;
    config: {
        threshold?: number;
        shots?: ShotConfig[];
    };
    log: LogMemory;
    cacheKey?: string;
};
export declare const getApiToken: (config: PlatformModeConfig) => Promise<{
    apiToken: string;
}>;
export declare const sendInitToAPI: (config: PlatformModeConfig, apiToken: string) => Promise<Record<string, unknown>>;
export declare const sendFinalizeToAPI: (config: PlatformModeConfig, apiToken: string) => Promise<Record<string, unknown>>;
export declare const sendCheckCacheToAPI: (config: PlatformModeConfig, apiToken: string, cacheKey: string) => Promise<{
    cacheExists: boolean;
}>;
export declare const prepareUpload: (config: PlatformModeConfig, apiToken: string, shotNamesWithHashes: Array<{
    name: string;
    hash: string;
}>, cacheKey?: string) => Promise<{
    requiredFileHashes: string[];
    uploadToken: string;
    uploadUrl: string;
}>;
export declare const uploadShot: ({ config, apiToken, uploadToken, uploadUrl, name, file, logger, }: {
    config: PlatformModeConfig;
    apiToken: string;
    uploadToken: string;
    uploadUrl: string;
    name: string;
    file: string;
    logger?: ReturnType<typeof log.item>;
}) => Promise<{
    success: true;
    details: {
        projectId: string;
        commit: string;
        buildNumber: string;
        branchName: string;
        name: string;
    };
}>;
export declare const processShots: (config: PlatformModeConfig, apiToken: string, uploadToken: string, shotsConfig?: ApiPayloadProcessShots["config"]["shots"], cacheKey?: string) => Promise<{
    success: true;
}>;
export declare const sendRecordLogsToAPI: (config: PlatformModeConfig, apiToken: string) => Promise<void>;
export {};
