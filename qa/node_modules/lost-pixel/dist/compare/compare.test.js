"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const compare_1 = require("./compare");
beforeAll(() => {
    if (!(0, node_fs_1.existsSync)('fixtures/test-results')) {
        (0, node_fs_1.mkdirSync)('fixtures/test-results', { recursive: true });
    }
});
describe(compare_1.checkThreshold, () => {
    it('should check if changes are within threshold', async () => {
        expect((0, compare_1.checkThreshold)(0, 100, 0)).toBe(true);
        expect((0, compare_1.checkThreshold)(0, 100, 1)).toBe(false);
        expect((0, compare_1.checkThreshold)(0.1, 100, 0)).toBe(true);
        expect((0, compare_1.checkThreshold)(0.1, 100, 10)).toBe(true);
        expect((0, compare_1.checkThreshold)(0.1, 100, 11)).toBe(false);
        expect((0, compare_1.checkThreshold)(1, 100, 0)).toBe(true);
        expect((0, compare_1.checkThreshold)(1, 100, 1)).toBe(true);
        expect((0, compare_1.checkThreshold)(1, 100, 2)).toBe(false);
        expect((0, compare_1.checkThreshold)(123, 10000, 0)).toBe(true);
        expect((0, compare_1.checkThreshold)(123, 10000, 123)).toBe(true);
        expect((0, compare_1.checkThreshold)(123, 10000, 124)).toBe(false);
    });
});
describe(compare_1.compareImagesViaPixelmatch, () => {
    it('should recognize identic images', async () => {
        expect(await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/baseline/banner.png', 'fixtures/baseline/banner.png', 'fixtures/difference/banner.png')).toStrictEqual({
            pixelDifference: 0,
            pixelDifferencePercentage: 0,
            isWithinThreshold: true,
        });
    });
    it('should recoginze differences in images', async () => {
        const result1 = await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/baseline/banner.png', 'fixtures/current/banner1.png', 'fixtures/test-results/banner1.png');
        expect(result1.isWithinThreshold).toBe(false);
        expect(result1.pixelDifference).toBeGreaterThan(50000);
        expect(await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/difference/banner1.png', 'fixtures/test-results/banner1.png')).toStrictEqual({
            pixelDifference: 0,
            pixelDifferencePercentage: 0,
            isWithinThreshold: true,
        });
        const result2 = await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/baseline/banner.png', 'fixtures/current/banner2.png', 'fixtures/test-results/banner2.png');
        expect(result2.isWithinThreshold).toBe(false);
        expect(result2.pixelDifference).toBeGreaterThan(350000);
        expect(await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/difference/banner2.png', 'fixtures/test-results/banner2.png')).toStrictEqual({
            pixelDifference: 0,
            pixelDifferencePercentage: 0,
            isWithinThreshold: true,
        });
        const result3 = await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/baseline/banner.png', 'fixtures/current/banner3.png', 'fixtures/test-results/banner3.png');
        expect(result3.isWithinThreshold).toBe(false);
        expect(result3.pixelDifference).toBeGreaterThan(40000);
        expect(await (0, compare_1.compareImagesViaPixelmatch)(0, 'fixtures/difference/banner3.png', 'fixtures/test-results/banner3.png')).toStrictEqual({
            pixelDifference: 0,
            pixelDifferencePercentage: 0,
            isWithinThreshold: true,
        });
    }, 12000);
    it('should accept differences in images within a given threshold', async () => {
        const result1 = await (0, compare_1.compareImagesViaPixelmatch)(0.4, 'fixtures/baseline/banner.png', 'fixtures/current/banner1.png', 'fixtures/test-results/banner1.png');
        expect(result1.isWithinThreshold).toBe(true);
        expect(result1.pixelDifference).toBeGreaterThan(50000);
        const result2 = await (0, compare_1.compareImagesViaPixelmatch)(400000, 'fixtures/baseline/banner.png', 'fixtures/current/banner2.png', 'fixtures/test-results/banner2.png');
        expect(result2.isWithinThreshold).toBe(true);
        expect(result2.pixelDifference).toBeGreaterThan(350000);
        const result3 = await (0, compare_1.compareImagesViaPixelmatch)(50000, 'fixtures/baseline/banner.png', 'fixtures/current/banner3.png', 'fixtures/test-results/banner3.png');
        expect(result3.isWithinThreshold).toBe(true);
        expect(result3.pixelDifference).toBeGreaterThan(40000);
    }, 12000);
    it('should accept differences in images within a given threshold if using odiff', async () => {
        const result1 = await (0, compare_1.compareImagesViaOdiff)(0.4, 'fixtures/baseline/banner.png', 'fixtures/current/banner1.png', 'fixtures/test-results/banner1.png');
        expect(result1.isWithinThreshold).toBe(true);
        expect(result1.pixelDifference).toBeGreaterThan(50000);
        const result3 = await (0, compare_1.compareImagesViaOdiff)(50000, 'fixtures/baseline/banner.png', 'fixtures/current/banner3.png', 'fixtures/test-results/banner3.png');
        expect(result3.isWithinThreshold).toBe(true);
        expect(result3.pixelDifference).toBeGreaterThan(40000);
    }, 12000);
});
