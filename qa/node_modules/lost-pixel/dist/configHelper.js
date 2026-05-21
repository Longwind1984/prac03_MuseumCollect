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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTSProjectConfigFile = exports.loadProjectConfigFile = void 0;
const bundle_require_1 = require("bundle-require");
const log_1 = require("./log");
const loadProjectConfigFile = async (configFilepath) => {
    var _a, _b;
    try {
        const { mod } = await (0, bundle_require_1.bundleRequire)({
            filepath: configFilepath,
            esbuildOptions: {
            // logLevel: 'silent',
            },
        });
        return (_b = (_a = mod === null || mod === void 0 ? void 0 : mod.default) !== null && _a !== void 0 ? _a : mod === null || mod === void 0 ? void 0 : mod.config) !== null && _b !== void 0 ? _b : mod;
    }
    catch (error) {
        log_1.log.process('error', 'config', error);
        throw error;
    }
};
exports.loadProjectConfigFile = loadProjectConfigFile;
let tsNodeService;
const setupTsNode = async () => {
    if (tsNodeService) {
        return tsNodeService;
    }
    try {
        const tsNode = await Promise.resolve().then(() => __importStar(require('ts-node')));
        tsNodeService = tsNode.register({
            transpileOnly: true,
            compilerOptions: {
                module: 'commonjs',
            },
        });
        return tsNodeService;
    }
    catch (error) {
        // @ts-expect-error Error type definition is missing 'code'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (['ERR_MODULE_NOT_FOUND', 'MODULE_NOT_FOUND'].includes(error.code)) {
            log_1.log.process('error', 'config', `Please install "ts-node" to use a TypeScript configuration file`);
            process.exit(1);
        }
        process.exit(1);
    }
};
const loadTSProjectConfigFile = async (configFilepath) => {
    var _a;
    await setupTsNode();
    tsNodeService.enabled(true);
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const imported = require(configFilepath);
    tsNodeService.enabled(false);
    return (_a = imported === null || imported === void 0 ? void 0 : imported.default) !== null && _a !== void 0 ? _a : imported === null || imported === void 0 ? void 0 : imported.config;
};
exports.loadTSProjectConfigFile = loadTSProjectConfigFile;
