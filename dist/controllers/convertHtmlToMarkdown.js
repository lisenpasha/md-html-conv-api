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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractContentWithSelectors = exports.convertHtmlToMarkdown = void 0;
const conversion_1 = require("../utils/conversion");
const cheerio = __importStar(require("cheerio"));
const helper_1 = require("./helper");
const convertHtmlToMarkdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, url, selector } = req.body;
    try {
        if (!(0, helper_1.validateInput)(res, content, url))
            return;
        let html = content || (yield (0, conversion_1.fetchRemoteContent)(url, "html"));
        if (!(0, conversion_1.isValidHtml)(html)) {
            res.status(400).json({ error: "Invalid Html content." });
            return;
        }
        if (selector && url) {
            const selectors = Array.isArray(selector) ? selector : [selector];
            const extractedContent = (0, exports.extractContentWithSelectors)(html, selectors, res);
            html = extractedContent;
        }
        const markdown = (0, conversion_1.htmlToMarkdown)(html);
        res.status(200).json({ markdown });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.convertHtmlToMarkdown = convertHtmlToMarkdown;
/**
* Validate and extract content using CSS selectors.
* @param html - The HTML content to search within.
* @param selectors - The CSS selectors to use for extracting content.
* @param res - The Express response object for error handling.
* @returns The concatenated content extracted from the selectors.
*/
const extractContentWithSelectors = (html, selectors, res) => {
    const selectorPattern = /^[\w\-\.\#]+$/; // Simplified regex for valid CSS selectors
    const $ = cheerio.load(html);
    let concatenatedHtml = "";
    for (const sel of selectors) {
        if (!selectorPattern.test(sel)) {
            res.status(400).json({ error: "Invalid CSS selector." });
            return null;
        }
        const selectedContent = $(sel).html() || "";
        if (!selectedContent) {
            console.log({ error: `No content found for selector: '${sel}'` });
        }
        concatenatedHtml += selectedContent;
    }
    return concatenatedHtml;
};
exports.extractContentWithSelectors = extractContentWithSelectors;
//# sourceMappingURL=convertHtmlToMarkdown.js.map