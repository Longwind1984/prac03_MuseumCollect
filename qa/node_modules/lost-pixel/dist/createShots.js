"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShots = void 0;
const async_1 = require("async");
const ladleScreenshots_1 = require("./crawler/ladleScreenshots");
const config_1 = require("./config");
const storybook_1 = require("./crawler/storybook");
const pageScreenshots_1 = require("./crawler/pageScreenshots");
const log_1 = require("./log");
const shots_1 = require("./shots/shots");
const utils_1 = require("./utils");
const utils_2 = require("./crawler/utils");
const histoireScreenshots_1 = require("./crawler/histoireScreenshots");
const createShots = async () => {
    var _a;
    const { ladleShots, histoireShots, storybookShots, pageShots, customShots, imagePathCurrent, } = config_1.config;
    let storybookShotItems = [];
    let ladleShotItems = [];
    let histoireShotItems = [];
    let pageShotItems = [];
    let customShotItems = [];
    (0, utils_1.removeFilesInFolder)(imagePathCurrent);
    if (!(0, config_1.isPlatformModeConfig)(config_1.config)) {
        (0, utils_1.removeFilesInFolder)(config_1.config.imagePathDifference);
    }
    const browsers = (0, utils_1.getBrowsers)();
    if (ladleShots) {
        const { ladleUrl, mask } = ladleShots;
        log_1.log.process('info', 'general', `\n=== [Ladle Mode] ${ladleUrl} ===\n`);
        let ladleWebUrl = ladleUrl;
        let localServer;
        if (!ladleUrl.startsWith('http://') && !ladleUrl.startsWith('https://')) {
            const staticWebServer = await (0, utils_2.launchStaticWebServer)(ladleUrl);
            ladleWebUrl = staticWebServer.url;
            localServer = staticWebServer.server;
        }
        try {
            const collection = await (0, ladleScreenshots_1.collectLadleStories)(ladleWebUrl);
            if (!collection || collection.length === 0) {
                throw new Error('Error: Stories not found');
            }
            log_1.log.process('info', 'general', `Found ${collection.length} ladle stories`);
            await (0, async_1.mapLimit)(browsers, 1, async (browser) => {
                const shotItems = (0, ladleScreenshots_1.generateLadleShotItems)(ladleWebUrl, Boolean(localServer), collection, mask, ladleShots.breakpoints, browsers.length > 1 ? browser : undefined);
                const filterItemsToCheck = 'filterItemsToCheck' in config_1.config
                    ? config_1.config.filterItemsToCheck
                    : undefined;
                const filteredShotItems = filterItemsToCheck
                    ? shotItems.filter((item) => filterItemsToCheck(item))
                    : shotItems;
                ladleShotItems = shotItems;
                log_1.log.process('info', 'general', `Prepared ${filteredShotItems.length} ladle stories for screenshots on ${browser.name()}`);
                await (0, shots_1.takeScreenShots)(filteredShotItems, browser);
            });
            localServer === null || localServer === void 0 ? void 0 : localServer.close();
        }
        catch (error) {
            localServer === null || localServer === void 0 ? void 0 : localServer.close();
            throw error;
        }
        log_1.log.process('info', 'general', 'Screenshots done!');
    }
    if (histoireShots) {
        const { histoireUrl } = histoireShots;
        let localServer;
        let histoireWebUrl;
        if (!histoireUrl.startsWith('http://') &&
            !histoireUrl.startsWith('https://')) {
            const staticWebServer = await (0, utils_2.launchStaticWebServer)(histoireUrl);
            histoireWebUrl = staticWebServer.url;
            localServer = staticWebServer.server;
        }
        if (!histoireWebUrl) {
            throw new Error('Error: Histoire web url not found');
        }
        log_1.log.process('info', 'general', `\n=== [Histoire Mode] ${histoireUrl} ===\n`);
        try {
            const collection = await (0, histoireScreenshots_1.collectHistoireStories)(histoireWebUrl);
            if (!collection || collection.length === 0) {
                throw new Error('Error: Stories not found');
            }
            log_1.log.process('info', 'general', `Found ${collection.length} Histoire stories`);
            await (0, async_1.mapLimit)(browsers, 1, async (browser) => {
                const shotItems = (0, histoireScreenshots_1.generateHistoireShotItems)(histoireWebUrl, collection, browsers.length > 1 ? browser : undefined);
                histoireShotItems = shotItems;
                log_1.log.process('info', 'general', `Prepared ${shotItems.length} Histoire stories for screenshots on ${browser.name()}`);
                await (0, shots_1.takeScreenShots)(shotItems, browser);
            });
            localServer === null || localServer === void 0 ? void 0 : localServer.close();
        }
        catch (error) {
            localServer === null || localServer === void 0 ? void 0 : localServer.close();
            throw error;
        }
        log_1.log.process('info', 'general', 'Screenshots done!');
    }
    if (storybookShots) {
        const { storybookUrl, mask } = storybookShots;
        log_1.log.process('info', 'general', `\n=== [Storybook Mode] ${storybookUrl} ===\n`);
        let storybookWebUrl = storybookUrl;
        let localServer;
        if (!storybookUrl.startsWith('http://') &&
            !storybookUrl.startsWith('https://')) {
            const staticWebServer = await (0, utils_2.launchStaticWebServer)(storybookUrl);
            storybookWebUrl = staticWebServer.url;
            localServer = staticWebServer.server;
        }
        try {
            const collection = await (0, storybook_1.collectStories)(storybookWebUrl);
            if (!(collection === null || collection === void 0 ? void 0 : collection.stories) || collection.stories.length === 0) {
                throw new Error('Error: Stories not found');
            }
            log_1.log.process('info', 'general', `Found ${collection.stories.length} stories`);
            await (0, async_1.mapLimit)(browsers, 1, async (browser) => {
                const shotItems = (0, storybook_1.generateStorybookShotItems)(storybookWebUrl, collection.stories, mask, storybookShots.breakpoints, browsers.length > 1 ? browser : undefined);
                const filterItemsToCheck = 'filterItemsToCheck' in config_1.config
                    ? config_1.config.filterItemsToCheck
                    : undefined;
                const filteredShotItems = filterItemsToCheck
                    ? shotItems.filter((item) => filterItemsToCheck(item))
                    : shotItems;
                storybookShotItems = shotItems;
                log_1.log.process('info', 'general', `Prepared ${filteredShotItems.length} stories for screenshots on ${browser.name()}`);
                await (0, shots_1.takeScreenShots)(filteredShotItems, browser);
            });
            localServer === null || localServer === void 0 ? void 0 : localServer.close();
        }
        catch (error) {
            localServer === null || localServer === void 0 ? void 0 : localServer.close();
            throw error;
        }
        log_1.log.process('info', 'general', 'Screenshots done!');
    }
    if (pageShots) {
        const { pages: pagesFromConfig, baseUrl, mask, breakpoints } = pageShots;
        const pagesFromLoader = await (0, pageScreenshots_1.getPagesFromExternalLoader)();
        let jsonPages = pagesFromLoader || [];
        if ((_a = config_1.config.pageShots) === null || _a === void 0 ? void 0 : _a.pagesJsonRefiner) {
            log_1.log.process('info', 'general', `🧬 Refining pages received in json with function provided in pagesJsonRefiner`);
            jsonPages = config_1.config.pageShots.pagesJsonRefiner(pagesFromLoader || []);
        }
        if (jsonPages.length > 0) {
            log_1.log.process('info', 'general', `Found ${jsonPages.length} pages from external loader`);
        }
        const pages = [...(pagesFromConfig || []), ...(jsonPages || [])];
        log_1.log.process('info', 'general', `\n=== [Page Mode] ${baseUrl} ===\n`);
        await (0, async_1.mapLimit)(browsers, 1, async (browser) => {
            const shotItems = (0, pageScreenshots_1.generatePageShotItems)(pages, baseUrl, mask, breakpoints, browsers.length > 1 ? browser : undefined);
            pageShotItems = shotItems;
            log_1.log.process('info', 'general', `Prepared ${shotItems.length} pages for screenshots on ${browser.name()}`);
            await (0, shots_1.takeScreenShots)(shotItems, browser);
        });
        log_1.log.process('info', 'general', 'Screenshots done!');
    }
    if (customShots) {
        const { currentShotsPath } = customShots;
        log_1.log.process('info', 'general', `\n=== [Custom Mode] ${currentShotsPath} ===\n`);
        customShotItems = (0, utils_1.readDirIntoShotItems)(currentShotsPath);
        log_1.log.process('info', 'general', `Found ${customShotItems.length} custom shots`);
    }
    return [
        ...storybookShotItems,
        ...pageShotItems,
        ...ladleShotItems,
        ...histoireShotItems,
        ...customShotItems,
    ];
};
exports.createShots = createShots;
