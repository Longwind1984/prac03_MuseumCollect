"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLabel = exports.selectBreakpoints = exports.resizeViewportToFullscreen = exports.waitForNetworkRequests = void 0;
const config_1 = require("../config");
const checkIgnoreUrls = (url, ignoreUrls) => {
    for (const ignoreUrl of ignoreUrls) {
        if (url.includes(ignoreUrl)) {
            return true;
        }
    }
    return false;
};
const waitForNetworkRequests = async ({ page, logger, timeout = config_1.config.timeouts.networkRequests, waitForFirstRequest = config_1.config.waitForFirstRequest, waitForLastRequest = config_1.config.waitForLastRequest, ignoreUrls = [], }) => new Promise((resolve, reject) => {
    let requestCounter = 0;
    const requests = new Set();
    let lastRequestTimeoutId;
    const timeoutId = setTimeout(() => {
        const pendingUrls = [...requests].map((request) => request.url());
        logger.process('info', 'network', 'Pending requests:', pendingUrls);
        cleanup();
        reject(new Error('Timeout'));
    }, timeout);
    const firstRequestTimeoutId = setTimeout(() => {
        cleanup();
        resolve(true);
    }, waitForFirstRequest);
    const onRequest = (request) => {
        if (!checkIgnoreUrls(request.url(), ignoreUrls)) {
            clearTimeout(firstRequestTimeoutId);
            clearTimeout(lastRequestTimeoutId);
            requestCounter++;
            requests.add(request);
            logger.browser('info', 'network', `+ ${request.url()}`);
        }
    };
    const onRequestFinished = async (request) => {
        var _a, _b;
        clearTimeout(lastRequestTimeoutId);
        if (!checkIgnoreUrls(request.url(), ignoreUrls)) {
            const failure = request.failure();
            const response = await request.response();
            requestCounter--;
            requests.delete(request);
            const statusText = failure
                ? failure.errorText
                : `${(_a = response === null || response === void 0 ? void 0 : response.status()) !== null && _a !== void 0 ? _a : 'unknown'} ${(_b = response === null || response === void 0 ? void 0 : response.statusText()) !== null && _b !== void 0 ? _b : 'unknown'}`;
            logger.browser('info', 'network', `- ${request.url()} [${statusText}]`);
        }
        lastRequestTimeoutId = setTimeout(() => {
            // `requestCounter` can be below 0 if requests have completed before they were being tracked
            if (requestCounter <= 0) {
                cleanup();
                resolve(true);
            }
        }, waitForLastRequest);
    };
    function cleanup() {
        clearTimeout(timeoutId);
        clearTimeout(firstRequestTimeoutId);
        clearTimeout(lastRequestTimeoutId);
        page.removeListener('request', onRequest);
        page.removeListener('requestfinished', onRequestFinished);
        page.removeListener('requestfailed', onRequestFinished);
    }
    page.on('request', onRequest);
    page.on('requestfinished', onRequestFinished);
    page.on('requestfailed', onRequestFinished);
});
exports.waitForNetworkRequests = waitForNetworkRequests;
const resizeViewportToFullscreen = async ({ page }) => {
    var _a, _b;
    const viewport = await page.evaluate(async () => new Promise((resolve) => {
        const { body } = document;
        const html = document.documentElement;
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
        resolve({ height, width });
    }));
    await page.setViewportSize({
        width: Math.max((_b = (_a = page.viewportSize()) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 800, viewport.width),
        height: viewport.height,
    });
};
exports.resizeViewportToFullscreen = resizeViewportToFullscreen;
const selectBreakpoints = (topLevelBreakpoints, modeBreakpoints, shotBreakpoints) => {
    if (shotBreakpoints && shotBreakpoints.length > 0) {
        return shotBreakpoints;
    }
    if (modeBreakpoints && modeBreakpoints.length > 0) {
        return modeBreakpoints;
    }
    return topLevelBreakpoints !== null && topLevelBreakpoints !== void 0 ? topLevelBreakpoints : [];
};
exports.selectBreakpoints = selectBreakpoints;
const generateLabel = ({ breakpoint, browser, }) => {
    var _a;
    const widthLabel = breakpoint && breakpoint > 0 ? `w${breakpoint}px` : '';
    const browserLabel = (_a = browser === null || browser === void 0 ? void 0 : browser.name()) !== null && _a !== void 0 ? _a : '';
    const labels = [widthLabel, browserLabel].filter(Boolean);
    if (labels.length === 0)
        return '';
    return `__[${labels.join('|')}]`;
};
exports.generateLabel = generateLabel;
