"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStorybookShotItems = exports.collectStories = exports.collectStoriesViaStoriesJson = exports.collectStoriesViaWindowApi = exports.getIframeUrl = exports.getStoryBookUrl = void 0;
const node_path_1 = __importDefault(require("node:path"));
const lodash_kebabcase_1 = __importDefault(require("lodash.kebabcase"));
const fs_extra_1 = require("fs-extra");
const config_1 = require("../config");
const utils_1 = require("../utils");
const log_1 = require("../log");
const utils_2 = require("../shots/utils");
const constants_1 = require("../constants");
const getStoryBookUrl = (url) => {
    if (url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('file://')) {
        return url;
    }
    if (url.startsWith('/')) {
        return `file://${url}`;
    }
    return `file://${node_path_1.default.normalize(node_path_1.default.join(process.cwd(), url))}`;
};
exports.getStoryBookUrl = getStoryBookUrl;
const getIframeUrl = (url) => url.endsWith('/') ? `${url}iframe.html` : `${url}/iframe.html`;
exports.getIframeUrl = getIframeUrl;
const collectStoriesViaWindowApi = async (context, url, isIframeUrl) => {
    const page = await context.newPage();
    const iframeUrl = isIframeUrl
        ? (0, exports.getStoryBookUrl)(url)
        : (0, exports.getIframeUrl)((0, exports.getStoryBookUrl)(url));
    await page.goto(iframeUrl);
    await page.waitForFunction(() => window.__STORYBOOK_PREVIEW__, null, {
        timeout: config_1.config.timeouts.fetchStories,
    });
    // Storybook >= 8 expose a new preview API that has a `ready` method to be awaited before proceeding
    const isV8OrAbove = await page.evaluate(async () => {
        const { __STORYBOOK_PREVIEW__: api } = window;
        return api.ready !== undefined;
    });
    if (isV8OrAbove) {
        // SB v8 and above
        await page.evaluate(async () => {
            const { __STORYBOOK_PREVIEW__: api } = window;
            if (api.ready) {
                await api.ready();
            }
        });
    }
    else {
        // SB v7 and below
        await page.waitForFunction(() => window.__STORYBOOK_CLIENT_API__, null, {
            timeout: config_1.config.timeouts.fetchStories,
        });
        await page.evaluate(async () => {
            var _a, _b;
            const { __STORYBOOK_CLIENT_API__: api } = window;
            if (api.storyStore) {
                await ((_b = (_a = api.storyStore).cacheAllCSFFiles) === null || _b === void 0 ? void 0 : _b.call(_a));
            }
        });
    }
    const result = await page.evaluate(async () => {
        const parseParameters = (parameters, level = 0) => {
            if (level > 10) {
                return 'UNSUPPORTED_DEPTH';
            }
            if (Array.isArray(parameters)) {
                // @ts-expect-error FIXME
                return parameters.map((value) => parseParameters(value, level + 1));
            }
            if (typeof parameters === 'string' ||
                typeof parameters === 'number' ||
                typeof parameters === 'boolean' ||
                parameters === undefined ||
                typeof parameters === 'function' ||
                parameters instanceof RegExp ||
                parameters instanceof Date ||
                parameters === null) {
                return parameters;
            }
            if (typeof parameters === 'object' && parameters !== null) {
                // @ts-expect-error FIXME
                // eslint-disable-next-line unicorn/no-array-reduce
                return Object.keys(parameters).reduce((acc, key) => {
                    // @ts-expect-error FIXME
                    acc[key] = parseParameters(parameters[key], level + 1);
                    return acc;
                }, {});
            }
            return 'UNSUPPORTED_TYPE';
        };
        const mapStories = (stories) => stories.map((story) => {
            const parameters = parseParameters(story.parameters);
            return {
                id: story.id,
                kind: story.kind,
                story: story.story,
                importPath: parameters === null || parameters === void 0 ? void 0 : parameters.fileName,
                parameters,
            };
        });
        const { __STORYBOOK_PREVIEW__: previewApi, __STORYBOOK_CLIENT_API__: clientApi, } = window;
        let stories = [];
        if (previewApi.extract) {
            const items = await previewApi.extract();
            stories = mapStories(Object.values(items));
        }
        else if (clientApi.raw) {
            // Fallback for 6.4 and below
            stories = mapStories(clientApi.raw());
        }
        return { stories };
    });
    return result;
};
exports.collectStoriesViaWindowApi = collectStoriesViaWindowApi;
const collectStoriesViaStoriesJson = async (context, url) => {
    const storiesJsonUrl = url.endsWith('/')
        ? `${url}stories.json`
        : `${url}/stories.json`;
    let storiesJson;
    if (storiesJsonUrl.startsWith('file://')) {
        try {
            const file = (0, fs_extra_1.readFileSync)(storiesJsonUrl.slice(7));
            storiesJson = JSON.parse(file.toString());
        }
        catch (_a) {
            throw new Error(`Cannot load file ${storiesJsonUrl}`);
        }
    }
    else {
        const result = await context.request.get(storiesJsonUrl);
        storiesJson = (await result.json());
    }
    if (typeof storiesJson.stories === 'object') {
        return {
            stories: Object.values(storiesJson.stories),
        };
    }
    throw new Error(`Cannot load resource ${storiesJsonUrl}`);
};
exports.collectStoriesViaStoriesJson = collectStoriesViaStoriesJson;
const collectStories = async (url) => {
    const browser = await (0, utils_1.launchBrowser)();
    const context = await browser.newContext();
    try {
        log_1.log.process('info', 'general', 'Trying to collect stories via window object');
        const result = await (0, exports.collectStoriesViaWindowApi)(context, url);
        await browser.close();
        return result;
    }
    catch (error) {
        log_1.log.process('info', 'general', 'Fallback to /stories.json');
        log_1.log.process('error', 'general', error);
    }
    try {
        const result = await (0, exports.collectStoriesViaStoriesJson)(context, url);
        await browser.close();
        return result;
    }
    catch (error) {
        await browser.close();
        throw error;
    }
};
exports.collectStories = collectStories;
const generateBrowserConfig = (story) => {
    var _a, _b, _c;
    const browserConfig = (_a = config_1.config.configureBrowser) === null || _a === void 0 ? void 0 : _a.call(config_1.config, Object.assign(Object.assign({}, story), { shotMode: 'storybook' }));
    if (((_b = story.parameters) === null || _b === void 0 ? void 0 : _b.viewport) && browserConfig) {
        (_c = browserConfig.viewport) !== null && _c !== void 0 ? _c : (browserConfig.viewport = {
            width: 1280,
            height: 720,
        });
        browserConfig.viewport = Object.assign(Object.assign({}, browserConfig.viewport), story.parameters.viewport);
    }
    return browserConfig;
};
const generateStoryUrl = (iframeUrl, storyId, args, breakpoint) => {
    let url = `${iframeUrl}?id=${storyId}&viewMode=story`;
    if (args) {
        const argsString = Object.entries(args)
            .map(([key, value]) => `${key}:${value}`)
            .join(';');
        url += `&args=${argsString}`;
    }
    if (breakpoint !== undefined) {
        url += `&width=${breakpoint}`;
    }
    return url;
};
const generateFilename = (kind, story, prefix, suffix) => {
    return [prefix, (0, lodash_kebabcase_1.default)(kind), (0, lodash_kebabcase_1.default)(story), (0, lodash_kebabcase_1.default)(suffix)]
        .filter(Boolean)
        .join('--');
};
const generateStorybookShotItems = (baseUrl, stories, mask, modeBreakpoints, browser) => {
    const iframeUrl = (0, exports.getIframeUrl)((0, exports.getStoryBookUrl)(baseUrl));
    return stories
        .filter((story) => { var _a, _b; return ((_b = (_a = story.parameters) === null || _a === void 0 ? void 0 : _a.lostpixel) === null || _b === void 0 ? void 0 : _b.disable) !== true; })
        .filter((story) => { var _a, _b; return ((_b = (_a = story.parameters) === null || _a === void 0 ? void 0 : _a.storyshots) === null || _b === void 0 ? void 0 : _b.disable) !== true; })
        .filter((story) => config_1.config.filterShot
        ? config_1.config.filterShot(Object.assign(Object.assign({}, story), { shotMode: 'storybook' }))
        : true)
        .flatMap((story) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        const shotName = (_b = (_a = config_1.config.shotNameGenerator) === null || _a === void 0 ? void 0 : _a.call(config_1.config, Object.assign(Object.assign({}, story), { shotMode: 'storybook' }))) !== null && _b !== void 0 ? _b : generateFilename(story.kind, story.story);
        let label = (0, utils_2.generateLabel)({ browser });
        let fileNameWithExt = `${shotName}${label}.png`;
        const baseShotItem = {
            shotMode: 'storybook',
            id: `${story.id}${label}`,
            shotName: `${shotName}${label}`,
            importPath: story.importPath,
            url: generateStoryUrl(iframeUrl, story.id, (_d = (_c = story.parameters) === null || _c === void 0 ? void 0 : _c.lostpixel) === null || _d === void 0 ? void 0 : _d.args),
            filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt),
            filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt),
            filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt),
            browserConfig: generateBrowserConfig(story),
            threshold: (_g = (_f = (_e = story.parameters) === null || _e === void 0 ? void 0 : _e.lostpixel) === null || _f === void 0 ? void 0 : _f.threshold) !== null && _g !== void 0 ? _g : config_1.config.threshold,
            waitBeforeScreenshot: (_k = (_j = (_h = story.parameters) === null || _h === void 0 ? void 0 : _h.lostpixel) === null || _j === void 0 ? void 0 : _j.waitBeforeScreenshot) !== null && _k !== void 0 ? _k : config_1.config.waitBeforeScreenshot,
            mask: [...(mask !== null && mask !== void 0 ? mask : []), ...((_o = (_m = (_l = story.parameters) === null || _l === void 0 ? void 0 : _l.lostpixel) === null || _m === void 0 ? void 0 : _m.mask) !== null && _o !== void 0 ? _o : [])],
            elementLocator: (_t = (_r = (_q = (_p = story.parameters) === null || _p === void 0 ? void 0 : _p.lostpixel) === null || _q === void 0 ? void 0 : _q.elementLocator) !== null && _r !== void 0 ? _r : (_s = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.storybookShots) === null || _s === void 0 ? void 0 : _s.elementLocator) !== null && _t !== void 0 ? _t : '',
            waitForSelector: (_u = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.storybookShots) === null || _u === void 0 ? void 0 : _u.waitForSelector,
        };
        const storyLevelBreakpoints = (_x = (_w = (_v = story.parameters) === null || _v === void 0 ? void 0 : _v.lostpixel) === null || _w === void 0 ? void 0 : _w.breakpoints) !== null && _x !== void 0 ? _x : [];
        const breakpoints = (0, utils_2.selectBreakpoints)(config_1.config.breakpoints, modeBreakpoints, storyLevelBreakpoints);
        let shotItems = [];
        if (!breakpoints || breakpoints.length === 0) {
            shotItems = [baseShotItem];
        }
        else {
            shotItems = breakpoints.map((breakpoint) => {
                var _a, _b;
                label = (0, utils_2.generateLabel)({ breakpoint, browser });
                fileNameWithExt = `${shotName}${label}.png`;
                return Object.assign(Object.assign({}, baseShotItem), { id: `${story.id}${label}`, shotName: `${shotName}${label}`, breakpoint, breakpointGroup: story.id, filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                        ? constants_1.notSupported
                        : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt), filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt), filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                        ? constants_1.notSupported
                        : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt), viewport: {
                        width: breakpoint,
                        height: undefined,
                    }, url: generateStoryUrl(iframeUrl, story.id, (_b = (_a = story.parameters) === null || _a === void 0 ? void 0 : _a.lostpixel) === null || _b === void 0 ? void 0 : _b.args, breakpoint), browserConfig: generateBrowserConfig(Object.assign(Object.assign({}, story), { parameters: Object.assign(Object.assign({}, story.parameters), { viewport: {
                                width: breakpoint,
                            } }) })) });
            });
        }
        const extraShots = (_1 = (_0 = (_z = (_y = story.parameters) === null || _y === void 0 ? void 0 : _y.lostpixel) === null || _z === void 0 ? void 0 : _z.extraShots) === null || _0 === void 0 ? void 0 : _0.flatMap((snapshot) => {
            var _a, _b;
            const combinedArgs = Object.assign(Object.assign({}, (_b = (_a = story.parameters) === null || _a === void 0 ? void 0 : _a.lostpixel) === null || _b === void 0 ? void 0 : _b.args), snapshot.args);
            const snapshotShotName = generateFilename(story.kind, story.story, snapshot.prefix, snapshot.suffix);
            return ((breakpoints === null || breakpoints === void 0 ? void 0 : breakpoints.length) === 0 ? [undefined] : breakpoints).map((breakpoint) => {
                var _a;
                label = (0, utils_2.generateLabel)({ breakpoint, browser });
                fileNameWithExt = `${snapshotShotName}${label}.png`;
                return Object.assign(Object.assign({}, baseShotItem), { id: `${story.id}${label}-${(_a = snapshot.name) !== null && _a !== void 0 ? _a : 'snapshot'}`, shotName: `${snapshotShotName}${label}`, breakpoint, breakpointGroup: story.id, filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                        ? constants_1.notSupported
                        : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt), filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt), filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                        ? constants_1.notSupported
                        : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt), url: generateStoryUrl(iframeUrl, story.id, combinedArgs, breakpoint), viewport: breakpoint
                        ? {
                            width: breakpoint,
                            height: undefined,
                        }
                        : undefined, browserConfig: generateBrowserConfig(Object.assign(Object.assign({}, story), { parameters: Object.assign(Object.assign({}, story.parameters), { viewport: {
                                width: breakpoint,
                            } }) })) });
            });
        })) !== null && _1 !== void 0 ? _1 : [];
        return [...shotItems, ...extraShots];
    });
};
exports.generateStorybookShotItems = generateStorybookShotItems;
