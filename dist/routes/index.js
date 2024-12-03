"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const convertMarkdownToPdf_1 = require("../controllers/convertMarkdownToPdf");
const convertMarkdownToHtml_1 = require("../controllers/convertMarkdownToHtml");
const convertHtmlToMarkdown_1 = require("../controllers/convertHtmlToMarkdown");
const convertHtmlToPdf_1 = require("../controllers/convertHtmlToPdf");
const auth_1 = require("../middleware/auth");
const validateInput_1 = require("../middleware/validateInput");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.json({ message: "Welcome to md-html-conv-api!" });
});
// Apply authentication and input validation middleware to all routes below
router.use(auth_1.authenticate);
router.use(validateInput_1.validateAndSanitizeInput);
// Markdown to HTML
router.post("/convert/html", convertMarkdownToHtml_1.convertMarkdownToHtml);
// HTML to Markdown
router.post("/convert/markdown", convertHtmlToMarkdown_1.convertHtmlToMarkdown);
// Markdown to PDF
router.post("/convert/markdown/pdf", convertMarkdownToPdf_1.convertMarkdownToPdf);
// HTML to PDF
router.post("/convert/html/pdf", convertHtmlToPdf_1.convertHtmlToPdfEndpoint);
exports.default = router;
//# sourceMappingURL=index.js.map