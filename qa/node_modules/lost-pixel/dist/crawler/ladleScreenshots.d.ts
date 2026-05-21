import type { BrowserType } from 'playwright-core';
import type { Mask, ShotItem } from '../types';
import type { Story } from './storybook';
export declare const generateLadleShotItems: (baseUrl: string, isLocalServer: boolean, ladleStories: Story[], mask?: Mask[], modeBreakpoints?: number[], browser?: BrowserType) => ShotItem[];
export declare const collectLadleStories: (ladleUrl: string) => Promise<Story[]>;
