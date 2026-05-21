"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePagesFromSitemap = void 0;
const node_fs_1 = require("node:fs");
const axios_1 = __importDefault(require("axios"));
const xml2js_1 = require("xml2js");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const log_1 = require("./log");
const config_1 = require("./config");
async function fetchSitemap(url) {
    if (url.startsWith('http')) {
        const response = await axios_1.default.get(url);
        return response.data;
    }
    return (0, node_fs_1.readFileSync)(url, 'utf8');
}
async function parseSitemap(sitemapContent) {
    const result = (await (0, xml2js_1.parseStringPromise)(sitemapContent));
    if (!result.urlset || !Array.isArray(result.urlset.url)) {
        throw new Error('Invalid sitemap format');
    }
    return result.urlset.url
        .filter((urlEntry) => urlEntry.loc && urlEntry.loc.length > 0)
        .map((urlEntry) => urlEntry.loc[0]);
}
async function generatePagesFileFromSitemap(url, options) {
    try {
        const sitemapContent = await fetchSitemap(url);
        const urls = await parseSitemap(sitemapContent);
        const pages = urls.map((url) => {
            const page = config_1.PageScreenshotParameterSchema.parse({
                path: new URL(url).pathname, // Extract the path from the URL
                name: url
                    .replace(/^https?:\/\/(www\.)?|^www\./g, '') // eslint-disable-line unicorn/prefer-string-replace-all
                    .replace(/\//g, '_'), // eslint-disable-line unicorn/prefer-string-replace-all
            });
            return page;
        });
        (0, node_fs_1.writeFileSync)(options.outputPath, JSON.stringify(pages, null, 2));
        log_1.log.process('info', 'general', '✅ Pages file generated successfully at', options.outputPath);
    }
    catch (error) {
        log_1.log.process('error', 'general', '❌ Pages file generation errored out. Please check the error message below', error);
    }
}
const generatePagesFromSitemap = async () => {
    const argv = await (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .usage('Usage: $0 <command> <sitemapUrl> <outputPath>')
        .command('page-sitemap-gen <sitemapUrl> <outputPath>', 'Generate pages file from sitemap')
        .demandCommand(1).argv;
    const { sitemapUrl, outputPath } = argv;
    if (!sitemapUrl ||
        typeof sitemapUrl !== 'string' ||
        !outputPath ||
        typeof outputPath !== 'string') {
        log_1.log.process('error', 'general', '❌ sitemapUrl and outputPath are required');
        return;
    }
    log_1.log.process('info', 'general', `🧬 Running lost-pixel in sitemap-page-gen mode. Pages file will be generated from provided sitemap on ${sitemapUrl}`);
    await generatePagesFileFromSitemap(sitemapUrl, {
        outputPath,
    });
};
exports.generatePagesFromSitemap = generatePagesFromSitemap;
