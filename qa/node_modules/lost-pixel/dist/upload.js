"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRequiredShots = void 0;
const async_1 = require("async");
const api_1 = require("./api");
const log_1 = require("./log");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const uploadRequiredShots = async ({ config, apiToken, uploadToken, uploadUrl, requiredFileHashes, extendedShotItems, }) => {
    if (requiredFileHashes.length > 0) {
        log_1.log.process('info', 'api', '📤 Uploading shots');
        const uploadStart = process.hrtime();
        const requiredShotItems = extendedShotItems.filter((shotItem) => requiredFileHashes.includes(shotItem.hash));
        await (0, async_1.mapLimit)(requiredShotItems.entries(), constants_1.MEDIA_UPLOAD_CONCURRENCY, async ([index, shotItem]) => {
            const logger = log_1.log.item({
                shotMode: shotItem.shotMode,
                uniqueItemId: shotItem.shotName,
                itemIndex: index,
                totalItems: requiredShotItems.length,
            });
            await (0, api_1.uploadShot)({
                config,
                apiToken,
                uploadToken,
                uploadUrl,
                name: `${shotItem.shotMode}/${shotItem.shotName}`,
                file: shotItem.filePathCurrent,
                logger,
            });
        });
        const uploadStop = process.hrtime(uploadStart);
        log_1.log.process('info', 'api', `📤 Uploading shots took ${(0, utils_1.parseHrtimeToSeconds)(uploadStop)} seconds`);
    }
    return true;
};
exports.uploadRequiredShots = uploadRequiredShots;
