"use strict";
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
exports.convertMarkdownToHtml = void 0;
const conversion_1 = require("../utils/conversion");
const helper_1 = require("./helper");
const convertMarkdownToHtml = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, url } = req.body;
    try {
        if (!(0, helper_1.validateInput)(res, content, url))
            return;
        const markdown = content || (yield (0, conversion_1.fetchRemoteContent)(url, "markdown"));
        if (!(0, conversion_1.isValidMarkdown)(markdown)) {
            res.status(400).json({ error: "Invalid Markdown content." });
            return;
        }
        const html = (0, conversion_1.markdownToHtml)(markdown);
        res.status(200).json({ html });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.convertMarkdownToHtml = convertMarkdownToHtml;
//# sourceMappingURL=convertMarkdownToHtml.js.map