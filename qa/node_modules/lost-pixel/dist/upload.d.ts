import { type PlatformModeConfig } from './config';
import type { ExtendedShotItem } from './types';
export declare const uploadRequiredShots: ({ config, apiToken, uploadToken, uploadUrl, requiredFileHashes, extendedShotItems, }: {
    config: PlatformModeConfig;
    apiToken: string;
    uploadToken: string;
    uploadUrl: string;
    requiredFileHashes: string[];
    extendedShotItems: ExtendedShotItem[];
}) => Promise<boolean>;
