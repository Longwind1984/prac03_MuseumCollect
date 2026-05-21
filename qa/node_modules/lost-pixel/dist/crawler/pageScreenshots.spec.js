"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const config_1 = require("../config");
const pageScreenshots_1 = require("./pageScreenshots");
beforeAll(async () => {
    await (0, config_1.configure)({
        customProjectConfig: {
            timeouts: {
                fetchStories: 2000,
            },
        },
    });
    (0, utils_1.createShotsFolders)();
    process.env.FETCH_STORIES_TIMEOUT = '2000';
});
describe(pageScreenshots_1.generatePageShotItems, () => {
    it('should generate shot items for pages without breakpoints', () => {
        const baseUrl = 'https://example.com';
        const pages = [
            {
                name: 'home',
                path: '/',
                breakpoints: [],
                threshold: 0,
                waitBeforeScreenshot: 1000,
            },
            {
                name: 'about',
                path: '/about',
                breakpoints: [],
                threshold: 0,
                waitBeforeScreenshot: 1000,
            },
        ];
        const shotItems = (0, pageScreenshots_1.generatePageShotItems)(pages, baseUrl);
        expect(shotItems).toMatchSnapshot('PagesWithoutBreakpoints');
    });
    it('should generate shot items for pages with breakpoints', () => {
        const baseUrl = 'https://example.com';
        const pages = [
            {
                name: 'home',
                path: '/',
                breakpoints: [480, 768],
                threshold: 0,
                waitBeforeScreenshot: 1000,
            },
            {
                name: 'about',
                path: '/about',
                breakpoints: [480, 768],
                threshold: 0,
                waitBeforeScreenshot: 1000,
            },
        ];
        const shotItems = (0, pageScreenshots_1.generatePageShotItems)(pages, baseUrl);
        expect(shotItems).toMatchSnapshot('PagesWithBreakpoints');
    });
});
