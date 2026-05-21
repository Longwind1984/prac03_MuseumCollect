"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logMemory = void 0;
exports.logMemory = [];
const serializeError = (error) => ({
    message: error.message,
    name: error.name,
    stack: error.stack,
});
const serializeErrors = (content) => content.map((item) => {
    if (item instanceof Error) {
        return serializeError(item);
    }
    return item;
});
const renderLog = (entry) => {
    var _a, _b;
    if (entry.source === 'browser' && entry.context === 'console') {
        return;
    }
    if (entry.source === 'browser' && entry.context === 'network') {
        return;
    }
    const { log } = console;
    const logPrefix = [];
    if (entry.item) {
        logPrefix.push(`[${entry.item.itemIndex + 1}/${entry.item.totalItems}]`);
    }
    if (!['general', 'api', 'config'].includes(entry.context)) {
        logPrefix.push(`[${entry.context}]`);
    }
    if (entry.level === 'error') {
        logPrefix.push(`❌`);
    }
    if ((_a = entry.item) === null || _a === void 0 ? void 0 : _a.uniqueItemId) {
        log(...logPrefix, ...entry.content, `(${(_b = entry.item) === null || _b === void 0 ? void 0 : _b.uniqueItemId})`);
    }
    else {
        log(...logPrefix, ...entry.content);
    }
};
exports.log = {
    item: (item) => ({
        process(level, context, ...content) {
            const entry = {
                timestamp: new Date(),
                level,
                item,
                source: 'process',
                context,
                content,
            };
            renderLog(entry);
            exports.logMemory.push(Object.assign(Object.assign({}, entry), { content: serializeErrors(content) }));
        },
        browser(level, context, ...content) {
            const entry = {
                timestamp: new Date(),
                level,
                item,
                source: 'browser',
                context,
                content,
            };
            renderLog(entry);
            exports.logMemory.push(Object.assign(Object.assign({}, entry), { content: serializeErrors(content) }));
        },
    }),
    process(level, context, ...content) {
        const entry = {
            timestamp: new Date(),
            level,
            source: 'process',
            context,
            content,
        };
        renderLog(entry);
        exports.logMemory.push(Object.assign(Object.assign({}, entry), { content: serializeErrors(content) }));
    },
    browser(level, context, ...content) {
        const entry = {
            timestamp: new Date(),
            level,
            source: 'browser',
            context,
            content,
        };
        renderLog(entry);
        exports.logMemory.push(Object.assign(Object.assign({}, entry), { content: serializeErrors(content) }));
    },
};
