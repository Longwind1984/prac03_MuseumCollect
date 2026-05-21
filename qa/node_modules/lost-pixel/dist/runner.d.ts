import type { GenerateOnlyModeConfig, PlatformModeConfig } from './config';
export declare const runner: (config: GenerateOnlyModeConfig) => Promise<void>;
export declare const getPlatformApiToken: (config: PlatformModeConfig) => Promise<string>;
export declare const platformRunner: (config: PlatformModeConfig, apiToken: string) => Promise<void>;
