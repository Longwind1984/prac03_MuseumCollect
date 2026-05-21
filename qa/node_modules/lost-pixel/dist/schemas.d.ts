import * as z from 'zod';
import type { BrowserContextOptions } from 'playwright-core';
export declare const BrowserSchema: z.ZodEnum<["chromium", "firefox", "webkit"]>;
export declare const ShotModeSchema: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
export declare const MaskSchema: z.ZodObject<{
    /**
     * CSS selector for the element to mask
     * Examples:
     * - `#my-id`: Selects the element with the id `my-id`
     * - `.my-class`: Selects all elements with the class `my-class`
     * - `div`: Selects all `div` elements
     * - `div.my-class`: Selects all `div` elements with the class `my-class`
     * - `li:nth-child(2n)`: Selects all even `li` elements
     * - `[data-testid="hero-banner"]`: Selects all elements with the attribute `data-testid` set to `hero-banner`
     * - `div > p`: Selects all `p` elements that are direct children of a `div` element
     */
    selector: z.ZodString;
}, "strip", z.ZodTypeAny, {
    selector: string;
}, {
    selector: string;
}>;
export declare const ShotItemSchema: z.ZodObject<{
    shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
    id: z.ZodString;
    shotName: z.ZodString;
    url: z.ZodString;
    filePathBaseline: z.ZodString;
    filePathCurrent: z.ZodString;
    filePathDifference: z.ZodString;
    browserConfig: z.ZodOptional<z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>;
    threshold: z.ZodNumber;
    waitBeforeScreenshot: z.ZodOptional<z.ZodNumber>;
    importPath: z.ZodOptional<z.ZodString>;
    mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /**
         * CSS selector for the element to mask
         * Examples:
         * - `#my-id`: Selects the element with the id `my-id`
         * - `.my-class`: Selects all elements with the class `my-class`
         * - `div`: Selects all `div` elements
         * - `div.my-class`: Selects all `div` elements with the class `my-class`
         * - `li:nth-child(2n)`: Selects all even `li` elements
         * - `[data-testid="hero-banner"]`: Selects all elements with the attribute `data-testid` set to `hero-banner`
         * - `div > p`: Selects all `p` elements that are direct children of a `div` element
         */
        selector: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        selector: string;
    }, {
        selector: string;
    }>, "many">>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height?: number | undefined;
    }, {
        width: number;
        height?: number | undefined;
    }>>;
    breakpoint: z.ZodOptional<z.ZodNumber>;
    breakpointGroup: z.ZodOptional<z.ZodString>;
    elementLocator: z.ZodOptional<z.ZodString>;
    waitForSelector: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
    id: string;
    shotName: string;
    url: string;
    filePathBaseline: string;
    filePathCurrent: string;
    filePathDifference: string;
    threshold: number;
    browserConfig?: BrowserContextOptions | undefined;
    waitBeforeScreenshot?: number | undefined;
    importPath?: string | undefined;
    mask?: {
        selector: string;
    }[] | undefined;
    viewport?: {
        width: number;
        height?: number | undefined;
    } | undefined;
    breakpoint?: number | undefined;
    breakpointGroup?: string | undefined;
    elementLocator?: string | undefined;
    waitForSelector?: string | undefined;
}, {
    shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
    id: string;
    shotName: string;
    url: string;
    filePathBaseline: string;
    filePathCurrent: string;
    filePathDifference: string;
    threshold: number;
    browserConfig?: BrowserContextOptions | undefined;
    waitBeforeScreenshot?: number | undefined;
    importPath?: string | undefined;
    mask?: {
        selector: string;
    }[] | undefined;
    viewport?: {
        width: number;
        height?: number | undefined;
    } | undefined;
    breakpoint?: number | undefined;
    breakpointGroup?: string | undefined;
    elementLocator?: string | undefined;
    waitForSelector?: string | undefined;
}>;
