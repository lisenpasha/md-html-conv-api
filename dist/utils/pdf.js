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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHtmlToPdf = convertHtmlToPdf;
const html_pdf_1 = __importDefault(require("html-pdf"));
const util_1 = require("util");
const env_1 = require("../os/env");
function convertHtmlToPdf(html) {
    return __awaiter(this, void 0, void 0, function* () {
        const phantomPath = (0, env_1.getPhantomJsPath)(); // Dynamically resolve PhantomJS path
        const options = {
            format: 'A4',
            border: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
            phantomPath: phantomPath,
        };
        try {
            // Generate the PDF buffer using the promisified method
            const pdfInstance = html_pdf_1.default.create(html, options);
            const toBufferAsync = (0, util_1.promisify)(pdfInstance.toBuffer.bind(pdfInstance));
            return yield toBufferAsync();
        }
        catch (err) {
            throw new Error(`Failed to generate PDF: ${err.message}`);
        }
    });
}
//# sourceMappingURL=pdf.js.map