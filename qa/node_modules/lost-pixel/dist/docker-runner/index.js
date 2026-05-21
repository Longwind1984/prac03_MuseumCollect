"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInDocker = void 0;
const log_1 = require("../log");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const runInDocker = async () => {
    const version = (0, utils_1.getVersion)();
    if (version) {
        log_1.log.process('info', 'general', `Running in docker: lost-pixel:${version}`);
        try {
            await (0, utils_2.executeDockerRun)({ version });
        }
        catch (error) {
            log_1.log.process('error', 'general', error);
        }
    }
    else {
        log_1.log.process('error', 'config', 'Seems like lost-pixel is missing in your package.json. Running lost-pixel@latest');
    }
};
exports.runInDocker = runInDocker;
