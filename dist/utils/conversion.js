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
exports.isValidHtml = exports.isValidMarkdown = exports.fetchRemoteContent = exports.htmlToMarkdown = exports.markdownToHtml = void 0;
const markdown_it_1 = __importDefault(require("markdown-it"));
const html_validator_1 = __importDefault(require("html-validator"));
const axios_1 = __importDefault(require("axios"));
// Helper: Generates a replace call for headings incrementally based on the desired output format (markdown or html)
const processHeadings = (content, type) => {
    for (let i = 1; i <= 4; i++) {
        if (type === "toMarkdown") {
            const regex = new RegExp(`<h${i}>(.+?)</h${i}>`, "g");
            content = content.replace(regex, `${"#".repeat(i)} $1\n\n`);
        }
        else if (type === "toHtml") {
            const regex = new RegExp(`^${"#".repeat(i)} (.+)$`, "gm");
            content = content.replace(regex, `<h${i}>$1</h${i}>`);
        }
    }
    return content;
};
// Helper: Process Code Blocks
const processCodeBlocks = (content, type) => {
    if (type === "toMarkdown") {
        // Convert <pre><code>...</code></pre> to ```bash ... ```
        return content.replace(/<pre><code.*?>([\s\S]+?)<\/code><\/pre>/gi, "```\n$1\n```");
    }
    else if (type === "toHtml") {
        // Convert ```bash ... ``` to <pre><code>...</code></pre>
        return content.replace(/```([\s\S]+?)```/g, "<pre><code>$1</code></pre>");
    }
    return content;
};
// Convert Markdown to HTML using regex
const markdownToHtml = (markdown) => {
    let html = markdown;
    // Convert Headings
    html = processHeadings(html, "toHtml");
    // Convert Code Blocks
    html = processCodeBlocks(html, "toHtml");
    // Convert Bold (**bold**)
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Convert Italic (*italic*)
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Convert Blockquotes
    html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
    // Convert Horizontal Rules
    html = html.replace(/^---$/gm, "<hr>");
    // Wrap remaining lines in <p>
    html = html.replace(/^(?!<(?:h1|h2|h3|strong|em|a|li|ul)>)(.+)$/gm, "<p>$1</p>");
    // Remove any newlines introduced between tags
    html = html.replace(/>\n</g, "><");
    return html.trim();
};
exports.markdownToHtml = markdownToHtml;
// Convert HTML to Markdown using regex
const htmlToMarkdown = (html) => {
    let markdown = html;
    // Convert Headings
    markdown = processHeadings(markdown, "toMarkdown");
    // Convert Code Blocks
    markdown = processCodeBlocks(markdown, "toMarkdown");
    // Bold
    markdown = markdown.replace(/<strong>(.+?)<\/strong>/g, "**$1**");
    // Italic
    markdown = markdown.replace(/<em>(.+?)<\/em>/g, "*$1*");
    // Convert Blockquotes
    markdown = markdown.replace(/<blockquote>(.+?)<\/blockquote>/gi, "> $1");
    // Convert Horizontal Rules
    markdown = markdown.replace(/<hr>/gi, "---");
    // Links
    markdown = markdown.replace(/<a href="(.+?)">(.+?)<\/a>/g, "[$2]($1)");
    // Lists
    markdown = markdown.replace(/<li>(.+?)<\/li>/g, "* $1");
    // Remove extra HTML tags
    markdown = markdown.replace(/<[^>]+>/g, "");
    return markdown.trim();
};
exports.htmlToMarkdown = htmlToMarkdown;
// Fetch remote content and validate format
const fetchRemoteContent = (url, expectedType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
            validateStatus: () => true // Allow all HTTP statuses to pass through
        });
        const content = response.data; // Get the response content
        if (expectedType === "html" && !(0, exports.isValidHtml)(content)) {
            throw new Error("Content is not valid HTML.");
        }
        if (expectedType === "markdown" && !(0, exports.isValidMarkdown)(content)) {
            throw new Error("Content is not valid Markdown.");
        }
        return content;
    }
    catch (error) {
        throw new Error(`Error fetching content: ${error.message}`);
    }
});
exports.fetchRemoteContent = fetchRemoteContent;
// Check if content is valid Markdown
const isValidMarkdown = (markdown) => {
    try {
        const md = new markdown_it_1.default();
        md.render(markdown);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isValidMarkdown = isValidMarkdown;
// Check if content is valid HTML
const isValidHtml = (html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, html_validator_1.default)({ data: html });
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.isValidHtml = isValidHtml;
//# sourceMappingURL=conversion.js.map