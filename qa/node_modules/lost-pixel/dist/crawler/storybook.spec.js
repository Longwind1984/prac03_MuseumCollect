"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const config_1 = require("../config");
const storybook_1 = require("./storybook");
const utils_2 = require("./utils");
const storyBookUrl = (0, storybook_1.getStoryBookUrl)('examples/example-storybook-v6.4/storybook-static');
const storyBookV7Url = (0, storybook_1.getStoryBookUrl)('examples/example-storybook-v6.5-storystore-v7/storybook-static');
const storyBookV8Url = (0, storybook_1.getStoryBookUrl)('examples/example-storybook-v8/storybook-static');
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
describe(storybook_1.getStoryBookUrl, () => {
    it('should return a full StoryBook URL', () => {
        expect((0, storybook_1.getStoryBookUrl)('/storybook-static')).toBe('file:///storybook-static');
        expect((0, storybook_1.getStoryBookUrl)('/another/path/storybook-static')).toBe('file:///another/path/storybook-static');
        expect((0, storybook_1.getStoryBookUrl)('relative/path/storybook-static')).toBe(`file://${process.cwd()}/relative/path/storybook-static`);
        expect((0, storybook_1.getStoryBookUrl)('file:///path/storybook-static')).toBe('file:///path/storybook-static');
        expect((0, storybook_1.getStoryBookUrl)('http://localhost:8080')).toBe('http://localhost:8080');
        expect((0, storybook_1.getStoryBookUrl)('https://example.com/storybook')).toBe('https://example.com/storybook');
    });
});
describe(storybook_1.getIframeUrl, () => {
    it('should attach the iframe document to the URL', () => {
        expect((0, storybook_1.getIframeUrl)('https://example.com/storybook')).toBe('https://example.com/storybook/iframe.html');
        expect((0, storybook_1.getIframeUrl)('https://example.com/storybook/')).toBe('https://example.com/storybook/iframe.html');
    });
});
describe(storybook_1.collectStories, () => {
    it('should collect stories from StoryBook', async () => {
        const browser = await (0, utils_1.getBrowser)().launch();
        const context = await browser.newContext();
        {
            const { server, url } = await (0, utils_2.launchStaticWebServer)(storyBookUrl);
            expect(await (0, storybook_1.collectStoriesViaWindowApi)(context, url)).toMatchSnapshot('ViaWindowApi');
            server.close();
        }
        {
            const { server, url } = await (0, utils_2.launchStaticWebServer)(storyBookV7Url);
            expect(await (0, storybook_1.collectStoriesViaWindowApi)(context, url)).toMatchSnapshot('ViaWindowApi StoryStore v7');
            server.close();
        }
        {
            const { server, url } = await (0, utils_2.launchStaticWebServer)(storyBookV7Url);
            expect(await (0, storybook_1.collectStoriesViaStoriesJson)(context, url)).toMatchSnapshot('ViaStoriesJson');
            server.close();
        }
        {
            const { server, url } = await (0, utils_2.launchStaticWebServer)(storyBookV8Url);
            expect(await (0, storybook_1.collectStoriesViaWindowApi)(context, url)).toMatchSnapshot('ViaWindowApi StoryStore v7');
            server.close();
        }
        {
            const { server, url } = await (0, utils_2.launchStaticWebServer)(storyBookV8Url);
            expect(await (0, storybook_1.collectStoriesViaStoriesJson)(context, url)).toMatchSnapshot('ViaStoriesJson');
            server.close();
        }
        await browser.close();
    }, 10000);
    it('should fail when using invalid path to StoryBook', async () => {
        const browser = await (0, utils_1.getBrowser)().launch();
        const context = await browser.newContext();
        await expect(async () => (0, storybook_1.collectStoriesViaWindowApi)(context, 'this/path/does/not/exist')).rejects.toThrow('ERR_FILE_NOT_FOUND');
        await browser.close();
    });
    it('should fail when using invalid URL to StoryBook', async () => {
        const browser = await (0, utils_1.getBrowser)().launch();
        const context = await browser.newContext();
        await expect(async () => (0, storybook_1.collectStoriesViaWindowApi)(context, 'http://localhost:99999')).rejects.toThrow('invalid URL');
        await browser.close();
    });
    it('should timeout when using invalid URL to StoryBook', async () => {
        const browser = await (0, utils_1.getBrowser)().launch();
        const context = await browser.newContext();
        await expect(async () => (0, storybook_1.collectStoriesViaWindowApi)(context, `${storyBookUrl}/nothing/here`)).rejects.toThrow('ERR_FILE_NOT_FOUND');
        await browser.close();
    });
    it('should fail if no stories found', async () => {
        const browser = await (0, utils_1.getBrowser)().launch();
        const context = await browser.newContext();
        await expect(async () => (0, storybook_1.collectStoriesViaWindowApi)(context, `${storyBookUrl}/index.html`, true)).rejects.toThrow('Timeout 2000ms exceeded');
        await browser.close();
    }, 10000);
});
