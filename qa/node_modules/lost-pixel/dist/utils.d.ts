import { type BrowserType } from 'playwright-core';
import type { ShotItem } from './types';
type FilenameWithPath = {
    name: string;
    path: string;
};
type FilenameWithAllPaths = {
    name: string;
    path: string;
    pathCurrent?: string;
};
type Files = {
    baseline: FilenameWithPath[];
    current: FilenameWithPath[];
    difference: FilenameWithPath[];
};
export type Changes = {
    difference: FilenameWithAllPaths[];
    deletion: FilenameWithAllPaths[];
    addition: FilenameWithAllPaths[];
};
export declare const isUpdateMode: () => boolean;
export declare const isSitemapPageGenMode: () => boolean;
export declare const isDockerMode: () => boolean;
export declare const isLocalDebugMode: () => boolean;
export declare const shallGenerateMeta: () => boolean;
export declare const getChanges: (files: Files) => Changes;
type ExtendFileName = {
    fileName: string;
    extension: 'after' | 'before' | 'difference';
};
export declare const extendFileName: ({ fileName, extension }: ExtendFileName) => string;
export declare const createShotsFolders: () => void;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const removeFilesInFolder: (path: string, excludePaths?: string[]) => void;
export declare const getBrowser: () => BrowserType;
export declare const getBrowsers: () => BrowserType[];
export declare const getVersion: () => string | void;
export declare const readDirIntoShotItems: (path: string) => ShotItem[];
export declare const parseHrtimeToSeconds: (hrtime: [number, number]) => string;
export declare const exitProcess: (properties: {
    runDuration?: number;
    shotsNumber?: number;
    error?: unknown;
    exitCode?: 0 | 1;
}) => Promise<void>;
export declare const hashFile: (filePath: string) => string;
export declare const featureNotSupported: (feature: string) => never;
export declare const launchBrowser: (_browser?: BrowserType) => Promise<import("playwright-core").Browser>;
export {};
