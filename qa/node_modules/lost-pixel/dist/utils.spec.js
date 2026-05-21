"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const config_1 = require("./config");
beforeAll(async () => {
    await (0, config_1.configure)({
        customProjectConfig: {},
    });
});
const baselineShotsPath = '.lostpixel/baseline';
const currentShotsPath = '.lostpixel/current';
const differenceShotsPath = '.lostpixel/difference';
const customShotsPath = '.lostpixel/custom';
describe(utils_1.getChanges, () => {
    it('should reflect no difference', () => {
        expect((0, utils_1.getChanges)({
            baseline: [
                { name: 'a.png', path: baselineShotsPath },
                { name: 'b.png', path: baselineShotsPath },
            ],
            current: [
                { name: 'a.png', path: currentShotsPath },
                { name: 'b.png', path: customShotsPath },
            ],
            difference: [],
        })).toEqual({
            difference: [],
            deletion: [],
            addition: [],
        });
        expect((0, utils_1.getChanges)({
            baseline: [
                { name: 'a.png', path: baselineShotsPath },
                { name: 'b.png', path: baselineShotsPath },
            ],
            current: [
                { name: 'b.png', path: currentShotsPath },
                { name: 'a.png', path: customShotsPath },
            ],
            difference: [],
        })).toEqual({
            difference: [],
            deletion: [],
            addition: [],
        });
    });
    it('should highlight added files', () => {
        expect((0, utils_1.getChanges)({
            baseline: [
                { name: 'a.png', path: baselineShotsPath },
                { name: 'b.png', path: baselineShotsPath },
            ],
            current: [
                { name: 'a.png', path: currentShotsPath },
                { name: 'b.png', path: customShotsPath },
                { name: 'd.png', path: currentShotsPath },
                { name: 'c.png', path: customShotsPath },
            ],
            difference: [],
        })).toEqual({
            difference: [],
            deletion: [],
            addition: [
                { name: 'c.png', path: customShotsPath },
                { name: 'd.png', path: currentShotsPath },
            ],
        });
    });
    it('should highlight removed files', () => {
        expect((0, utils_1.getChanges)({
            baseline: [
                { name: 'a.png', path: baselineShotsPath },
                { name: 'b.png', path: baselineShotsPath },
                { name: 'c.png', path: baselineShotsPath },
                { name: 'd.png', path: baselineShotsPath },
            ],
            current: [
                { name: 'a.png', path: currentShotsPath },
                { name: 'd.png', path: customShotsPath },
            ],
            difference: [],
        })).toEqual({
            difference: [],
            deletion: [
                { name: 'b.png', path: baselineShotsPath },
                { name: 'c.png', path: baselineShotsPath },
            ],
            addition: [],
        });
    });
    it('should highlight changed files', () => {
        expect((0, utils_1.getChanges)({
            baseline: [
                { name: 'a.png', path: baselineShotsPath },
                { name: 'b.png', path: baselineShotsPath },
            ],
            current: [
                { name: 'a.png', path: currentShotsPath },
                { name: 'b.png', path: customShotsPath },
            ],
            difference: [{ name: 'b.png', path: differenceShotsPath }],
        })).toEqual({
            difference: [
                {
                    name: 'b.png',
                    pathCurrent: customShotsPath,
                    path: differenceShotsPath,
                },
            ],
            deletion: [],
            addition: [],
        });
    });
    it('should highlight added/remove/changed files', () => {
        expect((0, utils_1.getChanges)({
            baseline: [
                { name: 'a.png', path: baselineShotsPath },
                { name: 'b.png', path: baselineShotsPath },
            ],
            current: [
                { name: 'a.png', path: currentShotsPath },
                { name: 'd.png', path: currentShotsPath },
                { name: 'c.png', path: customShotsPath },
            ],
            difference: [{ name: 'a.png', path: differenceShotsPath }],
        })).toEqual({
            difference: [
                {
                    name: 'a.png',
                    path: differenceShotsPath,
                    pathCurrent: currentShotsPath,
                },
            ],
            deletion: [{ name: 'b.png', path: baselineShotsPath }],
            addition: [
                { name: 'c.png', path: customShotsPath },
                { name: 'd.png', path: currentShotsPath },
            ],
        });
    });
});
describe(utils_1.extendFileName, () => {
    it('should extend file names', () => {
        expect((0, utils_1.extendFileName)({ fileName: 'a.png', extension: 'after' })).toEqual('a.after.png');
        expect((0, utils_1.extendFileName)({ fileName: 'another.one.png', extension: 'after' })).toEqual('another.one.after.png');
        expect((0, utils_1.extendFileName)({ fileName: 'One More .png', extension: 'before' })).toEqual('One More .before.png');
    });
    it('should handle irregular file names', () => {
        expect((0, utils_1.extendFileName)({ fileName: '.png', extension: 'after' })).toEqual('after.png');
        expect((0, utils_1.extendFileName)({ fileName: 'test', extension: 'after' })).toEqual('after.test');
        expect((0, utils_1.extendFileName)({ fileName: '', extension: 'before' })).toEqual('before');
    });
});
describe(utils_1.readDirIntoShotItems, () => {
    it('should generate correct shot lists from supplied folder', () => {
        expect((0, utils_1.readDirIntoShotItems)('./fixtures/current')).toEqual([
            {
                filePathBaseline: '.lostpixel/baseline/add-to-cart.png',
                filePathCurrent: 'fixtures/current/add-to-cart.png',
                filePathDifference: '.lostpixel/difference/add-to-cart.png',
                id: 'add-to-cart',
                shotMode: 'custom',
                shotName: 'add-to-cart',
                threshold: 0,
                url: 'add-to-cart',
            },
            {
                filePathBaseline: '.lostpixel/baseline/banner1.png',
                filePathCurrent: 'fixtures/current/banner1.png',
                filePathDifference: '.lostpixel/difference/banner1.png',
                id: 'banner1',
                shotMode: 'custom',
                shotName: 'banner1',
                threshold: 0,
                url: 'banner1',
            },
            {
                filePathBaseline: '.lostpixel/baseline/banner2.png',
                filePathCurrent: 'fixtures/current/banner2.png',
                filePathDifference: '.lostpixel/difference/banner2.png',
                id: 'banner2',
                shotMode: 'custom',
                shotName: 'banner2',
                threshold: 0,
                url: 'banner2',
            },
            {
                filePathBaseline: '.lostpixel/baseline/banner3.png',
                filePathCurrent: 'fixtures/current/banner3.png',
                filePathDifference: '.lostpixel/difference/banner3.png',
                id: 'banner3',
                shotMode: 'custom',
                shotName: 'banner3',
                threshold: 0,
                url: 'banner3',
            },
            {
                filePathBaseline: '.lostpixel/baseline/remove-to-cart.png',
                filePathCurrent: 'fixtures/current/remove-to-cart.png',
                filePathDifference: '.lostpixel/difference/remove-to-cart.png',
                id: 'remove-to-cart',
                shotMode: 'custom',
                shotName: 'remove-to-cart',
                threshold: 0,
                url: 'remove-to-cart',
            },
        ]);
    });
});
