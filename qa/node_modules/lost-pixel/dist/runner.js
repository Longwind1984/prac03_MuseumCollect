"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformRunner = exports.getPlatformApiToken = exports.runner = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const checkDifferences_1 = require("./checkDifferences");
const createShots_1 = require("./createShots");
const utils_1 = require("./utils");
const api_1 = require("./api");
const log_1 = require("./log");
const upload_1 = require("./upload");
const runner = async (config) => {
    const executionStart = process.hrtime();
    try {
        if ((0, utils_1.isUpdateMode)()) {
            log_1.log.process('info', 'general', 'Running lost-pixel in update mode. Baseline screenshots will be updated');
        }
        log_1.log.process('info', 'general', '📂 Creating shot folders');
        const createShotsStart = process.hrtime();
        (0, utils_1.createShotsFolders)();
        log_1.log.process('info', 'general', '📸 Creating shots');
        const shotItems = await (0, createShots_1.createShots)();
        const createShotsStop = process.hrtime(createShotsStart);
        log_1.log.process('info', 'general', `Creating shots took ${(0, utils_1.parseHrtimeToSeconds)(createShotsStop)} seconds`);
        if (config.generateOnly && shotItems.length === 0) {
            log_1.log.process('info', 'general', `👋 Exiting process with nothing to compare.`);
            await (0, utils_1.exitProcess)({ shotsNumber: shotItems.length });
        }
        log_1.log.process('info', 'general', '🔍 Checking differences');
        const checkDifferenceStart = process.hrtime();
        const { filterItemsToCheck } = config;
        const filteredShotItems = filterItemsToCheck
            ? shotItems.filter((item) => filterItemsToCheck(item))
            : shotItems;
        const { aboveThresholdDifferenceItems, noBaselinesItems } = await (0, checkDifferences_1.checkDifferences)(filteredShotItems);
        if ((0, utils_1.isUpdateMode)()) {
            // Remove only the files which are no longer present in our shot items
            (0, utils_1.removeFilesInFolder)(config.imagePathBaseline, shotItems.map((shotItem) => shotItem.filePathBaseline));
            // Synchronize differences from both lack of baseline and over threshold difference
            for (const noBaselineItem of noBaselinesItems) {
                fs_extra_1.default.copySync(noBaselineItem.filePathCurrent, noBaselineItem.filePathBaseline);
            }
            for (const aboveThresholdDifferenceItem of aboveThresholdDifferenceItems) {
                fs_extra_1.default.copySync(aboveThresholdDifferenceItem.filePathCurrent, aboveThresholdDifferenceItem.filePathBaseline);
            }
        }
        if ((aboveThresholdDifferenceItems.length > 0 ||
            noBaselinesItems.length > 0) &&
            config.failOnDifference) {
            log_1.log.process('info', 'general', `👋 Exiting process with ${aboveThresholdDifferenceItems.length} found differences & ${noBaselinesItems.length} baselines to update`);
            if (config.generateOnly) {
                await (0, utils_1.exitProcess)({ shotsNumber: shotItems.length });
            }
        }
        const checkDifferenceStop = process.hrtime(checkDifferenceStart);
        log_1.log.process('info', 'general', `⏱  Checking differences took ${(0, utils_1.parseHrtimeToSeconds)(checkDifferenceStop)} seconds`);
        const executionStop = process.hrtime(executionStart);
        log_1.log.process('info', 'general', `⏱  Lost Pixel run took ${(0, utils_1.parseHrtimeToSeconds)(executionStop)} seconds`);
        await (0, utils_1.exitProcess)({
            shotsNumber: shotItems.length,
            runDuration: Number((0, utils_1.parseHrtimeToSeconds)(executionStop)),
            exitCode: 0,
        });
    }
    catch (error) {
        const executionStop = process.hrtime(executionStart);
        if (error instanceof Error) {
            log_1.log.process('error', 'general', error.message);
        }
        else {
            log_1.log.process('error', 'general', error);
        }
        await (0, utils_1.exitProcess)({
            runDuration: Number((0, utils_1.parseHrtimeToSeconds)(executionStop)),
            error,
        });
    }
};
exports.runner = runner;
const getPlatformApiToken = async (config) => {
    if (!config.apiKey) {
        log_1.log.process('error', 'general', `Running Lost Pixel in 'platform' mode requires an API key`);
        process.exit(1);
    }
    if ((0, utils_1.isUpdateMode)()) {
        log_1.log.process('error', 'general', `Running Lost Pixel in 'update' mode requires the 'generateOnly' option to be set to true`);
        process.exit(1);
    }
    try {
        const result = await (0, api_1.getApiToken)(config);
        return result.apiToken;
    }
    catch (error) {
        if (error instanceof Error) {
            log_1.log.process('error', 'general', error.message);
        }
        else {
            log_1.log.process('error', 'general', error);
        }
        process.exit(1);
    }
};
exports.getPlatformApiToken = getPlatformApiToken;
const checkForCachedBuild = async (config, apiToken) => {
    if (process.env.LOST_PIXEL_CACHE_KEY) {
        log_1.log.process('info', 'general', `♻️  Using cache key ${process.env.LOST_PIXEL_CACHE_KEY}`);
        const { cacheExists } = await (0, api_1.sendCheckCacheToAPI)(config, apiToken, process.env.LOST_PIXEL_CACHE_KEY);
        if (cacheExists) {
            log_1.log.process('info', 'general', `♻️  Cache hit for key ${process.env.LOST_PIXEL_CACHE_KEY} - Skipping shot creation`);
            const { uploadToken } = await (0, api_1.prepareUpload)(config, apiToken, [], process.env.LOST_PIXEL_CACHE_KEY);
            await (0, api_1.processShots)(config, apiToken, uploadToken, [], process.env.LOST_PIXEL_CACHE_KEY);
            return true;
        }
        log_1.log.process('info', 'general', `♻️  Cache miss for key ${process.env.LOST_PIXEL_CACHE_KEY}`);
    }
    return false;
};
const platformRunner = async (config, apiToken) => {
    const executionStart = process.hrtime();
    try {
        log_1.log.process('info', 'general', [
            '📀 Using details:',
            `ciBuildId = ${config.ciBuildId}`,
            `ciBuildNumber = ${config.ciBuildNumber}`,
            `repository = ${config.repository}`,
            `commitRefName = ${config.commitRefName}`,
            `commitHash = ${config.commitHash}`,
        ].join('\n   - '));
        if (config.setPendingStatusCheck) {
            await (0, api_1.sendInitToAPI)(config, apiToken);
        }
        const foundCache = await checkForCachedBuild(config, apiToken);
        if (!foundCache) {
            log_1.log.process('info', 'general', '📂 Creating shot folders');
            const createShotsStart = process.hrtime();
            (0, utils_1.createShotsFolders)();
            log_1.log.process('info', 'general', '📸 Creating shots');
            const shotItems = await (0, createShots_1.createShots)();
            const shotNames = shotItems.map((shotItem) => shotItem.shotName);
            const uniqueShotNames = new Set(shotNames);
            if (shotNames.length !== uniqueShotNames.size) {
                const duplicates = shotNames.filter((shotName) => shotNames.filter((item) => item === shotName).length > 1);
                throw new Error(`Error: Shot names must be unique (check for duplicate Story names: [ ${[
                    ...new Set(duplicates),
                ].join(', ')} ])`);
            }
            const createShotsStop = process.hrtime(createShotsStart);
            log_1.log.process('info', 'general', `⏱  Creating shots took ${(0, utils_1.parseHrtimeToSeconds)(createShotsStop)} seconds`);
            const extendedShotItems = shotItems.map((shotItem) => (Object.assign(Object.assign({}, shotItem), { uniqueName: `${shotItem.shotMode}/${shotItem.shotName}`, hash: (0, utils_1.hashFile)(shotItem.filePathCurrent) })));
            const { requiredFileHashes, uploadToken, uploadUrl } = await (0, api_1.prepareUpload)(config, apiToken, extendedShotItems.map((shotItem) => ({
                name: shotItem.uniqueName,
                hash: shotItem.hash,
            })));
            log_1.log.process('info', 'general', [
                `🏙 `,
                `${shotItems.length} shot(s) in total.`,
                `${shotItems.length - requiredFileHashes.length} shot(s) already exist on platform.`,
                `${requiredFileHashes.length} shot(s) will be uploaded at ${uploadUrl}.`,
            ].join(' '));
            await (0, upload_1.uploadRequiredShots)({
                config,
                apiToken,
                uploadToken,
                uploadUrl,
                requiredFileHashes,
                extendedShotItems,
            });
            const shotsConfig = shotItems.map((shotItem) => ({
                name: `${shotItem.shotMode}/${shotItem.shotName}`,
                threshold: shotItem.threshold,
            }));
            await (0, api_1.processShots)(config, apiToken, uploadToken, shotsConfig, process.env.LOST_PIXEL_CACHE_KEY);
        }
        const executionStop = process.hrtime(executionStart);
        log_1.log.process('info', 'general', `⏱  Lost Pixel run took ${(0, utils_1.parseHrtimeToSeconds)(executionStop)} seconds`);
    }
    catch (error) {
        if (error instanceof Error) {
            log_1.log.process('error', 'general', error.message);
        }
        else {
            log_1.log.process('error', 'general', error);
        }
        log_1.log.process('info', 'general', '🪵  Sending logs to platform.');
        await (0, api_1.sendRecordLogsToAPI)(config, apiToken);
        process.exit(1);
    }
};
exports.platformRunner = platformRunner;
