import type { BrowserType } from 'playwright-core';
import type { ShotItem } from '../types';
export declare const takeScreenShots: (shotItems: ShotItem[], _browser?: BrowserType) => Promise<void>;
