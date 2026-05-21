import type { BrowserType } from 'playwright-core';
import { type ShotItem } from '../types';
type HistoireStory = {
    id: string;
    title: string;
    group: string | undefined;
    layout: {
        type: string;
        width: string;
    };
    variants?: HistoireStory[];
};
export declare const generateHistoireShotItems: (baseUrl: string, stories: HistoireStory[], browser?: BrowserType) => ShotItem[];
export declare const collectHistoireStories: (histoireUrl: string) => Promise<HistoireStory[]>;
export {};
