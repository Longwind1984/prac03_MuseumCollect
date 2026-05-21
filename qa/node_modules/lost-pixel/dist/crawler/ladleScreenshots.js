"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectLadleStories = exports.generateLadleShotItems = void 0;
const node_path_1 = __importDefault(require("node:path"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const utils_1 = require("../shots/utils");
const constants_1 = require("../constants");
const generateLadleShotItems = (baseUrl, isLocalServer, ladleStories, mask, modeBreakpoints, browser) => {
    const ladleUrl = isLocalServer ? `${baseUrl}/index.html` : baseUrl;
    return ladleStories
        .filter((story) => { var _a, _b; return ((_b = (_a = story.parameters) === null || _a === void 0 ? void 0 : _a.lostpixel) === null || _b === void 0 ? void 0 : _b.disable) !== true; })
        .filter((story) => config_1.config.filterShot
        ? config_1.config.filterShot(Object.assign(Object.assign({}, story), { shotMode: 'ladle' }))
        : true)
        .flatMap((ladleStory) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const shotName = (_b = (_a = config_1.config.shotNameGenerator) === null || _a === void 0 ? void 0 : _a.call(config_1.config, Object.assign(Object.assign({}, ladleStory), { shotMode: 'ladle' }))) !== null && _b !== void 0 ? _b : ladleStory.id;
        let label = (0, utils_1.generateLabel)({ browser });
        let fileNameWithExt = `${shotName}${label}.png`;
        const shotItem = {
            shotMode: 'ladle',
            id: `${ladleStory.story}${label}`,
            shotName: `${shotName}${label}`,
            importPath: ladleStory.importPath,
            url: `${ladleUrl}?story=${ladleStory.story}&mode=preview`,
            filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt),
            filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt),
            filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt),
            threshold: (_e = (_d = (_c = ladleStory.parameters) === null || _c === void 0 ? void 0 : _c.lostpixel) === null || _d === void 0 ? void 0 : _d.threshold) !== null && _e !== void 0 ? _e : config_1.config.threshold,
            waitBeforeScreenshot: (_h = (_g = (_f = ladleStory.parameters) === null || _f === void 0 ? void 0 : _f.lostpixel) === null || _g === void 0 ? void 0 : _g.waitBeforeScreenshot) !== null && _h !== void 0 ? _h : config_1.config.waitBeforeScreenshot,
            mask: [
                ...(mask !== null && mask !== void 0 ? mask : []),
                ...((_l = (_k = (_j = ladleStory.parameters) === null || _j === void 0 ? void 0 : _j.lostpixel) === null || _k === void 0 ? void 0 : _k.mask) !== null && _l !== void 0 ? _l : []),
            ],
            elementLocator: (_r = (_p = (_o = (_m = ladleStory.parameters) === null || _m === void 0 ? void 0 : _m.lostpixel) === null || _o === void 0 ? void 0 : _o.elementLocator) !== null && _p !== void 0 ? _p : (_q = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.storybookShots) === null || _q === void 0 ? void 0 : _q.elementLocator) !== null && _r !== void 0 ? _r : '',
            waitForSelector: (_t = (_s = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.ladleShots) === null || _s === void 0 ? void 0 : _s.waitForSelector) !== null && _t !== void 0 ? _t : '[data-storyloaded]',
        };
        const breakpoints = (0, utils_1.selectBreakpoints)(config_1.config.breakpoints, modeBreakpoints, (_v = (_u = ladleStory.parameters) === null || _u === void 0 ? void 0 : _u.lostpixel) === null || _v === void 0 ? void 0 : _v.breakpoints);
        if (breakpoints.length === 0) {
            return [shotItem];
        }
        return breakpoints.map((breakpoint) => {
            label = (0, utils_1.generateLabel)({ breakpoint, browser });
            fileNameWithExt = `${shotName}${label}.png`;
            return Object.assign(Object.assign({}, shotItem), { id: `${ladleStory.story}${label}`, shotName: `${ladleStory.story}${label}`, breakpoint, breakpointGroup: ladleStory.story, url: `${ladleUrl}?story=${ladleStory.story}&mode=preview&width=${breakpoint}`, filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                    ? constants_1.notSupported
                    : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt), filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt), filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                    ? constants_1.notSupported
                    : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt), viewport: { width: breakpoint } });
        });
    });
};
exports.generateLadleShotItems = generateLadleShotItems;
const collectLadleStories = async (ladleUrl) => {
    const { data, } = await axios_1.default.get(`${ladleUrl}/meta.json`);
    const collection = [];
    for (const [key, storyConfig] of Object.entries(data.stories)) {
        collection.push({
            id: key,
            story: key,
            kind: key,
            importPath: storyConfig.filePath,
            parameters: storyConfig.meta,
        });
    }
    return collection;
};
exports.collectLadleStories = collectLadleStories;
