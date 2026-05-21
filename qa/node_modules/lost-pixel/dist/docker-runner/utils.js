"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeDockerRun = void 0;
const execa_1 = __importDefault(require("execa"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const utils_1 = require("../utils");
const executeDockerRun = async ({ version }) => {
    const isUpdateModeEnabled = (0, utils_1.isUpdateMode)();
    const isGenerateMetaEnabled = (0, utils_1.shallGenerateMeta)();
    const isLocalDebugModeEnabled = (0, utils_1.isLocalDebugMode)();
    // @ts-expect-error TBD
    const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
    const args = [
        'run',
        '--rm',
        // TODO: remove interactive mode for now, while it clashes with Tauri execution
        // '-it',
        `-v ${process.cwd()}:${process.cwd()}`,
        `-e WORKSPACE=${process.cwd()}`,
        '-e DOCKER=1',
        `-e LOST_PIXEL_DISABLE_TELEMETRY=${process.env.LOST_PIXEL_DISABLE_TELEMETRY}`,
        argv.configDir ? `-e LOST_PIXEL_CONFIG_DIR=${argv.configDir}` : '',
        isUpdateModeEnabled ? '-e LOST_PIXEL_MODE=update' : '',
        isGenerateMetaEnabled ? '-e LOST_PIXEL_GENERATE_META=true' : '',
        isLocalDebugModeEnabled ? '-e LOST_PIXEL_LOCAL=true' : '',
        `lostpixel/lost-pixel:v${version}`,
    ];
    return (0, execa_1.default)('docker', args, { shell: true, stdio: 'inherit' });
};
exports.executeDockerRun = executeDockerRun;
