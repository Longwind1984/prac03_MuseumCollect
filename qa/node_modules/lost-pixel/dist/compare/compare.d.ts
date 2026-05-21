export declare const checkThreshold: (threshold: number, pixelsTotal: number, pixelDifference: number) => boolean;
export declare const compareImagesViaPixelmatch: (threshold: number, baselineShotPath: string, currentShotPath: string, differenceShotPath?: string) => Promise<{
    pixelDifference: number;
    pixelDifferencePercentage: number;
    isWithinThreshold: boolean;
}>;
export declare const compareImagesViaOdiff: (threshold: number, baselineShotPath: string, currentShotPath: string, differenceShotPath: string) => Promise<{
    pixelDifference: number;
    pixelDifferencePercentage: number;
    isWithinThreshold: boolean;
}>;
export declare const compareImages: (threshold: number, baselineShotPath: string, currentShotPath: string, differenceShotPath: string) => Promise<{
    pixelDifference: number;
    pixelDifferencePercentage: number;
    isWithinThreshold: boolean;
}>;
