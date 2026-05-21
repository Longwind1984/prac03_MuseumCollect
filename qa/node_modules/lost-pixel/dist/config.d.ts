import { type LaunchOptions, type BrowserContextOptions, type Page } from 'playwright-core';
import * as z from 'zod';
export declare const PageScreenshotParameterSchema: z.ZodObject<{
    /**
     * Path to the page to take a screenshot of (e.g. /login)
     */
    path: z.ZodString;
    /**
     * Unique name for the page
     */
    name: z.ZodString;
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.ZodDefault<z.ZodNumber>;
    /**
     * Define custom breakpoints for the page as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    /**
     * Define a custom viewport for the page
     * @default { width: 1280, height: 720 }
     */
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
    }>>;
    /**
     * Define areas for the page where differences will be ignored
     */
    mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
        selector: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        selector: string;
    }, {
        selector: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
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
}, {
    path: string;
    name: string;
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    mask?: {
        selector: string;
    }[] | undefined;
    viewport?: {
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    breakpoints?: number[] | undefined;
}>;
export type PageScreenshotParameter = z.infer<typeof PageScreenshotParameterSchema>;
export declare const PlatformModeConfigSchema: z.ZodObject<z.objectUtil.extendShape<{
    /**
     * Browser to use: chromium, firefox, or webkit
     * @default 'chromium'
     */
    browser: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["chromium", "firefox", "webkit"]>, z.ZodDefault<z.ZodArray<z.ZodEnum<["chromium", "firefox", "webkit"]>, "many">>]>>;
    /**
     * Enable Storybook mode
     */
    storybookShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Storybook instance or local folder
         * @default 'storybook-static'
         */
        storybookUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Storybook shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Target specific element on page with a selector
         */
        elementLocator: z.ZodOptional<z.ZodString>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Ladle mode
     */
    ladleShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Ladle served instance
         * @default 'http://localhost:61000'
         */
        ladleUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Ladle shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Histoire mode
     */
    histoireShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Histoire served instance
         * @default 'http://localhost:61000'
         */
        histoireUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Histoire shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Page mode
     */
    pageShots: z.ZodOptional<z.ZodObject<{
        /**
         * Paths to take screenshots of
         */
        pages: z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonUrl: z.ZodOptional<z.ZodString>;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonRefiner: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">], z.ZodUnknown>, z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">>>;
        /**
         * Base URL of the running application (e.g. http://localhost:3000)
         */
        baseUrl: z.ZodString;
        /**
         * Define areas for all pages where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all page shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    }, {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    }>>;
    /**
     * Enable Custom mode
     */
    customShots: z.ZodOptional<z.ZodObject<{
        /**
         * Path to current shots folder
         *
         * This path cannot be the same as the `imagePathCurrent` path
         */
        currentShotsPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentShotsPath: string;
    }, {
        currentShotsPath: string;
    }>>;
    /**
     * Path to the current image folder
     * @default '.lostpixel/current/'
     */
    imagePathCurrent: z.ZodDefault<z.ZodString>;
    /**
     * Define custom breakpoints for all tests as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    /**
     * Number of concurrent shots to take
     * @default 5
     */
    shotConcurrency: z.ZodDefault<z.ZodNumber>;
    /**
     * Timeouts for various stages of the test
     */
    timeouts: z.ZodDefault<z.ZodObject<{
        /**
         * Timeout for fetching stories
         * @default 30_000
         */
        fetchStories: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for loading the state of the page
         * @default 30_000
         */
        loadState: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for waiting for network requests to finish
         * @default 30_000
         */
        networkRequests: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    }, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }>>;
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the first network request to start
     * @default 1_000
     */
    waitForFirstRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the last network request to start
     * @default 1_000
     */
    waitForLastRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.ZodDefault<z.ZodNumber>;
    /**
     * How often to retry a shot for a stable result
     * @default 0
     */
    flakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait between flakyness retries
     * @default 2_000
     */
    waitBetweenFlakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Global shot filter
     */
    filterShot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodBoolean>>;
    /**
     * Shot and file name generator for images
     */
    shotNameGenerator: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodString>>;
    /**
     * Configure browser context options
     */
    configureBrowser: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>>;
    /**
     * Configure page before screenshot
     */
    beforeScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Perform actions after screenshot was taken
     */
    afterScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Launch options for the browser
     */
    browserLaunchOptions: z.ZodOptional<z.ZodObject<{
        chromium: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        firefox: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        webkit: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
    }, "strip", z.ZodTypeAny, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }>>;
}, {
    /**
     * URL of the Lost Pixel API endpoint
     * @default 'https://api.lost-pixel.com'
     */
    lostPixelPlatform: z.ZodDefault<z.ZodString>;
    /**
     * API key for the Lost Pixel platform
     */
    apiKey: z.ZodString;
    /**
     * Project ID
     */
    lostPixelProjectId: z.ZodString;
    /**
     * CI build ID
     */
    ciBuildId: z.ZodDefault<z.ZodString>;
    /**
     * CI build number
     */
    ciBuildNumber: z.ZodDefault<z.ZodString>;
    /**
     * Git repository name (e.g. 'lost-pixel/lost-pixel-storybook')
     */
    repository: z.ZodDefault<z.ZodString>;
    /**
     * Git branch name (e.g. 'main')
     */
    commitRefName: z.ZodDefault<z.ZodString>;
    /**
     * Git commit SHA (e.g. 'b9b8b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9')
     */
    commitHash: z.ZodDefault<z.ZodString>;
    /**
     * File path to event.json file
     */
    eventFilePath: z.ZodOptional<z.ZodString>;
    /**
     * Whether to set the GitHub status check on process start or not
     *
     * Setting this option to `true` makes only sense if the repository settings have pending status checks disabled
     * @default false
     */
    setPendingStatusCheck: z.ZodDefault<z.ZodBoolean>;
}>, "strip", z.ZodTypeAny, {
    threshold: number;
    waitBeforeScreenshot: number;
    browser: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[];
    imagePathCurrent: string;
    shotConcurrency: number;
    timeouts: {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    };
    waitForFirstRequest: number;
    waitForLastRequest: number;
    flakynessRetries: number;
    waitBetweenFlakynessRetries: number;
    lostPixelPlatform: string;
    apiKey: string;
    lostPixelProjectId: string;
    ciBuildId: string;
    ciBuildNumber: string;
    repository: string;
    commitRefName: string;
    commitHash: string;
    setPendingStatusCheck: boolean;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    eventFilePath?: string | undefined;
}, {
    apiKey: string;
    lostPixelProjectId: string;
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    lostPixelPlatform?: string | undefined;
    ciBuildId?: string | undefined;
    ciBuildNumber?: string | undefined;
    repository?: string | undefined;
    commitRefName?: string | undefined;
    commitHash?: string | undefined;
    eventFilePath?: string | undefined;
    setPendingStatusCheck?: boolean | undefined;
}>;
export declare const GenerateOnlyModeConfigSchema: z.ZodObject<z.objectUtil.extendShape<{
    /**
     * Browser to use: chromium, firefox, or webkit
     * @default 'chromium'
     */
    browser: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["chromium", "firefox", "webkit"]>, z.ZodDefault<z.ZodArray<z.ZodEnum<["chromium", "firefox", "webkit"]>, "many">>]>>;
    /**
     * Enable Storybook mode
     */
    storybookShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Storybook instance or local folder
         * @default 'storybook-static'
         */
        storybookUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Storybook shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Target specific element on page with a selector
         */
        elementLocator: z.ZodOptional<z.ZodString>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Ladle mode
     */
    ladleShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Ladle served instance
         * @default 'http://localhost:61000'
         */
        ladleUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Ladle shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Histoire mode
     */
    histoireShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Histoire served instance
         * @default 'http://localhost:61000'
         */
        histoireUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Histoire shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Page mode
     */
    pageShots: z.ZodOptional<z.ZodObject<{
        /**
         * Paths to take screenshots of
         */
        pages: z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonUrl: z.ZodOptional<z.ZodString>;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonRefiner: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">], z.ZodUnknown>, z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">>>;
        /**
         * Base URL of the running application (e.g. http://localhost:3000)
         */
        baseUrl: z.ZodString;
        /**
         * Define areas for all pages where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all page shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    }, {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    }>>;
    /**
     * Enable Custom mode
     */
    customShots: z.ZodOptional<z.ZodObject<{
        /**
         * Path to current shots folder
         *
         * This path cannot be the same as the `imagePathCurrent` path
         */
        currentShotsPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentShotsPath: string;
    }, {
        currentShotsPath: string;
    }>>;
    /**
     * Path to the current image folder
     * @default '.lostpixel/current/'
     */
    imagePathCurrent: z.ZodDefault<z.ZodString>;
    /**
     * Define custom breakpoints for all tests as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    /**
     * Number of concurrent shots to take
     * @default 5
     */
    shotConcurrency: z.ZodDefault<z.ZodNumber>;
    /**
     * Timeouts for various stages of the test
     */
    timeouts: z.ZodDefault<z.ZodObject<{
        /**
         * Timeout for fetching stories
         * @default 30_000
         */
        fetchStories: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for loading the state of the page
         * @default 30_000
         */
        loadState: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for waiting for network requests to finish
         * @default 30_000
         */
        networkRequests: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    }, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }>>;
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the first network request to start
     * @default 1_000
     */
    waitForFirstRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the last network request to start
     * @default 1_000
     */
    waitForLastRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.ZodDefault<z.ZodNumber>;
    /**
     * How often to retry a shot for a stable result
     * @default 0
     */
    flakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait between flakyness retries
     * @default 2_000
     */
    waitBetweenFlakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Global shot filter
     */
    filterShot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodBoolean>>;
    /**
     * Shot and file name generator for images
     */
    shotNameGenerator: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodString>>;
    /**
     * Configure browser context options
     */
    configureBrowser: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>>;
    /**
     * Configure page before screenshot
     */
    beforeScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Perform actions after screenshot was taken
     */
    afterScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Launch options for the browser
     */
    browserLaunchOptions: z.ZodOptional<z.ZodObject<{
        chromium: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        firefox: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        webkit: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
    }, "strip", z.ZodTypeAny, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }>>;
}, {
    /**
     * Run in local mode
     * @deprecated Defaults to running in generateOnly mode
     */
    generateOnly: z.ZodOptional<z.ZodBoolean>;
    /**
     * Flag that decides if process should exit if a difference is found
     */
    failOnDifference: z.ZodOptional<z.ZodBoolean>;
    /**
     * Path to the baseline image folder
     * @default '.lostpixel/baseline/'
     */
    imagePathBaseline: z.ZodDefault<z.ZodString>;
    /**
     * Path to the difference image folder
     * @default '.lostpixel/difference/'
     */
    imagePathDifference: z.ZodDefault<z.ZodString>;
    /**
     * Number of concurrent screenshots to compare
     * @default 10
     */
    compareConcurrency: z.ZodDefault<z.ZodNumber>;
    /**
     * Which comparison engine to use for diffing images
     * @default 'pixelmatch'
     */
    compareEngine: z.ZodDefault<z.ZodEnum<["pixelmatch", "odiff"]>>;
    /**
     * Filter stories to take screenshots of and run comparisons on (existing shots remain untouched)
     */
    filterItemsToCheck: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
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
    }>], z.ZodUnknown>, z.ZodBoolean>>;
}>, "strip", z.ZodTypeAny, {
    threshold: number;
    waitBeforeScreenshot: number;
    browser: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[];
    imagePathCurrent: string;
    shotConcurrency: number;
    timeouts: {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    };
    waitForFirstRequest: number;
    waitForLastRequest: number;
    flakynessRetries: number;
    waitBetweenFlakynessRetries: number;
    imagePathBaseline: string;
    imagePathDifference: string;
    compareConcurrency: number;
    compareEngine: "pixelmatch" | "odiff";
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
}, {
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    imagePathBaseline?: string | undefined;
    imagePathDifference?: string | undefined;
    compareConcurrency?: number | undefined;
    compareEngine?: "pixelmatch" | "odiff" | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
}>;
export declare const ConfigSchema: z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    /**
     * Browser to use: chromium, firefox, or webkit
     * @default 'chromium'
     */
    browser: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["chromium", "firefox", "webkit"]>, z.ZodDefault<z.ZodArray<z.ZodEnum<["chromium", "firefox", "webkit"]>, "many">>]>>;
    /**
     * Enable Storybook mode
     */
    storybookShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Storybook instance or local folder
         * @default 'storybook-static'
         */
        storybookUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Storybook shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Target specific element on page with a selector
         */
        elementLocator: z.ZodOptional<z.ZodString>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Ladle mode
     */
    ladleShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Ladle served instance
         * @default 'http://localhost:61000'
         */
        ladleUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Ladle shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Histoire mode
     */
    histoireShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Histoire served instance
         * @default 'http://localhost:61000'
         */
        histoireUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Histoire shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Page mode
     */
    pageShots: z.ZodOptional<z.ZodObject<{
        /**
         * Paths to take screenshots of
         */
        pages: z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonUrl: z.ZodOptional<z.ZodString>;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonRefiner: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">], z.ZodUnknown>, z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">>>;
        /**
         * Base URL of the running application (e.g. http://localhost:3000)
         */
        baseUrl: z.ZodString;
        /**
         * Define areas for all pages where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all page shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    }, {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    }>>;
    /**
     * Enable Custom mode
     */
    customShots: z.ZodOptional<z.ZodObject<{
        /**
         * Path to current shots folder
         *
         * This path cannot be the same as the `imagePathCurrent` path
         */
        currentShotsPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentShotsPath: string;
    }, {
        currentShotsPath: string;
    }>>;
    /**
     * Path to the current image folder
     * @default '.lostpixel/current/'
     */
    imagePathCurrent: z.ZodDefault<z.ZodString>;
    /**
     * Define custom breakpoints for all tests as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    /**
     * Number of concurrent shots to take
     * @default 5
     */
    shotConcurrency: z.ZodDefault<z.ZodNumber>;
    /**
     * Timeouts for various stages of the test
     */
    timeouts: z.ZodDefault<z.ZodObject<{
        /**
         * Timeout for fetching stories
         * @default 30_000
         */
        fetchStories: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for loading the state of the page
         * @default 30_000
         */
        loadState: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for waiting for network requests to finish
         * @default 30_000
         */
        networkRequests: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    }, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }>>;
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the first network request to start
     * @default 1_000
     */
    waitForFirstRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the last network request to start
     * @default 1_000
     */
    waitForLastRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.ZodDefault<z.ZodNumber>;
    /**
     * How often to retry a shot for a stable result
     * @default 0
     */
    flakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait between flakyness retries
     * @default 2_000
     */
    waitBetweenFlakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Global shot filter
     */
    filterShot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodBoolean>>;
    /**
     * Shot and file name generator for images
     */
    shotNameGenerator: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodString>>;
    /**
     * Configure browser context options
     */
    configureBrowser: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>>;
    /**
     * Configure page before screenshot
     */
    beforeScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Perform actions after screenshot was taken
     */
    afterScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Launch options for the browser
     */
    browserLaunchOptions: z.ZodOptional<z.ZodObject<{
        chromium: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        firefox: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        webkit: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
    }, "strip", z.ZodTypeAny, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }>>;
}, {
    /**
     * URL of the Lost Pixel API endpoint
     * @default 'https://api.lost-pixel.com'
     */
    lostPixelPlatform: z.ZodDefault<z.ZodString>;
    /**
     * API key for the Lost Pixel platform
     */
    apiKey: z.ZodString;
    /**
     * Project ID
     */
    lostPixelProjectId: z.ZodString;
    /**
     * CI build ID
     */
    ciBuildId: z.ZodDefault<z.ZodString>;
    /**
     * CI build number
     */
    ciBuildNumber: z.ZodDefault<z.ZodString>;
    /**
     * Git repository name (e.g. 'lost-pixel/lost-pixel-storybook')
     */
    repository: z.ZodDefault<z.ZodString>;
    /**
     * Git branch name (e.g. 'main')
     */
    commitRefName: z.ZodDefault<z.ZodString>;
    /**
     * Git commit SHA (e.g. 'b9b8b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9')
     */
    commitHash: z.ZodDefault<z.ZodString>;
    /**
     * File path to event.json file
     */
    eventFilePath: z.ZodOptional<z.ZodString>;
    /**
     * Whether to set the GitHub status check on process start or not
     *
     * Setting this option to `true` makes only sense if the repository settings have pending status checks disabled
     * @default false
     */
    setPendingStatusCheck: z.ZodDefault<z.ZodBoolean>;
}>, "strip", z.ZodTypeAny, {
    threshold: number;
    waitBeforeScreenshot: number;
    browser: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[];
    imagePathCurrent: string;
    shotConcurrency: number;
    timeouts: {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    };
    waitForFirstRequest: number;
    waitForLastRequest: number;
    flakynessRetries: number;
    waitBetweenFlakynessRetries: number;
    lostPixelPlatform: string;
    apiKey: string;
    lostPixelProjectId: string;
    ciBuildId: string;
    ciBuildNumber: string;
    repository: string;
    commitRefName: string;
    commitHash: string;
    setPendingStatusCheck: boolean;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    eventFilePath?: string | undefined;
}, {
    apiKey: string;
    lostPixelProjectId: string;
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    lostPixelPlatform?: string | undefined;
    ciBuildId?: string | undefined;
    ciBuildNumber?: string | undefined;
    repository?: string | undefined;
    commitRefName?: string | undefined;
    commitHash?: string | undefined;
    eventFilePath?: string | undefined;
    setPendingStatusCheck?: boolean | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    /**
     * Browser to use: chromium, firefox, or webkit
     * @default 'chromium'
     */
    browser: z.ZodDefault<z.ZodUnion<[z.ZodEnum<["chromium", "firefox", "webkit"]>, z.ZodDefault<z.ZodArray<z.ZodEnum<["chromium", "firefox", "webkit"]>, "many">>]>>;
    /**
     * Enable Storybook mode
     */
    storybookShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Storybook instance or local folder
         * @default 'storybook-static'
         */
        storybookUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Storybook shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Target specific element on page with a selector
         */
        elementLocator: z.ZodOptional<z.ZodString>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Ladle mode
     */
    ladleShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Ladle served instance
         * @default 'http://localhost:61000'
         */
        ladleUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Ladle shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Histoire mode
     */
    histoireShots: z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Histoire served instance
         * @default 'http://localhost:61000'
         */
        histoireUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Histoire shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>;
    /**
     * Enable Page mode
     */
    pageShots: z.ZodOptional<z.ZodObject<{
        /**
         * Paths to take screenshots of
         */
        pages: z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonUrl: z.ZodOptional<z.ZodString>;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonRefiner: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">], z.ZodUnknown>, z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">>>;
        /**
         * Base URL of the running application (e.g. http://localhost:3000)
         */
        baseUrl: z.ZodString;
        /**
         * Define areas for all pages where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all page shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    }, {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    }>>;
    /**
     * Enable Custom mode
     */
    customShots: z.ZodOptional<z.ZodObject<{
        /**
         * Path to current shots folder
         *
         * This path cannot be the same as the `imagePathCurrent` path
         */
        currentShotsPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentShotsPath: string;
    }, {
        currentShotsPath: string;
    }>>;
    /**
     * Path to the current image folder
     * @default '.lostpixel/current/'
     */
    imagePathCurrent: z.ZodDefault<z.ZodString>;
    /**
     * Define custom breakpoints for all tests as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    /**
     * Number of concurrent shots to take
     * @default 5
     */
    shotConcurrency: z.ZodDefault<z.ZodNumber>;
    /**
     * Timeouts for various stages of the test
     */
    timeouts: z.ZodDefault<z.ZodObject<{
        /**
         * Timeout for fetching stories
         * @default 30_000
         */
        fetchStories: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for loading the state of the page
         * @default 30_000
         */
        loadState: z.ZodDefault<z.ZodNumber>;
        /**
         * Timeout for waiting for network requests to finish
         * @default 30_000
         */
        networkRequests: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    }, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }>>;
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the first network request to start
     * @default 1_000
     */
    waitForFirstRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait for the last network request to start
     * @default 1_000
     */
    waitForLastRequest: z.ZodDefault<z.ZodNumber>;
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.ZodDefault<z.ZodNumber>;
    /**
     * How often to retry a shot for a stable result
     * @default 0
     */
    flakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Time to wait between flakyness retries
     * @default 2_000
     */
    waitBetweenFlakynessRetries: z.ZodDefault<z.ZodNumber>;
    /**
     * Global shot filter
     */
    filterShot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodBoolean>>;
    /**
     * Shot and file name generator for images
     */
    shotNameGenerator: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodString>>;
    /**
     * Configure browser context options
     */
    configureBrowser: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>>;
    /**
     * Configure page before screenshot
     */
    beforeScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Perform actions after screenshot was taken
     */
    afterScreenshot: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>;
    /**
     * Launch options for the browser
     */
    browserLaunchOptions: z.ZodOptional<z.ZodObject<{
        chromium: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        firefox: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        webkit: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
    }, "strip", z.ZodTypeAny, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }>>;
}, {
    /**
     * Run in local mode
     * @deprecated Defaults to running in generateOnly mode
     */
    generateOnly: z.ZodOptional<z.ZodBoolean>;
    /**
     * Flag that decides if process should exit if a difference is found
     */
    failOnDifference: z.ZodOptional<z.ZodBoolean>;
    /**
     * Path to the baseline image folder
     * @default '.lostpixel/baseline/'
     */
    imagePathBaseline: z.ZodDefault<z.ZodString>;
    /**
     * Path to the difference image folder
     * @default '.lostpixel/difference/'
     */
    imagePathDifference: z.ZodDefault<z.ZodString>;
    /**
     * Number of concurrent screenshots to compare
     * @default 10
     */
    compareConcurrency: z.ZodDefault<z.ZodNumber>;
    /**
     * Which comparison engine to use for diffing images
     * @default 'pixelmatch'
     */
    compareEngine: z.ZodDefault<z.ZodEnum<["pixelmatch", "odiff"]>>;
    /**
     * Filter stories to take screenshots of and run comparisons on (existing shots remain untouched)
     */
    filterItemsToCheck: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
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
    }>], z.ZodUnknown>, z.ZodBoolean>>;
}>, "strip", z.ZodTypeAny, {
    threshold: number;
    waitBeforeScreenshot: number;
    browser: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[];
    imagePathCurrent: string;
    shotConcurrency: number;
    timeouts: {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    };
    waitForFirstRequest: number;
    waitForLastRequest: number;
    flakynessRetries: number;
    waitBetweenFlakynessRetries: number;
    imagePathBaseline: string;
    imagePathDifference: string;
    compareConcurrency: number;
    compareEngine: "pixelmatch" | "odiff";
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
}, {
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    imagePathBaseline?: string | undefined;
    imagePathDifference?: string | undefined;
    compareConcurrency?: number | undefined;
    compareEngine?: "pixelmatch" | "odiff" | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
}>]>;
export declare const FlexibleConfigSchema: z.ZodUnion<[z.ZodObject<{
    browser: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodEnum<["chromium", "firefox", "webkit"]>, z.ZodDefault<z.ZodArray<z.ZodEnum<["chromium", "firefox", "webkit"]>, "many">>]>>>;
    storybookShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Storybook instance or local folder
         * @default 'storybook-static'
         */
        storybookUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Storybook shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Target specific element on page with a selector
         */
        elementLocator: z.ZodOptional<z.ZodString>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>>;
    ladleShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Ladle served instance
         * @default 'http://localhost:61000'
         */
        ladleUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Ladle shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>>;
    histoireShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Histoire served instance
         * @default 'http://localhost:61000'
         */
        histoireUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Histoire shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>>;
    customShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * Path to current shots folder
         *
         * This path cannot be the same as the `imagePathCurrent` path
         */
        currentShotsPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentShotsPath: string;
    }, {
        currentShotsPath: string;
    }>>>;
    imagePathCurrent: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    breakpoints: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
    shotConcurrency: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitBeforeScreenshot: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitForFirstRequest: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitForLastRequest: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    threshold: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    flakynessRetries: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitBetweenFlakynessRetries: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    filterShot: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodBoolean>>>;
    shotNameGenerator: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodString>>>;
    configureBrowser: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>>>;
    beforeScreenshot: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>>;
    afterScreenshot: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>>;
    browserLaunchOptions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        chromium: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        firefox: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        webkit: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
    }, "strip", z.ZodTypeAny, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }>>>;
    lostPixelPlatform: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    apiKey: z.ZodOptional<z.ZodString>;
    lostPixelProjectId: z.ZodOptional<z.ZodString>;
    ciBuildId: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    ciBuildNumber: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    repository: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    commitRefName: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    commitHash: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    eventFilePath: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    setPendingStatusCheck: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    timeouts: z.ZodOptional<z.ZodObject<{
        fetchStories: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        loadState: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        networkRequests: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }>>;
    pageShots: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
        /**
         * Paths to take screenshots of
         */
        pages: z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonUrl: z.ZodOptional<z.ZodString>;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonRefiner: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">], z.ZodUnknown>, z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">>>;
        /**
         * Base URL of the running application (e.g. http://localhost:3000)
         */
        baseUrl: z.ZodString;
        /**
         * Define areas for all pages where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all page shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, {
        pages: z.ZodArray<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            waitBeforeScreenshot: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            threshold: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            breakpoints: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
            viewport: z.ZodOptional<z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>>;
            mask: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }, {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
    }>, "strip", z.ZodTypeAny, {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    }, {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    lostPixelPlatform?: string | undefined;
    apiKey?: string | undefined;
    lostPixelProjectId?: string | undefined;
    ciBuildId?: string | undefined;
    ciBuildNumber?: string | undefined;
    repository?: string | undefined;
    commitRefName?: string | undefined;
    commitHash?: string | undefined;
    eventFilePath?: string | undefined;
    setPendingStatusCheck?: boolean | undefined;
}, {
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    lostPixelPlatform?: string | undefined;
    apiKey?: string | undefined;
    lostPixelProjectId?: string | undefined;
    ciBuildId?: string | undefined;
    ciBuildNumber?: string | undefined;
    repository?: string | undefined;
    commitRefName?: string | undefined;
    commitHash?: string | undefined;
    eventFilePath?: string | undefined;
    setPendingStatusCheck?: boolean | undefined;
}>, z.ZodObject<{
    browser: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodEnum<["chromium", "firefox", "webkit"]>, z.ZodDefault<z.ZodArray<z.ZodEnum<["chromium", "firefox", "webkit"]>, "many">>]>>>;
    storybookShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Storybook instance or local folder
         * @default 'storybook-static'
         */
        storybookUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Storybook shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Target specific element on page with a selector
         */
        elementLocator: z.ZodOptional<z.ZodString>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>>;
    ladleShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Ladle served instance
         * @default 'http://localhost:61000'
         */
        ladleUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Ladle shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>>;
    histoireShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * URL of the Histoire served instance
         * @default 'http://localhost:61000'
         */
        histoireUrl: z.ZodString;
        /**
         * Define areas for all stories where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all Histoire shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }, {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    }>>>;
    customShots: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        /**
         * Path to current shots folder
         *
         * This path cannot be the same as the `imagePathCurrent` path
         */
        currentShotsPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentShotsPath: string;
    }, {
        currentShotsPath: string;
    }>>>;
    imagePathCurrent: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    breakpoints: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
    shotConcurrency: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitBeforeScreenshot: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitForFirstRequest: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitForLastRequest: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    threshold: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    flakynessRetries: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    waitBetweenFlakynessRetries: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    filterShot: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodBoolean>>>;
    shotNameGenerator: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodString>>>;
    configureBrowser: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodType<BrowserContextOptions, z.ZodTypeDef, BrowserContextOptions>>>>;
    beforeScreenshot: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>>;
    afterScreenshot: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<Page, z.ZodTypeDef, Page>, z.ZodObject<{
        shotMode: z.ZodEnum<["storybook", "ladle", "histoire", "page", "custom"]>;
        id: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodString>;
        story: z.ZodOptional<z.ZodString>;
        shotName: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filePathBaseline: z.ZodOptional<z.ZodString>;
        filePathCurrent: z.ZodOptional<z.ZodString>;
        filePathDifference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodVoid>>>>;
    browserLaunchOptions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        chromium: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        firefox: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
        webkit: z.ZodOptional<z.ZodType<LaunchOptions, z.ZodTypeDef, LaunchOptions>>;
    }, "strip", z.ZodTypeAny, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }, {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    }>>>;
    generateOnly: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    failOnDifference: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    imagePathBaseline: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    imagePathDifference: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    compareConcurrency: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    compareEngine: z.ZodOptional<z.ZodDefault<z.ZodEnum<["pixelmatch", "odiff"]>>>;
    filterItemsToCheck: z.ZodOptional<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
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
    }>], z.ZodUnknown>, z.ZodBoolean>>>;
    timeouts: z.ZodOptional<z.ZodObject<{
        fetchStories: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        loadState: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        networkRequests: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }, {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    }>>;
    pageShots: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
        /**
         * Paths to take screenshots of
         */
        pages: z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonUrl: z.ZodOptional<z.ZodString>;
        /**
         * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
         */
        pagesJsonRefiner: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">], z.ZodUnknown>, z.ZodArray<z.ZodObject<{
            /**
             * Path to the page to take a screenshot of (e.g. /login)
             */
            path: z.ZodString;
            /**
             * Unique name for the page
             */
            name: z.ZodString;
            /**
             * Time to wait before taking a screenshot
             * @default 1_000
             */
            waitBeforeScreenshot: z.ZodDefault<z.ZodNumber>;
            /**
             * Threshold for the difference between the baseline and current image
             *
             * Values between 0 and 1 are interpreted as percentage of the image size
             *
             * Values greater or equal to 1 are interpreted as pixel count.
             * @default 0
             */
            threshold: z.ZodDefault<z.ZodNumber>;
            /**
             * Define custom breakpoints for the page as width in pixels
             * @default []
             * @example
             * [ 320, 768, 1280 ]
             */
            breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            /**
             * Define a custom viewport for the page
             * @default { width: 1280, height: 720 }
             */
            viewport: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>;
            /**
             * Define areas for the page where differences will be ignored
             */
            mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">>>;
        /**
         * Base URL of the running application (e.g. http://localhost:3000)
         */
        baseUrl: z.ZodString;
        /**
         * Define areas for all pages where differences will be ignored
         */
        mask: z.ZodOptional<z.ZodArray<z.ZodObject<{
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            selector: string;
        }, {
            selector: string;
        }>, "many">>;
        /**
         * Define custom breakpoints for all page shots as width in pixels
         * @default []
         * @example
         * [ 320, 768, 1280 ]
         */
        breakpoints: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        /**
         * Wait for a specific selector before taking a screenshot
         * @example '[data-storyloaded]'
         */
        waitForSelector: z.ZodOptional<z.ZodString>;
    }, {
        pages: z.ZodArray<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            waitBeforeScreenshot: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            threshold: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            breakpoints: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
            viewport: z.ZodOptional<z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodNumber>;
                height: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                width?: number | undefined;
                height?: number | undefined;
            }, {
                width?: number | undefined;
                height?: number | undefined;
            }>>>;
            mask: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
                selector: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                selector: string;
            }, {
                selector: string;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }, {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }>, "many">;
    }>, "strip", z.ZodTypeAny, {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    }, {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    imagePathBaseline?: string | undefined;
    imagePathDifference?: string | undefined;
    compareConcurrency?: number | undefined;
    compareEngine?: "pixelmatch" | "odiff" | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
}, {
    threshold?: number | undefined;
    waitBeforeScreenshot?: number | undefined;
    browser?: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[] | undefined;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
            path?: string | undefined;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            name?: string | undefined;
            breakpoints?: number[] | undefined;
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
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
        }[], ...args: unknown[]) => {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    imagePathCurrent?: string | undefined;
    shotConcurrency?: number | undefined;
    timeouts?: {
        fetchStories?: number | undefined;
        loadState?: number | undefined;
        networkRequests?: number | undefined;
    } | undefined;
    waitForFirstRequest?: number | undefined;
    waitForLastRequest?: number | undefined;
    flakynessRetries?: number | undefined;
    waitBetweenFlakynessRetries?: number | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    imagePathBaseline?: string | undefined;
    imagePathDifference?: string | undefined;
    compareConcurrency?: number | undefined;
    compareEngine?: "pixelmatch" | "odiff" | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
}>]>;
export type PlatformModeConfig = z.infer<typeof PlatformModeConfigSchema>;
export type GenerateOnlyModeConfig = z.infer<typeof GenerateOnlyModeConfigSchema>;
export type Config = z.infer<typeof ConfigSchema>;
export type CustomProjectConfig = z.infer<typeof FlexibleConfigSchema>;
export declare let config: Config;
export declare const isPlatformModeConfig: (userConfig: PlatformModeConfig | GenerateOnlyModeConfig) => userConfig is PlatformModeConfig;
export declare const parseConfig: (userConfig: Config) => {
    threshold: number;
    waitBeforeScreenshot: number;
    browser: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[];
    imagePathCurrent: string;
    shotConcurrency: number;
    timeouts: {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    };
    waitForFirstRequest: number;
    waitForLastRequest: number;
    flakynessRetries: number;
    waitBetweenFlakynessRetries: number;
    lostPixelPlatform: string;
    apiKey: string;
    lostPixelProjectId: string;
    ciBuildId: string;
    ciBuildNumber: string;
    repository: string;
    commitRefName: string;
    commitHash: string;
    setPendingStatusCheck: boolean;
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    eventFilePath?: string | undefined;
} | {
    threshold: number;
    waitBeforeScreenshot: number;
    browser: "chromium" | "firefox" | "webkit" | ("chromium" | "firefox" | "webkit")[];
    imagePathCurrent: string;
    shotConcurrency: number;
    timeouts: {
        fetchStories: number;
        loadState: number;
        networkRequests: number;
    };
    waitForFirstRequest: number;
    waitForLastRequest: number;
    flakynessRetries: number;
    waitBetweenFlakynessRetries: number;
    imagePathBaseline: string;
    imagePathDifference: string;
    compareConcurrency: number;
    compareEngine: "pixelmatch" | "odiff";
    breakpoints?: number[] | undefined;
    storybookShots?: {
        storybookUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        elementLocator?: string | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    ladleShots?: {
        ladleUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    histoireShots?: {
        histoireUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
    } | undefined;
    pageShots?: {
        pages: {
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
        }[];
        baseUrl: string;
        mask?: {
            selector: string;
        }[] | undefined;
        waitForSelector?: string | undefined;
        breakpoints?: number[] | undefined;
        pagesJsonUrl?: string | undefined;
        pagesJsonRefiner?: ((args_0: {
            path: string;
            name: string;
            threshold?: number | undefined;
            waitBeforeScreenshot?: number | undefined;
            mask?: {
                selector: string;
            }[] | undefined;
            viewport?: {
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
            breakpoints?: number[] | undefined;
        }[], ...args: unknown[]) => {
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
        }[]) | undefined;
    } | undefined;
    customShots?: {
        currentShotsPath: string;
    } | undefined;
    filterShot?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => boolean) | undefined;
    shotNameGenerator?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => string) | undefined;
    configureBrowser?: ((args_0: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => BrowserContextOptions) | undefined;
    beforeScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    afterScreenshot?: ((args_0: Page, args_1: {
        shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
        id?: string | undefined;
        shotName?: string | undefined;
        filePathBaseline?: string | undefined;
        filePathCurrent?: string | undefined;
        filePathDifference?: string | undefined;
        kind?: string | undefined;
        story?: string | undefined;
        parameters?: Record<string, unknown> | undefined;
    }, ...args: unknown[]) => Promise<void>) | undefined;
    browserLaunchOptions?: {
        chromium?: LaunchOptions | undefined;
        firefox?: LaunchOptions | undefined;
        webkit?: LaunchOptions | undefined;
    } | undefined;
    generateOnly?: boolean | undefined;
    failOnDifference?: boolean | undefined;
    filterItemsToCheck?: ((args_0: {
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
    }, ...args: unknown[]) => boolean) | undefined;
};
export declare const configure: ({ customProjectConfig, localDebugMode, }: {
    customProjectConfig?: CustomProjectConfig;
    localDebugMode?: boolean;
}) => Promise<void>;
