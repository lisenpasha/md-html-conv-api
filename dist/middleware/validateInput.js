"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndSanitizeInput = validateAndSanitizeInput;
const validator_1 = __importDefault(require("validator")); // Install this library: npm install validator
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function validateAndSanitizeInput(req, res, next) {
    const { content, url, selector } = req.body;
    try {
        // 1. Validate and sanitize URL
        if (url) {
            if (!validator_1.default.isURL(url, { protocols: ["http", "https"], require_protocol: true })) {
                res.status(400).json({ error: "Invalid URL format." });
                return;
            }
            req.body.url = validator_1.default.trim(url); // Sanitize by trimming spaces
        }
        // 2. Sanitize content to prevent XSS attacks. (if present)
        if (content) {
            req.body.content = (0, sanitize_html_1.default)(content);
        }
        next(); // Proceed to the next middleware/controller
    }
    catch (error) {
        res.status(500).json({ error: "Error validating input: " + error.message });
    }
}
//# sourceMappingURL=validateInput.js.map