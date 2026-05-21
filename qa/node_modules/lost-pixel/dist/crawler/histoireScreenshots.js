"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectHistoireStories = exports.generateHistoireShotItems = void 0;
const node_path_1 = __importDefault(require("node:path"));
const axios_1 = __importDefault(require("axios"));
const log_1 = require("../log");
const config_1 = require("../config");
const constants_1 = require("../constants");
const utils_1 = require("../shots/utils");
const generateShotItemsForStory = (story, baseUrl, browser) => {
    var _a, _b, _c, _d;
    const shotItems = [];
    // Treat stories without variants as if they had a single variant
    const variants = (_a = story.variants) !== null && _a !== void 0 ? _a : [story];
    for (const variant of variants) {
        const shotName = (_c = (_b = config_1.config.shotNameGenerator) === null || _b === void 0 ? void 0 : _b.call(config_1.config, Object.assign(Object.assign({}, variant), { shotMode: 'histoire' }))) !== null && _c !== void 0 ? _c : `${story.id}_${variant.title}`;
        const label = (0, utils_1.generateLabel)({ browser });
        const fileNameWithExt = `${shotName}${label}.png`;
        shotItems.push({
            shotMode: 'histoire',
            id: `${story.id}_${variant.id}${label}`,
            shotName: `${shotName}${label}`,
            url: `${baseUrl}/__sandbox.html?storyId=${story.id}&variantId=${variant.id}`,
            filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathBaseline, fileNameWithExt),
            filePathCurrent: node_path_1.default.join(config_1.config.imagePathCurrent, fileNameWithExt),
            filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : node_path_1.default.join(config_1.config.imagePathDifference, fileNameWithExt),
            threshold: config_1.config.threshold,
            waitForSelector: (_d = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.histoireShots) === null || _d === void 0 ? void 0 : _d.waitForSelector,
        });
    }
    return shotItems.filter((story) => story.id !== 'full-config');
};
const generateHistoireShotItems = (baseUrl, stories, browser) => {
    return stories.flatMap((story) => generateShotItemsForStory(story, baseUrl, browser));
};
exports.generateHistoireShotItems = generateHistoireShotItems;
const collectHistoireStories = async (histoireUrl) => {
    const jsonUrl = `${histoireUrl}/histoire.json`;
    log_1.log.process('info', 'general', `\n=== [Histoire Mode] ${jsonUrl} ===\n`);
    const response = await axios_1.default.get(jsonUrl);
    // Ignore the full-config story from Histoire as it is just JSON
    return response.data.stories;
};
exports.collectHistoireStories = collectHistoireStories;
