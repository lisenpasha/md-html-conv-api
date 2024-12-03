"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyGeneralSecurityMiddleware = applyGeneralSecurityMiddleware;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function applyGeneralSecurityMiddleware(app) {
    // 1. Use Helmet to set security headers
    app.use((0, helmet_1.default)());
    // 2. Rate limiter to limit repeated requests
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 50, // Limit each IP to 50 requests per windowMs
        message: { error: "Too many requests, please try again later." },
    });
    app.use(limiter);
    // 3. Enable CORS
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    }));
    // 4. Middleware for sanitizing incoming HTML
    app.use((req, res, next) => {
        function sanitizeRecursive(data) {
            if (typeof data === "string") {
                return (0, sanitize_html_1.default)(data); // Sanitize strings
            }
            else if (typeof data === "object" && data !== null) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        data[key] = sanitizeRecursive(data[key]); // Recursively sanitize objects
                    }
                }
            }
            return data;
        }
        ;
        req.body = sanitizeRecursive(req.body);
        req.query = sanitizeRecursive(req.query);
        req.params = sanitizeRecursive(req.params);
        next();
    });
}
//# sourceMappingURL=generalSecurity.js.map