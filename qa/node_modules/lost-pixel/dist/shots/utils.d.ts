import type { BrowserType, Page } from 'playwright-core';
import type { log } from '../log';
export declare const waitForNetworkRequests: ({ page, logger, timeout, waitForFirstRequest, waitForLastRequest, ignoreUrls, }: {
    page: Page;
    logger: ReturnType<typeof log.item>;
    timeout?: number;
    waitForFirstRequest?: number;
    waitForLastRequest?: number;
    ignoreUrls?: string[];
}) => Promise<unknown>;
export declare const resizeViewportToFullscreen: ({ page }: {
    page: Page;
}) => Promise<void>;
export declare const selectBreakpoints: (topLevelBreakpoints?: number[], modeBreakpoints?: number[], shotBreakpoints?: number[]) => number[];
export declare const generateLabel: ({ breakpoint, browser, }: {
    breakpoint?: number;
    browser?: BrowserType;
}) => string;
