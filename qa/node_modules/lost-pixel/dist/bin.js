#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const fs_extra_1 = __importDefault(require("fs-extra"));
const log_1 = require("./log");
const runner_1 = require("./runner");
const utils_1 = require("./utils");
const api_1 = require("./api");
const config_1 = require("./config");
const docker_runner_1 = require("./docker-runner");
const generatePagesFromSitemap_1 = require("./generatePagesFromSitemap");
const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
// @ts-expect-error TBD
const commandArgs = args._;
const version = (0, utils_1.getVersion)();
if (version) {
    log_1.log.process('info', 'general', `Version: ${version}`);
}
// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    if ((0, utils_1.isSitemapPageGenMode)()) {
        await (0, generatePagesFromSitemap_1.generatePagesFromSitemap)();
        return;
    }
    if ((0, utils_1.isDockerMode)()) {
        await (0, docker_runner_1.runInDocker)();
    }
    else if (commandArgs.includes('init-js')) {
        log_1.log.process('info', 'general', 'Initializing javascript lost-pixel config');
        await fs_extra_1.default.copy(node_path_1.default.join(__dirname, '..', 'config-templates', 'example.lostpixel.config.js'), node_path_1.default.join(process.cwd(), './lostpixel.config.js'));
        log_1.log.process('info', 'general', '✅ Config successfully initialized');
    }
    else if (commandArgs.includes('init-ts')) {
        log_1.log.process('info', 'general', 'Initializing typescript lost-pixel config');
        // Replace local type resolution with module resolution
        const file = fs_extra_1.default.readFileSync(node_path_1.default.join(__dirname, '..', 'config-templates', 'example.lostpixel.config.ts'));
        const modifiedFile = file.toString().replace('../src/config', 'lost-pixel');
        fs_extra_1.default.writeFileSync(node_path_1.default.join(process.cwd(), './lostpixel.config.ts'), modifiedFile);
        log_1.log.process('info', 'general', '✅ Config successfully initialized');
    }
    else {
        await (0, config_1.configure)({
            localDebugMode: (0, utils_1.isLocalDebugMode)(),
        });
        if ((0, config_1.isPlatformModeConfig)(config_1.config)) {
            log_1.log.process('info', 'general', `🚀 Starting Lost Pixel in 'platform' mode`);
            const apiToken = await (0, runner_1.getPlatformApiToken)(config_1.config);
            if (commandArgs.includes('finalize')) {
                await (0, api_1.sendFinalizeToAPI)(config_1.config, apiToken);
            }
            else {
                await (0, runner_1.platformRunner)(config_1.config, apiToken);
            }
        }
        else {
            log_1.log.process('info', 'general', `🚀 Starting Lost Pixel in 'generateOnly' mode`);
            await (0, runner_1.runner)(config_1.config);
        }
    }
})();
