export declare const createShots: () => Promise<{
    shotMode: "storybook" | "ladle" | "histoire" | "page" | "custom";
    id: string;
    shotName: string;
    url: string;
    filePathBaseline: string;
    filePathCurrent: string;
    filePathDifference: string;
    threshold: number;
    browserConfig?: import("playwright-core").BrowserContextOptions | undefined;
    waitBeforeScreenshot?: number | undefined;
    importPath?: string | undefined;
    mask?: {
        selector: string;
    }[] | undefined;
    viewport?: {
        width: number;
        height?: number | undefined;
    } | undefined;
    breakpoint?: number | undefined;
    breakpointGroup?: string | undefined;
    elementLocator?: string | undefined;
    waitForSelector?: string | undefined;
}[]>;
