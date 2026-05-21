"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShotItemSchema = exports.MaskSchema = exports.ShotModeSchema = exports.BrowserSchema = void 0;
const z = __importStar(require("zod"));
exports.BrowserSchema = z.enum(['chromium', 'firefox', 'webkit']);
exports.ShotModeSchema = z.enum([
    'storybook',
    'ladle',
    'histoire',
    'page',
    'custom',
]);
exports.MaskSchema = z.object({
    /**
     * CSS selector for the element to mask
     * Examples:
     * - `#my-id`: Selects the element with the id `my-id`
     * - `.my-class`: Selects all elements with the class `my-class`
     * - `div`: Selects all `div` elements
     * - `div.my-class`: Selects all `div` elements with the class `my-class`
     * - `li:nth-child(2n)`: Selects all even `li` elements
     * - `[data-testid="hero-banner"]`: Selects all elements with the attribute `data-testid` set to `hero-banner`
     * - `div > p`: Selects all `p` elements that are direct children of a `div` element
     */
    selector: z.string(),
});
exports.ShotItemSchema = z.object({
    shotMode: exports.ShotModeSchema,
    id: z.string(),
    shotName: z.string(),
    url: z.string(),
    filePathBaseline: z.string(),
    filePathCurrent: z.string(),
    filePathDifference: z.string(),
    browserConfig: z.custom().optional(),
    threshold: z.number(),
    waitBeforeScreenshot: z.number().optional(),
    importPath: z.string().optional(),
    mask: z.array(exports.MaskSchema).optional(),
    viewport: z
        .object({
        width: z.number(),
        height: z.number().optional(),
    })
        .optional(),
    breakpoint: z.number().optional(),
    breakpointGroup: z.string().optional(),
    elementLocator: z.string().optional(),
    waitForSelector: z.string().optional(),
});
