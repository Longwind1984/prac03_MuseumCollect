"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.parseConfig = exports.isPlatformModeConfig = exports.config = exports.FlexibleConfigSchema = exports.ConfigSchema = exports.GenerateOnlyModeConfigSchema = exports.PlatformModeConfigSchema = exports.PageScreenshotParameterSchema = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const z = __importStar(require("zod"));
const configHelper_1 = require("./configHelper");
const log_1 = require("./log");
const schemas_1 = require("./schemas");
exports.PageScreenshotParameterSchema = z.object({
    /**
     * Path to the page to take a screenshot of (e.g. /login)
     */
    path: z.string(),
    /**
     * Unique name for the page
     */
    name: z.string(),
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.number().default(1000),
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.number().default(0),
    /**
     * Define custom breakpoints for the page as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.array(z.number()).optional(),
    /**
     * Define a custom viewport for the page
     * @default { width: 1280, height: 720 }
     */
    viewport: z
        .object({
        width: z.number().optional(),
        height: z.number().optional(),
    })
        .optional(),
    /**
     * Define areas for the page where differences will be ignored
     */
    mask: z.array(schemas_1.MaskSchema).optional(),
});
const StorybookShotsSchema = z.object({
    /**
     * URL of the Storybook instance or local folder
     * @default 'storybook-static'
     */
    storybookUrl: z.string(),
    /**
     * Define areas for all stories where differences will be ignored
     */
    mask: z.array(schemas_1.MaskSchema).optional(),
    /**
     * Define custom breakpoints for all Storybook shots as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.array(z.number()).optional(),
    /**
     * Target specific element on page with a selector
     */
    elementLocator: z.string().optional(),
    /**
     * Wait for a specific selector before taking a screenshot
     * @example '[data-storyloaded]'
     */
    waitForSelector: z.string().optional(),
});
const LadleShotsSchema = z.object({
    /**
     * URL of the Ladle served instance
     * @default 'http://localhost:61000'
     */
    ladleUrl: z.string(),
    /**
     * Define areas for all stories where differences will be ignored
     */
    mask: z.array(schemas_1.MaskSchema).optional(),
    /**
     * Define custom breakpoints for all Ladle shots as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.array(z.number()).optional(),
    /**
     * Wait for a specific selector before taking a screenshot
     * @example '[data-storyloaded]'
     */
    waitForSelector: z.string().optional(),
});
const HistoireShotsSchema = z.object({
    /**
     * URL of the Histoire served instance
     * @default 'http://localhost:61000'
     */
    histoireUrl: z.string(),
    /**
     * Define areas for all stories where differences will be ignored
     */
    mask: z.array(schemas_1.MaskSchema).optional(),
    /**
     * Define custom breakpoints for all Histoire shots as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.array(z.number()).optional(),
    /**
     * Wait for a specific selector before taking a screenshot
     * @example '[data-storyloaded]'
     */
    waitForSelector: z.string().optional(),
});
const PageShotsSchema = z.object({
    /**
     * Paths to take screenshots of
     */
    pages: z.array(exports.PageScreenshotParameterSchema),
    /**
     * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
     */
    pagesJsonUrl: z.string().optional(),
    /**
     * Url that must return a JSON compatible with `PageScreenshotParameter[]`. It is useful when you want to autogenerate the pages that you want to run lost-pixel on. Can be used together with `pages` as both are composed into a single run.
     */
    pagesJsonRefiner: z
        .function()
        .args(z.array(exports.PageScreenshotParameterSchema))
        .returns(z.array(exports.PageScreenshotParameterSchema))
        .optional(),
    /**
     * Base URL of the running application (e.g. http://localhost:3000)
     */
    baseUrl: z.string(),
    /**
     * Define areas for all pages where differences will be ignored
     */
    mask: z.array(schemas_1.MaskSchema).optional(),
    /**
     * Define custom breakpoints for all page shots as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.array(z.number()).optional(),
    /**
     * Wait for a specific selector before taking a screenshot
     * @example '[data-storyloaded]'
     */
    waitForSelector: z.string().optional(),
});
const CustomShotsSchema = z.object({
    /**
     * Path to current shots folder
     *
     * This path cannot be the same as the `imagePathCurrent` path
     */
    currentShotsPath: z.string(),
});
const StoryLikeSchema = z.object({
    shotMode: schemas_1.ShotModeSchema,
    id: z.string().optional(),
    kind: z.string().optional(),
    story: z.string().optional(),
    shotName: z.string().optional(),
    parameters: z.record(z.unknown()).optional(),
    filePathBaseline: z.string().optional(),
    filePathCurrent: z.string().optional(),
    filePathDifference: z.string().optional(),
});
const ShotItem = z.object({
    shotMode: schemas_1.ShotModeSchema,
    id: z.string(),
    shotName: z.string(),
    url: z.string(),
    filePathBaseline: z.string(),
    filePathCurrent: z.string(),
    filePathDifference: z.string(),
    browserConfig: z.custom().optional(),
    threshold: z.number(),
    waitBeforeScreenshot: z.number().optional(),
    importPath: z.string().optional(),
    mask: z.array(schemas_1.MaskSchema).optional(),
    viewport: z
        .object({
        width: z.number(),
        height: z.number().optional(),
    })
        .optional(),
    breakpoint: z.number().optional(),
    breakpointGroup: z.string().optional(),
    elementLocator: z.string().optional(),
    waitForSelector: z.string().optional(),
});
const TimeoutsSchema = z.object({
    /**
     * Timeout for fetching stories
     * @default 30_000
     */
    fetchStories: z.number().default(30000),
    /**
     * Timeout for loading the state of the page
     * @default 30_000
     */
    loadState: z.number().default(30000),
    /**
     * Timeout for waiting for network requests to finish
     * @default 30_000
     */
    networkRequests: z.number().default(30000),
});
const BaseConfigSchema = z.object({
    /**
     * Browser to use: chromium, firefox, or webkit
     * @default 'chromium'
     */
    browser: z
        .union([schemas_1.BrowserSchema, z.array(schemas_1.BrowserSchema).default(['chromium'])])
        .default('chromium'),
    /**
     * Enable Storybook mode
     */
    storybookShots: StorybookShotsSchema.optional(),
    /**
     * Enable Ladle mode
     */
    ladleShots: LadleShotsSchema.optional(),
    /**
     * Enable Histoire mode
     */
    histoireShots: HistoireShotsSchema.optional(),
    /**
     * Enable Page mode
     */
    pageShots: PageShotsSchema.optional(),
    /**
     * Enable Custom mode
     */
    customShots: CustomShotsSchema.optional(),
    /**
     * Path to the current image folder
     * @default '.lostpixel/current/'
     */
    imagePathCurrent: z.string().default('.lostpixel/current/'),
    /**
     * Define custom breakpoints for all tests as width in pixels
     * @default []
     * @example
     * [ 320, 768, 1280 ]
     */
    breakpoints: z.array(z.number()).optional(),
    /**
     * Number of concurrent shots to take
     * @default 5
     */
    shotConcurrency: z.number().default(5),
    /**
     * Timeouts for various stages of the test
     */
    timeouts: TimeoutsSchema.default({
        fetchStories: 30000,
        loadState: 30000,
        networkRequests: 30000,
    }),
    /**
     * Time to wait before taking a screenshot
     * @default 1_000
     */
    waitBeforeScreenshot: z.number().default(1000),
    /**
     * Time to wait for the first network request to start
     * @default 1_000
     */
    waitForFirstRequest: z.number().default(1000),
    /**
     * Time to wait for the last network request to start
     * @default 1_000
     */
    waitForLastRequest: z.number().default(1000),
    /**
     * Threshold for the difference between the baseline and current image
     *
     * Values between 0 and 1 are interpreted as percentage of the image size
     *
     * Values greater or equal to 1 are interpreted as pixel count.
     * @default 0
     */
    threshold: z.number().default(0),
    /**
     * How often to retry a shot for a stable result
     * @default 0
     */
    flakynessRetries: z.number().default(0),
    /**
     * Time to wait between flakyness retries
     * @default 2_000
     */
    waitBetweenFlakynessRetries: z.number().default(2000),
    /**
     * Global shot filter
     */
    filterShot: z
        .function()
        .args(StoryLikeSchema)
        .returns(z.boolean())
        .optional(),
    /**
     * Shot and file name generator for images
     */
    shotNameGenerator: z
        .function()
        .args(StoryLikeSchema)
        .returns(z.string())
        .optional(),
    /**
     * Configure browser context options
     */
    configureBrowser: z
        .function()
        .args(StoryLikeSchema)
        .returns(z.custom())
        .optional(),
    /**
     * Configure page before screenshot
     */
    beforeScreenshot: z
        .function()
        .args(z.custom(), StoryLikeSchema)
        .returns(z.promise(z.void()))
        .optional(),
    /**
     * Perform actions after screenshot was taken
     */
    afterScreenshot: z
        .function()
        .args(z.custom(), StoryLikeSchema)
        .returns(z.promise(z.void()))
        .optional(),
    /**
     * Launch options for the browser
     */
    browserLaunchOptions: z
        .object({
        chromium: z.custom().optional(),
        firefox: z.custom().optional(),
        webkit: z.custom().optional(),
    })
        .optional(),
});
exports.PlatformModeConfigSchema = BaseConfigSchema.extend({
    /**
     * URL of the Lost Pixel API endpoint
     * @default 'https://api.lost-pixel.com'
     */
    lostPixelPlatform: z.string().default('https://api.lost-pixel.com'),
    /**
     * API key for the Lost Pixel platform
     */
    apiKey: z.string(),
    /**
     * Project ID
     */
    lostPixelProjectId: z.string(),
    /**
     * CI build ID
     */
    ciBuildId: z
        .string({
        required_error: 'Required (can be set via `CI_BUILD_ID` env variable)',
    })
        // @ts-expect-error If not set, it will be caught during config validation
        .default(process.env.CI_BUILD_ID),
    /**
     * CI build number
     */
    ciBuildNumber: z
        .string({
        required_error: 'Required (can be set via `CI_BUILD_NUMBER` env variable)',
    })
        // @ts-expect-error If not set, it will be caught during config validation
        .default(process.env.CI_BUILD_NUMBER),
    /**
     * Git repository name (e.g. 'lost-pixel/lost-pixel-storybook')
     */
    repository: z
        .string({
        required_error: 'Required (can be set via `REPOSITORY` env variable)',
    })
        // @ts-expect-error If not set, it will be caught during config validation
        .default(process.env.REPOSITORY),
    /**
     * Git branch name (e.g. 'main')
     */
    commitRefName: z
        .string({
        required_error: 'Required (can be set via `COMMIT_REF_NAME` env variable)',
    })
        // @ts-expect-error If not set, it will be caught during config validation
        .default(process.env.COMMIT_REF_NAME),
    /**
     * Git commit SHA (e.g. 'b9b8b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9')
     */
    commitHash: z
        .string({
        required_error: 'Required (can be set via `COMMIT_HASH` env variable)',
    })
        // @ts-expect-error If not set, it will be caught during config validation
        .default(process.env.COMMIT_HASH),
    /**
     * File path to event.json file
     */
    eventFilePath: z.string().optional(),
    /**
     * Whether to set the GitHub status check on process start or not
     *
     * Setting this option to `true` makes only sense if the repository settings have pending status checks disabled
     * @default false
     */
    setPendingStatusCheck: z.boolean().default(false),
});
exports.GenerateOnlyModeConfigSchema = BaseConfigSchema.extend({
    /**
     * Run in local mode
     * @deprecated Defaults to running in generateOnly mode
     */
    generateOnly: z.boolean().optional(),
    /**
     * Flag that decides if process should exit if a difference is found
     */
    failOnDifference: z.boolean().optional(),
    /**
     * Path to the baseline image folder
     * @default '.lostpixel/baseline/'
     */
    imagePathBaseline: z.string().default('.lostpixel/baseline/'),
    /**
     * Path to the difference image folder
     * @default '.lostpixel/difference/'
     */
    imagePathDifference: z.string().default('.lostpixel/difference/'),
    /**
     * Number of concurrent screenshots to compare
     * @default 10
     */
    compareConcurrency: z.number().default(10),
    /**
     * Which comparison engine to use for diffing images
     * @default 'pixelmatch'
     */
    compareEngine: z.enum(['pixelmatch', 'odiff']).default('pixelmatch'),
    /**
     * Filter stories to take screenshots of and run comparisons on (existing shots remain untouched)
     */
    filterItemsToCheck: z
        .function()
        .args(ShotItem)
        .returns(z.boolean())
        .optional(),
});
exports.ConfigSchema = z.union([
    exports.PlatformModeConfigSchema,
    exports.GenerateOnlyModeConfigSchema,
]);
// use partial() specifically for the inferred type
exports.FlexibleConfigSchema = z.union([
    exports.PlatformModeConfigSchema.extend({
        timeouts: TimeoutsSchema.partial(),
        pageShots: PageShotsSchema.extend({
            pages: z.array(exports.PageScreenshotParameterSchema.partial()),
        }),
    }).partial(),
    exports.GenerateOnlyModeConfigSchema.extend({
        timeouts: TimeoutsSchema.partial(),
        pageShots: PageShotsSchema.extend({
            pages: z.array(exports.PageScreenshotParameterSchema.partial()),
        }),
    }).partial(),
]);
const isPlatformModeConfig = (userConfig) => ('apiKey' in userConfig && typeof userConfig.apiKey === 'string') ||
    ('lostPixelProjectId' in userConfig &&
        typeof userConfig.lostPixelProjectId === 'string');
exports.isPlatformModeConfig = isPlatformModeConfig;
const printConfigErrors = (error) => {
    for (const issue of error.issues) {
        log_1.log.process('error', 'config', [
            'Configuration error:',
            `  - Path: ${issue.path.join('.')}`,
            `  - Message: ${issue.message}`,
        ].join('\n'));
    }
};
const parseConfig = (userConfig) => {
    if ((0, exports.isPlatformModeConfig)(userConfig)) {
        const platformCheck = exports.PlatformModeConfigSchema.safeParse(userConfig);
        if (platformCheck.success) {
            return platformCheck.data;
        }
        printConfigErrors(platformCheck.error);
    }
    else {
        const generateOnlyCheck = exports.GenerateOnlyModeConfigSchema.safeParse(userConfig);
        if (generateOnlyCheck.success) {
            return generateOnlyCheck.data;
        }
        printConfigErrors(generateOnlyCheck.error);
    }
    throw new Error('Configuration error');
};
exports.parseConfig = parseConfig;
const configDirBase = (_a = process.env.LOST_PIXEL_CONFIG_DIR) !== null && _a !== void 0 ? _a : process.cwd();
const configFileNameBase = node_path_1.default.join(node_path_1.default.isAbsolute(configDirBase) ? '' : process.cwd(), configDirBase, 'lostpixel.config');
const loadProjectConfig = async () => {
    log_1.log.process('info', 'config', 'Loading project config ...');
    log_1.log.process('info', 'config', 'Current working directory:', process.cwd());
    if (process.env.LOST_PIXEL_CONFIG_DIR) {
        log_1.log.process('info', 'config', 'Defined config directory:', process.env.LOST_PIXEL_CONFIG_DIR);
    }
    const configExtensions = ['ts', 'js', 'cjs', 'mjs'];
    const configExtensionsString = configExtensions.join('|');
    log_1.log.process('info', 'config', 'Looking for config file:', `${configFileNameBase}.(${configExtensionsString})`);
    const configFiles = configExtensions
        .map((ext) => `${configFileNameBase}.${ext}`)
        .filter((file) => (0, node_fs_1.existsSync)(file));
    if (configFiles.length === 0) {
        log_1.log.process('error', 'config', `Couldn't find project config file 'lostpixel.config.(${configExtensionsString})'`);
        process.exit(1);
    }
    if (configFiles.length > 1) {
        log_1.log.process('info', 'config', '✅ Found multiple config files, taking:', configFiles[0]);
    }
    else {
        log_1.log.process('info', 'config', '✅ Found config file:', configFiles[0]);
    }
    const configFile = configFiles[0];
    try {
        const imported = (await (0, configHelper_1.loadProjectConfigFile)(configFile));
        return imported;
    }
    catch (_a) {
        log_1.log.process('error', 'config', 'Loading config using ESBuild failed, using fallback option');
        try {
            if ((0, node_fs_1.existsSync)(`${configFileNameBase}.js`)) {
                const projectConfig = 
                // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
                require(`${configFileNameBase}.js`);
                log_1.log.process('info', 'config', '✅ Successfully loaded configuration from:', `${configFileNameBase}.js`);
                return projectConfig;
            }
            if ((0, node_fs_1.existsSync)(`${configFileNameBase}.ts`)) {
                const imported = (await (0, configHelper_1.loadTSProjectConfigFile)(configFile));
                log_1.log.process('info', 'config', '✅ Successfully loaded configuration from:', `${configFileNameBase}.ts`);
                return imported;
            }
            log_1.log.process('error', 'config', "Couldn't find project config file 'lostpixel.config.js'");
            process.exit(1);
        }
        catch (error) {
            log_1.log.process('error', 'config', `Failed to load config file: ${configFile}`);
            log_1.log.process('error', 'config', error);
            process.exit(1);
        }
    }
};
const configure = async ({ customProjectConfig, localDebugMode, }) => {
    var _a;
    if (customProjectConfig) {
        exports.config = (0, exports.parseConfig)(customProjectConfig);
        return;
    }
    let loadedProjectConfig = await loadProjectConfig();
    if (localDebugMode) {
        let localDebugConfig = loadedProjectConfig;
        if ((0, exports.isPlatformModeConfig)(loadedProjectConfig)) {
            localDebugConfig = Object.assign(Object.assign({}, loadedProjectConfig), { generateOnly: true, 
                // @ts-expect-error Force it into generateOnly mode by dropping the platform specific properties
                lostPixelProjectId: undefined, 
                // @ts-expect-error Force it into generateOnly mode by dropping the platform specific properties
                apiKey: undefined });
        }
        const urlChunks = ['http://', 'https://', '127.0.0.1'];
        if (((_a = localDebugConfig.pageShots) === null || _a === void 0 ? void 0 : _a.baseUrl) &&
            urlChunks.some((urlChunk) => { var _a; return (_a = localDebugConfig === null || localDebugConfig === void 0 ? void 0 : localDebugConfig.pageShots) === null || _a === void 0 ? void 0 : _a.baseUrl.includes(urlChunk); })) {
            const url = new URL(localDebugConfig.pageShots.baseUrl);
            url.hostname = 'localhost';
            localDebugConfig.pageShots.baseUrl = url.toString();
        }
        loadedProjectConfig = localDebugConfig;
    }
    // Default to Storybook mode if no mode is defined
    if (!loadedProjectConfig.storybookShots &&
        !loadedProjectConfig.pageShots &&
        !loadedProjectConfig.ladleShots &&
        !loadedProjectConfig.histoireShots &&
        !loadedProjectConfig.customShots) {
        loadedProjectConfig.storybookShots = {
            storybookUrl: 'storybook-static',
        };
    }
    exports.config = (0, exports.parseConfig)(loadedProjectConfig);
};
exports.configure = configure;
