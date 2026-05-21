"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeScreenShots = void 0;
const node_path_1 = __importDefault(require("node:path"));
const async_1 = require("async");
const log_1 = require("../log");
const utils_1 = require("../utils");
const config_1 = require("../config");
const utils_2 = require("./utils");
const takeScreenShot = async ({ browser, shotItem, logger, }) => {
    var _a, _b, _c, _d, _e, _f;
    const context = await browser.newContext(shotItem.browserConfig);
    const page = await context.newPage();
    let success = false;
    page.on('pageerror', (exception) => {
        logger.browser('error', 'general', 'Uncaught exception:', exception);
    });
    page.on('console', async (message) => {
        const values = [];
        try {
            for (const arg of message.args()) {
                // eslint-disable-next-line no-await-in-loop
                values.push(await arg.jsonValue());
            }
        }
        catch (error) {
            logger.browser('error', 'console', 'Error while collecting console output', error);
        }
        logger.browser('info', 'console', String(values.shift()), ...values);
    });
    try {
        await page.goto(shotItem.url);
    }
    catch (error) {
        if (error instanceof Error && error.name === 'TimeoutError') {
            logger.process('error', 'timeout', `Timeout while loading page: ${shotItem.url}`);
        }
        else {
            logger.process('error', 'general', 'Page loading failed', error);
        }
    }
    try {
        await page.waitForLoadState('load', {
            timeout: config_1.config.timeouts.loadState,
        });
    }
    catch (error) {
        logger.process('error', 'timeout', `Timeout while waiting for page load state: ${shotItem.url}`, error);
    }
    if (shotItem.waitForSelector) {
        try {
            await page.waitForSelector(shotItem.waitForSelector, {
                state: 'attached',
                timeout: config_1.config.timeouts.loadState,
            });
        }
        catch (error) {
            logger.process('error', 'timeout', `Timeout while waiting for Selector ('${shotItem.waitForSelector}') to appear: ${shotItem.url}`, error);
        }
    }
    try {
        await (0, utils_2.waitForNetworkRequests)({
            page,
            logger,
            ignoreUrls: ['/__webpack_hmr'],
        });
    }
    catch (error) {
        logger.process('error', 'timeout', `Timeout while waiting for all network requests: ${shotItem.url}`, error);
    }
    if (config_1.config.beforeScreenshot) {
        await config_1.config.beforeScreenshot(page, {
            shotMode: shotItem.shotMode,
            id: shotItem.id,
            shotName: shotItem.shotName,
        });
    }
    let fullScreenMode = true;
    await (0, utils_1.sleep)((_a = shotItem === null || shotItem === void 0 ? void 0 : shotItem.waitBeforeScreenshot) !== null && _a !== void 0 ? _a : config_1.config.waitBeforeScreenshot);
    try {
        if (shotItem.viewport) {
            const currentViewport = page.viewportSize();
            await page.setViewportSize({
                width: shotItem.viewport.width,
                height: (_b = currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.height) !== null && _b !== void 0 ? _b : 500,
            });
            fullScreenMode = true;
        }
        else {
            await (0, utils_2.resizeViewportToFullscreen)({ page });
            fullScreenMode = false;
        }
    }
    catch (error) {
        logger.process('error', 'general', `Could not resize viewport to fullscreen: ${shotItem.shotName}`, error);
    }
    let retryCount = 0;
    let lastShotHash;
    try {
        while (retryCount <= config_1.config.flakynessRetries) {
            const { elementLocator } = shotItem;
            let screenshotOptions = {
                path: shotItem.filePathCurrent,
                animations: 'disabled',
                mask: shotItem.mask
                    ? shotItem.mask.map((mask) => page.locator(mask.selector))
                    : [],
            };
            // add fullPage option if no elementLocator is set
            if (elementLocator) {
                // eslint-disable-next-line no-await-in-loop
                await page.locator(elementLocator).screenshot(screenshotOptions);
            }
            else {
                screenshotOptions = Object.assign(Object.assign({}, screenshotOptions), { fullPage: fullScreenMode });
                // eslint-disable-next-line no-await-in-loop
                await page.screenshot(screenshotOptions);
            }
            const currentShotHash = (0, utils_1.hashFile)(shotItem.filePathCurrent);
            if (lastShotHash) {
                logger.process('info', 'general', `Screenshot of '${shotItem.shotName}' taken (Retry ${retryCount}). Hash: ${currentShotHash} - Previous hash: ${lastShotHash}`);
                if (lastShotHash === currentShotHash) {
                    break;
                }
            }
            lastShotHash = currentShotHash;
            if (retryCount < config_1.config.flakynessRetries) {
                // eslint-disable-next-line no-await-in-loop
                await (0, utils_1.sleep)(config_1.config.waitBetweenFlakynessRetries);
            }
            retryCount++;
        }
        success = true;
    }
    catch (error) {
        logger.process('error', 'general', 'Error when taking screenshot', error);
    }
    if (config_1.config.afterScreenshot) {
        await config_1.config.afterScreenshot(page, shotItem);
    }
    await context.close();
    const videoPath = await ((_c = page.video()) === null || _c === void 0 ? void 0 : _c.path());
    if (videoPath) {
        const dirname = node_path_1.default.dirname(videoPath);
        const ext = (_d = videoPath.split('.').pop()) !== null && _d !== void 0 ? _d : 'webm';
        const newVideoPath = `${dirname}/${shotItem.shotName}.${ext}`;
        await ((_e = page.video()) === null || _e === void 0 ? void 0 : _e.saveAs(newVideoPath));
        await ((_f = page.video()) === null || _f === void 0 ? void 0 : _f.delete());
        logger.process('info', 'general', `Video of '${shotItem.shotName}' recorded and saved to '${newVideoPath}`);
    }
    return success;
};
const takeScreenShots = async (shotItems, _browser) => {
    const browser = await (0, utils_1.launchBrowser)(_browser);
    const total = shotItems.length;
    await (0, async_1.mapLimit)(shotItems.entries(), config_1.config.shotConcurrency, async (item) => {
        const [index, shotItem] = item;
        const logger = log_1.log.item({
            shotMode: shotItem.shotMode,
            uniqueItemId: shotItem.shotName,
            itemIndex: index,
            totalItems: total,
        });
        logger.process('info', 'general', `Taking screenshot of '${shotItem.shotName} ${shotItem.breakpoint ? `[${shotItem.breakpoint}]` : ''}'`);
        const startTime = Date.now();
        const result = await takeScreenShot({ browser, shotItem, logger });
        const endTime = Date.now();
        const elapsedTime = Number((endTime - startTime) / 1000).toFixed(3);
        if (result) {
            logger.process('info', 'general', `Screenshot of '${shotItem.shotName}' taken and saved to '${shotItem.filePathCurrent}' in ${elapsedTime}s`);
        }
        else {
            logger.process('info', 'general', `Screenshot of '${shotItem.shotName}' failed and took ${elapsedTime}s`);
        }
    });
    await browser.close();
};
exports.takeScreenShots = takeScreenShots;
