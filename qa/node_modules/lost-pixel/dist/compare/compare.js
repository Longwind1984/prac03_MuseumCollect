"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareImages = exports.compareImagesViaOdiff = exports.compareImagesViaPixelmatch = exports.checkThreshold = void 0;
const node_fs_1 = require("node:fs");
const pixelmatch_1 = __importDefault(require("pixelmatch"));
const odiff_bin_1 = require("odiff-bin");
const pngjs_1 = require("pngjs");
const config_1 = require("../config");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const checkThreshold = (threshold, pixelsTotal, pixelDifference) => {
    // Treat theshold as percentage
    if (threshold < 1) {
        return pixelDifference <= pixelsTotal * threshold;
    }
    // Treat threshold as absolute value
    return pixelDifference <= threshold;
};
exports.checkThreshold = checkThreshold;
const compareImagesViaPixelmatch = async (threshold, baselineShotPath, currentShotPath, differenceShotPath) => {
    const baselineImageBuffer = (0, node_fs_1.readFileSync)(baselineShotPath);
    const currentImageBuffer = (0, node_fs_1.readFileSync)(currentShotPath);
    if (baselineImageBuffer.equals(currentImageBuffer)) {
        return {
            pixelDifference: 0,
            pixelDifferencePercentage: 0,
            isWithinThreshold: true,
        };
    }
    let baselineImage = pngjs_1.PNG.sync.read(baselineImageBuffer);
    let currentImage = pngjs_1.PNG.sync.read(currentImageBuffer);
    const maxWidth = Math.max(baselineImage.width || 100, currentImage.width || 100);
    const maxHeight = Math.max(baselineImage.height || 100, currentImage.height || 100);
    if (baselineImage.width !== currentImage.width ||
        baselineImage.height !== currentImage.height) {
        baselineImage = (0, utils_2.resizeImage)(baselineImage, maxWidth, maxHeight);
        currentImage = (0, utils_2.resizeImage)(currentImage, maxWidth, maxHeight);
    }
    const differenceImage = new pngjs_1.PNG({ width: maxWidth, height: maxHeight });
    const pixelDifference = (0, pixelmatch_1.default)(baselineImage.data, currentImage.data, differenceImage.data, maxWidth, maxHeight, { threshold: 0 });
    const pixelsTotal = baselineImage.width * baselineImage.height;
    if (pixelDifference > 0 && differenceShotPath) {
        const isWithinThreshold = (0, exports.checkThreshold)(threshold, pixelsTotal, pixelDifference);
        if (!isWithinThreshold) {
            (0, node_fs_1.writeFileSync)(differenceShotPath, pngjs_1.PNG.sync.write(differenceImage));
        }
        return {
            pixelDifference,
            pixelDifferencePercentage: pixelDifference / pixelsTotal,
            isWithinThreshold,
        };
    }
    return {
        pixelDifference,
        pixelDifferencePercentage: pixelDifference / pixelsTotal,
        isWithinThreshold: true,
    };
};
exports.compareImagesViaPixelmatch = compareImagesViaPixelmatch;
const compareImagesViaOdiff = async (threshold, baselineShotPath, currentShotPath, differenceShotPath) => {
    const result = await (0, odiff_bin_1.compare)(baselineShotPath, currentShotPath, differenceShotPath, {
        failOnLayoutDiff: false,
    });
    if (result.match) {
        return {
            pixelDifference: 0,
            pixelDifferencePercentage: 0,
            isWithinThreshold: true,
        };
    }
    if (result.reason === 'pixel-diff') {
        let isWithinThreshold = true;
        // Treat theshold as percentage
        const pixelDifferencePercentage = Number(result.diffPercentage / 100);
        if (threshold < 1) {
            isWithinThreshold = pixelDifferencePercentage <= threshold;
        }
        else {
            // Treat threshold as absolute value
            isWithinThreshold = result.diffCount <= threshold;
        }
        return {
            pixelDifference: Number(result.diffCount),
            pixelDifferencePercentage,
            isWithinThreshold,
        };
    }
    throw new Error("Couldn't compare images");
};
exports.compareImagesViaOdiff = compareImagesViaOdiff;
const compareImages = async (threshold, baselineShotPath, currentShotPath, differenceShotPath) => {
    if ((0, config_1.isPlatformModeConfig)(config_1.config)) {
        return (0, utils_1.featureNotSupported)('compareImages()');
    }
    if (config_1.config.compareEngine === 'pixelmatch') {
        return (0, exports.compareImagesViaPixelmatch)(threshold, baselineShotPath, currentShotPath, differenceShotPath);
    }
    return (0, exports.compareImagesViaOdiff)(threshold, baselineShotPath, currentShotPath, differenceShotPath);
};
exports.compareImages = compareImages;
