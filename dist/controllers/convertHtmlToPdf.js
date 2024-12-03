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
exports.convertHtmlToPdfEndpoint = convertHtmlToPdfEndpoint;
const pdf_1 = require("../utils/pdf");
const conversion_1 = require("../utils/conversion");
const helper_1 = require("./helper");
function convertHtmlToPdfEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        try {
            if (!content) {
                res.status(400).json({ error: "'content' must be provided." });
                return;
            }
            if (!(0, conversion_1.isValidHtml)(content)) {
                res.status(400).json({ error: "Invalid Html content." });
                return;
            }
            // Step 1: Convert HTML to PDF
            const pdfBuffer = yield (0, pdf_1.convertHtmlToPdf)(content);
            // Step 2: Send the PDF file as a response
            (0, helper_1.sendPdfResponse)(res, pdfBuffer);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
//# sourceMappingURL=convertHtmlToPdf.js.map