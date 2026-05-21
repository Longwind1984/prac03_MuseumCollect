"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchBrowser = exports.featureNotSupported = exports.hashFile = exports.exitProcess = exports.parseHrtimeToSeconds = exports.readDirIntoShotItems = exports.getVersion = exports.getBrowsers = exports.getBrowser = exports.removeFilesInFolder = exports.sleep = exports.createShotsFolders = exports.extendFileName = exports.getChanges = exports.shallGenerateMeta = exports.isLocalDebugMode = exports.isDockerMode = exports.isSitemapPageGenMode = exports.isUpdateMode = void 0;
const node_fs_1 = require("node:fs");
const crypto = __importStar(require("node:crypto"));
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
const posthog_node_1 = require("posthog-node");
const playwright_core_1 = require("playwright-core");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const config_1 = require("./config");
const log_1 = require("./log");
const constants_1 = require("./constants");
const isUpdateMode = () => {
    // @ts-expect-error TBD
    const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
    return (args._.includes('update') ||
        args.m === 'update' ||
        process.env.LOST_PIXEL_MODE === 'update');
};
exports.isUpdateMode = isUpdateMode;
const isSitemapPageGenMode = () => {
    // @ts-expect-error TBD
    const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
    return (args._.includes('page-sitemap-gen') ||
        process.env.LOST_PIXEL_MODE === 'page-sitemap-gen');
};
exports.isSitemapPageGenMode = isSitemapPageGenMode;
const isDockerMode = () => {
    // @ts-expect-error TBD
    const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
    return args._.includes('docker') || process.env.LOST_PIXEL_DOCKER === 'true';
};
exports.isDockerMode = isDockerMode;
const isLocalDebugMode = () => {
    // @ts-expect-error TBD
    const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
    return args._.includes('local') || process.env.LOST_PIXEL_LOCAL === 'true';
};
exports.isLocalDebugMode = isLocalDebugMode;
const shallGenerateMeta = () => {
    // @ts-expect-error TBD
    const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
    return (args._.includes('meta') || process.env.LOST_PIXEL_GENERATE_META === 'true');
};
exports.shallGenerateMeta = shallGenerateMeta;
const getChanges = (files) => {
    return {
        difference: files.difference
            .map((file) => {
            var _a;
            return (Object.assign(Object.assign({}, file), { pathCurrent: (_a = files.current.find(({ name }) => name === file.name)) === null || _a === void 0 ? void 0 : _a.path }));
        })
            .sort((a, b) => a.name.localeCompare(b.name)),
        deletion: files.baseline
            .filter((file1) => !files.current.some((file2) => file1.name === file2.name))
            .sort((a, b) => a.name.localeCompare(b.name)),
        addition: files.current
            .filter((file1) => !files.baseline.some((file2) => file1.name === file2.name))
            .sort((a, b) => a.name.localeCompare(b.name)),
    };
};
exports.getChanges = getChanges;
const extendFileName = ({ fileName, extension }) => {
    const parts = fileName.split('.').filter((part) => part !== '');
    const extensionIndex = parts.length - 1;
    if (parts.length === 1) {
        return `${extension}.${parts[0]}`;
    }
    if (parts.length === 0) {
        return extension;
    }
    parts[extensionIndex] = `${extension}.${parts[extensionIndex]}`;
    return parts.join('.');
};
exports.extendFileName = extendFileName;
const createShotsFolders = () => {
    const paths = (0, config_1.isPlatformModeConfig)(config_1.config)
        ? [config_1.config.imagePathCurrent]
        : [
            config_1.config.imagePathBaseline,
            config_1.config.imagePathCurrent,
            config_1.config.imagePathDifference,
        ];
    for (const path of paths) {
        if (!(0, node_fs_1.existsSync)(path)) {
            (0, node_fs_1.mkdirSync)(path, { recursive: true });
        }
    }
    const ignoreFile = (0, node_path_1.normalize)((0, node_path_1.join)(config_1.config.imagePathCurrent, '..', '.gitignore'));
    if (!(0, node_fs_1.existsSync)(ignoreFile)) {
        (0, node_fs_1.writeFileSync)(ignoreFile, 'current\ndifference\n');
    }
};
exports.createShotsFolders = createShotsFolders;
const sleep = async (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
exports.sleep = sleep;
const removeFilesInFolder = (path, excludePaths) => {
    const files = (0, node_fs_1.readdirSync)(path);
    const filesPathsIgnoringExclude = files
        .map((file) => (0, node_path_1.join)(path, file))
        .filter((filePath) => !(excludePaths === null || excludePaths === void 0 ? void 0 : excludePaths.includes(filePath)));
    log_1.log.process('info', 'general', `Removing ${filesPathsIgnoringExclude.length} files from ${path}`);
    for (const filePath of filesPathsIgnoringExclude) {
        (0, node_fs_1.unlinkSync)(filePath);
    }
};
exports.removeFilesInFolder = removeFilesInFolder;
const convertBrowser = (browserKey) => {
    switch (browserKey) {
        case 'chromium': {
            return playwright_core_1.chromium;
        }
        case 'firefox': {
            return playwright_core_1.firefox;
        }
        case 'webkit': {
            return playwright_core_1.webkit;
        }
        default: {
            return playwright_core_1.chromium;
        }
    }
};
const getBrowser = () => {
    if (Array.isArray(config_1.config.browser))
        return convertBrowser(config_1.config.browser[0]);
    return convertBrowser(config_1.config.browser);
};
exports.getBrowser = getBrowser;
const getBrowsers = () => {
    if (!Array.isArray(config_1.config.browser) || config_1.config.browser.length === 0)
        return [(0, exports.getBrowser)()];
    const browsers = config_1.config.browser.map((key) => convertBrowser(key));
    return [...new Set(browsers)];
};
exports.getBrowsers = getBrowsers;
const getVersion = () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        const packageJson = require('../package.json');
        return packageJson.version;
    }
    catch (_a) { }
};
exports.getVersion = getVersion;
const fileNameWithoutExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.');
};
const readDirIntoShotItems = (path) => {
    const files = (0, node_fs_1.readdirSync)(path);
    return files
        .filter((name) => name.endsWith('.png'))
        .map((fileNameWithExt) => {
        const fileName = fileNameWithoutExtension(fileNameWithExt);
        return {
            id: fileName,
            shotName: fileName,
            shotMode: 'custom',
            filePathBaseline: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : (0, node_path_1.join)(config_1.config.imagePathBaseline, fileNameWithExt),
            filePathCurrent: (0, node_path_1.join)(path, fileNameWithExt),
            filePathDifference: (0, config_1.isPlatformModeConfig)(config_1.config)
                ? constants_1.notSupported
                : (0, node_path_1.join)(config_1.config.imagePathDifference, fileNameWithExt),
            url: fileName,
            // TODO: custom shots take thresholds only from config - not possible to source configs from individual story
            threshold: config_1.config.threshold,
        };
    });
};
exports.readDirIntoShotItems = readDirIntoShotItems;
const sendTelemetryData = async (properties) => {
    const client = new posthog_node_1.PostHog(constants_1.POST_HOG_API_KEY);
    const id = (0, node_crypto_1.randomUUID)();
    try {
        log_1.log.process('info', 'general', 'Sending anonymized telemetry data.');
        const version = (0, exports.getVersion)();
        const modes = [];
        if (config_1.config.storybookShots)
            modes.push('storybook');
        if (config_1.config.ladleShots)
            modes.push('ladle');
        if (config_1.config.pageShots)
            modes.push('pages');
        if (config_1.config.customShots)
            modes.push('custom');
        if (properties.error) {
            client.capture({
                distinctId: id,
                event: 'lost-pixel-error',
                properties: Object.assign({}, properties),
            });
        }
        else {
            client.capture({
                distinctId: id,
                event: 'lost-pixel-run',
                properties: Object.assign(Object.assign({}, properties), { version, modes }),
            });
        }
        await client.shutdownAsync();
    }
    catch (error) {
        log_1.log.process('error', 'general', 'Error when sending telemetry data', error);
    }
};
const parseHrtimeToSeconds = (hrtime) => {
    const seconds = (hrtime[0] + hrtime[1] / 1e9).toFixed(3);
    return seconds;
};
exports.parseHrtimeToSeconds = parseHrtimeToSeconds;
const exitProcess = async (properties) => {
    var _a;
    if (process.env.LOST_PIXEL_DISABLE_TELEMETRY === '1') {
        process.exit((_a = properties.exitCode) !== null && _a !== void 0 ? _a : 1);
    }
    else {
        await sendTelemetryData(properties).finally(() => {
            var _a;
            process.exit((_a = properties.exitCode) !== null && _a !== void 0 ? _a : 1);
        });
    }
};
exports.exitProcess = exitProcess;
const hashBuffer = (buffer) => {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(buffer);
    return hashSum.digest('hex');
};
const hashFile = (filePath) => {
    const file = (0, node_fs_1.readFileSync)(filePath);
    return hashBuffer(file);
};
exports.hashFile = hashFile;
const featureNotSupported = (feature) => {
    log_1.log.process('error', 'general', `${feature} is not supported in this configuration mode`);
    process.exit(1);
};
exports.featureNotSupported = featureNotSupported;
const launchBrowser = async (_browser) => {
    var _a;
    const browserType = _browser !== null && _browser !== void 0 ? _browser : (0, exports.getBrowser)();
    const browserName = browserType.name();
    return browserType.launch((_a = config_1.config.browserLaunchOptions) === null || _a === void 0 ? void 0 : _a[browserName]);
};
exports.launchBrowser = launchBrowser;
