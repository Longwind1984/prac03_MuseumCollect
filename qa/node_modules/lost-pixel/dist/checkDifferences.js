"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDifferences = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const async_1 = require("async");
const compare_1 = require("./compare/compare");
const log_1 = require("./log");
const config_1 = require("./config");
const utils_1 = require("./utils");
const checkDifferences = async (shotItems) => {
    if ((0, config_1.isPlatformModeConfig)(config_1.config)) {
        return (0, utils_1.featureNotSupported)('checkDifferences()');
    }
    log_1.log.process('info', 'general', `Comparing ${shotItems.length} screenshots using '${config_1.config.compareEngine}' as compare engine`);
    const total = shotItems.length;
    const noBaselinesItems = [];
    const aboveThresholdDifferenceItems = [];
    const comparisonResults = {};
    await (0, async_1.mapLimit)(shotItems.entries(), config_1.config.compareConcurrency, async (item) => {
        const [index, shotItem] = item;
        const logger = (message) => {
            log_1.log
                .item({
                shotMode: shotItem.shotMode,
                uniqueItemId: shotItem.shotName,
                itemIndex: index,
                totalItems: total,
            })
                .process('info', 'general', message);
        };
        logger(`Comparing '${shotItem.id}'`);
        const baselineImageExists = (0, node_fs_1.existsSync)(shotItem.filePathBaseline);
        if (!baselineImageExists) {
            logger('Baseline image missing. Will be treated as addition.');
            noBaselinesItems.push(shotItem);
            return;
        }
        const currentImageExists = (0, node_fs_1.existsSync)(shotItem.filePathCurrent);
        if (!currentImageExists) {
            throw new Error(`Error: Missing current image: ${shotItem.filePathCurrent}`);
        }
        const { pixelDifference, pixelDifferencePercentage, isWithinThreshold } = await (0, compare_1.compareImages)(shotItem.threshold, shotItem.filePathBaseline, shotItem.filePathCurrent, shotItem.filePathDifference);
        if ((0, utils_1.shallGenerateMeta)()) {
            comparisonResults[shotItem.id] = {
                pixelDifference,
                pixelDifferencePercentage,
                isWithinThreshold,
            };
        }
        if (pixelDifference > 0) {
            const percentage = (pixelDifferencePercentage * 100).toFixed(2);
            if (isWithinThreshold) {
                logger(`Difference of ${pixelDifference} pixels (${percentage}%) found but within threshold.`);
            }
            else {
                aboveThresholdDifferenceItems.push(shotItem);
                logger(`Difference of ${pixelDifference} pixels (${percentage}%) found. Difference image saved to: ${shotItem.filePathDifference}`);
            }
        }
        else {
            logger('No difference found.');
        }
    });
    if ((0, utils_1.shallGenerateMeta)()) {
        log_1.log.process('info', 'general', `Writing meta file with ${Object.entries(comparisonResults).length} items.`);
        (0, node_fs_1.writeFileSync)(`${node_path_1.default.join(config_1.config.imagePathCurrent, 'meta')}.json`, JSON.stringify(comparisonResults, null, 2));
    }
    log_1.log.process('info', 'general', 'Comparison done!');
    return { aboveThresholdDifferenceItems, noBaselinesItems };
};
exports.checkDifferences = checkDifferences;
