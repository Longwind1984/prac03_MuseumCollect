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
exports.sendRecordLogsToAPI = exports.processShots = exports.uploadShot = exports.prepareUpload = exports.sendCheckCacheToAPI = exports.sendFinalizeToAPI = exports.sendInitToAPI = exports.getApiToken = void 0;
const node_fs_1 = require("node:fs");
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importStar(require("axios"));
const async_1 = require("async");
const log_1 = require("./log");
const utils_1 = require("./utils");
const version = (0, utils_1.getVersion)();
const apiClient = axios_1.default.create({
    headers: {
        'x-api-version': '3',
        'x-client-version': version !== null && version !== void 0 ? version : 'unknown',
    },
});
const apiRoutes = {
    getApiToken: '/auth/get-api-token',
    init: '/app/init',
    finalize: '/app/finalize',
    checkCache: '/app/check-cache',
    prepareUpload: '/file/prepare-upload',
    uploadShot: '/file/upload-shot',
    processShots: '/app/process-shots',
    recordLogs: '/app/record-logs',
};
const sendToAPI = async (config, parameters, fileKey, customLogger) => {
    var _a, _b, _c;
    const logger = (_a = customLogger === null || customLogger === void 0 ? void 0 : customLogger.process) !== null && _a !== void 0 ? _a : log_1.log.process;
    logger('info', 'api', `⚡️ Sending to API [${parameters.action}]`);
    try {
        const apiCall = async () => {
            var _a, _b;
            let { payload } = parameters;
            if (fileKey) {
                const form = new form_data_1.default();
                for (const [key, element] of Object.entries(parameters.payload)) {
                    if (key === fileKey) {
                        form.append(key, (0, node_fs_1.createReadStream)(element));
                    }
                    else {
                        form.append(key, element);
                    }
                }
                payload = form;
            }
            return apiClient.post(`${config.lostPixelPlatform}${apiRoutes[parameters.action]}`, payload, {
                headers: {
                    Authorization: `Bearer ${(_a = parameters.apiToken) !== null && _a !== void 0 ? _a : ''}`,
                    'x-api-key': (_b = config.apiKey) !== null && _b !== void 0 ? _b : 'undefined',
                    'Content-type': fileKey
                        ? 'multipart/form-data'
                        : 'application/json',
                },
            });
        };
        const response = await (0, async_1.retry)({
            times: 3,
            interval(retryCount) {
                const delay = Math.round(2 ** retryCount * 3000 * Math.random());
                logger('info', 'api', `🔄 Retry attempt ${retryCount} in ${delay}ms [${parameters.action}]`);
                return delay;
            },
            errorFilter(error) {
                return (!error.response ||
                    (error.response.status >= 500 && error.response.status <= 599) ||
                    error.response.status === 0);
            },
        }, apiCall);
        if (response.status !== 200 && response.status !== 201) {
            logger('error', 'api', `Error: Failed to send to API [${parameters.action}]. Status: ${response.status} ${response.statusText}`);
            process.exit(1);
        }
        const outdatedApiRequest = (_b = response === null || response === void 0 ? void 0 : response.headers) === null || _b === void 0 ? void 0 : _b['x-api-version-warning'];
        if (outdatedApiRequest &&
            (parameters.action === 'prepareUpload' ||
                parameters.action === 'finalize')) {
            logger('info', 'api', [
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
                `~~ ⚠️  ${outdatedApiRequest}`,
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
            ].join('\n'));
        }
        logger('info', 'api', `🤘 Successfully sent to API [${parameters.action}]`);
        return response.data;
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error)) {
            logger('error', 'api', 'API response: ', ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message);
        }
        else if (error instanceof Error) {
            logger('error', 'api', error.message);
        }
        else {
            logger('error', 'api', error);
        }
        if (parameters.action === 'getApiToken') {
            process.exit(1);
        }
        throw error;
    }
};
const getApiToken = async (config) => {
    return sendToAPI(config, {
        action: 'getApiToken',
        payload: {
            projectId: config.lostPixelProjectId,
        },
    });
};
exports.getApiToken = getApiToken;
const sendInitToAPI = async (config, apiToken) => {
    return sendToAPI(config, {
        action: 'init',
        apiToken,
        payload: {
            commit: config.commitHash,
            branchName: config.commitRefName,
            buildNumber: config.ciBuildNumber,
        },
    });
};
exports.sendInitToAPI = sendInitToAPI;
const sendFinalizeToAPI = async (config, apiToken) => {
    return sendToAPI(config, {
        action: 'finalize',
        apiToken,
        payload: {
            projectId: config.lostPixelProjectId,
            branchName: config.commitRefName,
            commit: config.commitHash,
            buildNumber: config.ciBuildNumber,
        },
    });
};
exports.sendFinalizeToAPI = sendFinalizeToAPI;
const sendCheckCacheToAPI = async (config, apiToken, cacheKey) => {
    return sendToAPI(config, {
        action: 'checkCache',
        apiToken,
        payload: {
            projectId: config.lostPixelProjectId,
            cacheKey,
        },
    });
};
exports.sendCheckCacheToAPI = sendCheckCacheToAPI;
const prepareUpload = async (config, apiToken, shotNamesWithHashes, cacheKey) => {
    return sendToAPI(config, {
        action: 'prepareUpload',
        apiToken,
        payload: {
            branchName: config.commitRefName,
            commit: config.commitHash,
            buildNumber: config.ciBuildNumber,
            currentShots: shotNamesWithHashes,
            cacheKey,
        },
    });
};
exports.prepareUpload = prepareUpload;
const uploadShot = async ({ config, apiToken, uploadToken, uploadUrl, name, file, logger, }) => {
    return sendToAPI(Object.assign(Object.assign({}, config), { lostPixelPlatform: uploadUrl }), {
        action: 'uploadShot',
        apiToken,
        payload: {
            uploadToken,
            name,
            file,
        },
    }, 'file', logger);
};
exports.uploadShot = uploadShot;
const processShots = async (config, apiToken, uploadToken, shotsConfig, cacheKey) => {
    return sendToAPI(config, {
        action: 'processShots',
        apiToken,
        payload: {
            uploadToken,
            config: {
                shots: shotsConfig,
                threshold: config.threshold,
            },
            log: log_1.logMemory,
            cacheKey,
        },
    });
};
exports.processShots = processShots;
const sendRecordLogsToAPI = async (config, apiToken) => {
    var _a;
    try {
        await sendToAPI(config, {
            action: 'recordLogs',
            apiToken,
            payload: {
                branchName: config.commitRefName,
                buildNumber: config.ciBuildNumber,
                commit: config.commitHash,
                log: log_1.logMemory,
            },
        });
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error)) {
            log_1.log.process('error', 'api', 'API response: ', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
        else if (error instanceof Error) {
            log_1.log.process('error', 'api', error.message);
        }
        else {
            log_1.log.process('error', 'api', error);
        }
        log_1.log.process('error', 'api', 'Error: Failed to send logs to API');
    }
};
exports.sendRecordLogsToAPI = sendRecordLogsToAPI;
