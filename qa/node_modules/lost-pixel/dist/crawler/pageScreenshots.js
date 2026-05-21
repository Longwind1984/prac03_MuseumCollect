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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagesFromExternalLoader = exports.generatePageShotItems = void 0;
const node_path_1 = __importDefault(require("node:path"));
const axios_1 = __importStar(require("axios"));
const zod_1 = require("zod");
const fs_extra_1 = __importDefault(require("fs-extra"));
const log_1 = require("../log");
const config_1 = require("../config");
const utils_1 = require("../shots/utils");
const constants_1 = require("../constants");
const generateBrowserConfig = (page) => {
    var _a, _b;
    const browserConfig = (_a = config_1.config.configureBrowser) === null || _a === void 0 ? void 0 : _a.call(config_1.config, Object.assign(Object.assign({}, page), { shotMode: 'page' }));
    if (page.viewport && browserConfig) {
        (_b = browserConfig.viewport) !== null && _b !== void 0 ? _b : (browserConfig.viewport = {
            width: 1280,
            height: 720,
        });
        browserConfig.viewport = Object.assign(Object.assign({}, browserConfig.viewport), page.viewport);
    }
    return browserConfig;
};
const generatePageShotItems = (pages, baseUrl, mask, modeBreakpoints, browser) => {
    const names = pages.map((page) => page.name);
    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
        throw new Error('Error: Page names must be unique');
    }
    return pages.flatMap((page) => {
        var _a, _b, _c, _d, _e, _f;
        const shotName = (_b = (_a = config_1.config.shotNameGenerator) === null || _a === void 0 ? void 0 : _a.call(config_1.config, Object.assign(Object.assign({}, page), { shotMode: 'page' }))) !== null && _b !== void 0 ? _b : page.name;
        let label = (0, utils_1.generateLabel)({ browser });
        let fileNameWithExt = `${shotName}${label}.png`;
        const baseShotItem = {
            shotMode: 'page',
            id: `${shotName}${label}`,
            shotName: `${shotName}${label}`,
            url: node_path_1.default.join(baseUrl, page.path),
            filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt),
            filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt),
            filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt),
            browserConfig: generateBrowserConfig(page),
            threshold: (_c = page.threshold) !== null && _c !== void 0 ? _c : config_1.config.threshold,
            waitBeforeScreenshot: (_d = page.waitBeforeScreenshot) !== null && _d !== void 0 ? _d : config_1.config.waitBeforeScreenshot,
            mask: [...(mask !== null && mask !== void 0 ? mask : []), ...((_e = page.mask) !== null && _e !== void 0 ? _e : [])],
            waitForSelector: (_f = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.pageShots) === null || _f === void 0 ? void 0 : _f.waitForSelector,
        };
        const breakpoints = (0, utils_1.selectBreakpoints)(config_1.config.breakpoints, modeBreakpoints, page.breakpoints);
        if (breakpoints.length === 0) {
            return [baseShotItem];
        }
        return breakpoints.map((breakpoint) => {
            label = (0, utils_1.generateLabel)({ breakpoint, browser });
            fileNameWithExt = `${shotName}${label}.png`;
            return Object.assign(Object.assign({}, baseShotItem), { id: `${shotName}${label}`, shotName: `${shotName}${label}`, breakpoint, breakpointGroup: page.name, url: node_path_1.default.join(baseUrl, page.path), filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                    ? constants_1.notSupported
                    : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt), filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt), filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                    ? constants_1.notSupported
                    : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt), viewport: { width: breakpoint }, browserConfig: generateBrowserConfig(Object.assign(Object.assign({}, page), { viewport: { width: breakpoint } })) });
        });
    });
};
exports.generatePageShotItems = generatePageShotItems;
// Helper function to check if a string is a valid URL
const isValidHttpUrl = (string) => {
    let url;
    try {
        url = new URL(string);
    }
    catch (_a) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
};
const getPagesFromExternalLoader = async () => {
    var _a;
    try {
        if (!((_a = config_1.config.pageShots) === null || _a === void 0 ? void 0 : _a.pagesJsonUrl)) {
            return [];
        }
        log_1.log.process('info', 'general', `⏬ Loading pages from ${config_1.config.pageShots.pagesJsonUrl}`);
        let pages;
        // Check if the pagesJsonUrl is a valid URL or a local file path
        if (isValidHttpUrl(config_1.config.pageShots.pagesJsonUrl)) {
            log_1.log.process('info', 'general', `🕸️ Trying to fetch from URL`);
            const response = await axios_1.default.get(config_1.config.pageShots.pagesJsonUrl);
            pages = response.data;
        }
        else {
            // Read the file from the local filesystem
            log_1.log.process('info', 'general', `⏬ Trying to fetch from local file`);
            const fileContents = await fs_extra_1.default.readFile(config_1.config.pageShots.pagesJsonUrl, 'utf8');
            pages = JSON.parse(fileContents);
        }
        // Validation logic remains the same
        const pagesArraySchema = zod_1.z.array(zod_1.z.object({
            path: zod_1.z.string(),
            name: zod_1.z.string(),
            waitBeforeScreenshot: zod_1.z.number().optional(),
            threshold: zod_1.z.number().optional(),
            mask: zod_1.z
                .array(zod_1.z.object({
                selector: zod_1.z.string(),
            }))
                .optional(),
            viewport: zod_1.z
                .object({
                width: zod_1.z.string(),
                height: zod_1.z.string(),
            })
                .optional(),
        }));
        const validatePages = pagesArraySchema.safeParse(pages);
        if (validatePages.success) {
            log_1.log.process('info', 'general', `✅ Successfully validated pages structure & loaded ${pages.length} pages from JSON file.`);
            return pages;
        }
        log_1.log.process('error', 'general', '❌ Error validating the loaded pages structure');
        log_1.log.process('error', 'general', validatePages.error);
        return [];
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error) || error instanceof Error) {
            log_1.log.process('error', 'network', `❌ Error when fetching data: ${error.message}`);
        }
        return [];
    }
};
exports.getPagesFromExternalLoader = getPagesFromExternalLoader;
