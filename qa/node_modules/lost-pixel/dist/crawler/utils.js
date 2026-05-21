"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchStaticWebServer = void 0;
const node_http_1 = __importDefault(require("node:http"));
const serve_handler_1 = __importDefault(require("serve-handler"));
const get_port_please_1 = require("get-port-please");
const launchStaticWebServer = async (basePath) => {
    const port = await (0, get_port_please_1.getPort)({
        random: true,
    });
    const server = node_http_1.default.createServer(async (request, response) => {
        return (0, serve_handler_1.default)(request, response, {
            public: basePath.startsWith('file://') ? basePath.slice(7) : basePath,
            cleanUrls: false,
        });
    });
    server.listen(port);
    return {
        server,
        port,
        url: `http://localhost:${port}`,
    };
};
exports.launchStaticWebServer = launchStaticWebServer;
