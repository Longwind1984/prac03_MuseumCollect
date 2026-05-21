"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const pngjs_1 = require("pngjs");
const resizeImage = (originalImage, width, height) => {
    const newImage = new pngjs_1.PNG({
        width,
        height,
        fill: true,
        inputHasAlpha: true,
    });
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // eslint-disable-next-line no-bitwise
            const index = ((width * y + x) << 2) + 3;
            newImage.data[index] = 64;
        }
    }
    pngjs_1.PNG.bitblt(originalImage, newImage, 0, 0, originalImage.width, originalImage.height, 0, 0);
    return newImage;
};
exports.resizeImage = resizeImage;
