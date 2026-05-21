import type { BrowserType } from 'playwright-core';
import { type PageScreenshotParameter } from '../config';
import type { Mask, ShotItem } from '../types';
export declare const generatePageShotItems: (pages: PageScreenshotParameter[], baseUrl: string, mask?: Mask[], modeBreakpoints?: number[], browser?: BrowserType) => ShotItem[];
export declare const getPagesFromExternalLoader: () => Promise<{
    path: string;
    threshold: number;
    waitBeforeScreenshot: number;
    name: string;
    mask?: {
        selector: string;
    }[] | undefined;
    viewport?: {
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    breakpoints?: number[] | undefined;
}[]>;
