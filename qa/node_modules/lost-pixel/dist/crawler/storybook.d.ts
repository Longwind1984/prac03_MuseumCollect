import type { BrowserContext, BrowserType } from 'playwright-core';
import type { Mask, ShotItem } from '../types';
type ExtraShots = {
    name?: string;
    args?: Record<string, unknown>;
    prefix?: string;
    suffix?: string;
};
export type StoryParameters = {
    lostpixel?: {
        disable?: boolean;
        threshold?: number;
        waitBeforeScreenshot?: number;
        mask?: Mask[];
        breakpoints?: number[];
        args?: Record<string, unknown>;
        extraShots?: ExtraShots[];
        elementLocator?: string;
    };
    viewport?: {
        width?: number;
        height?: number;
    };
    fileName?: string;
};
export type Story = {
    id: string;
    kind: string;
    story: string;
    name?: string;
    title?: string;
    importPath?: string;
    parameters?: StoryParameters & {
        storyshots?: {
            disable?: boolean;
        };
    };
};
type CrawlerResult = {
    stories: Story[] | undefined;
};
export declare const getStoryBookUrl: (url: string) => string;
export declare const getIframeUrl: (url: string) => string;
export declare const collectStoriesViaWindowApi: (context: BrowserContext, url: string, isIframeUrl?: boolean) => Promise<CrawlerResult>;
export declare const collectStoriesViaStoriesJson: (context: BrowserContext, url: string) => Promise<{
    stories: Story[];
}>;
export declare const collectStories: (url: string) => Promise<CrawlerResult>;
export declare const generateStorybookShotItems: (baseUrl: string, stories: Story[], mask?: Mask[], modeBreakpoints?: number[], browser?: BrowserType) => ShotItem[];
export {};
