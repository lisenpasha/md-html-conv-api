"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPdfResponse = exports.validateInput = void 0;
/**
 * Validate input parameters.
 * Ensures either `content` or `url` is provided, but not both.
 */
const validateInput = (res, content, url) => {
    if (!content && !url) {
        res.status(400).json({ error: "Either 'content' or 'url' must be provided." });
        return false;
    }
    if (content && url) {
        res.status(400).json({ error: "'content' and 'url' cannot be provided together." });
        return false;
    }
    return true;
};
exports.validateInput = validateInput;
/**
 * Send a PDF response with proper headers.
 */
const sendPdfResponse = (res, pdfBuffer) => {
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=converted.pdf",
    });
    res.status(200).send(pdfBuffer);
};
exports.sendPdfResponse = sendPdfResponse;
//# sourceMappingURL=helper.js.map