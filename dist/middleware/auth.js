"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function parseApiKeys() {
    const apiKeysEnv = process.env.API_KEYS || "";
    const apiKeysMap = {};
    apiKeysEnv.split(",").forEach((pair) => {
        const [client, key] = pair.split(":");
        if (client && key) {
            apiKeysMap[client.trim()] = key.trim();
        }
    });
    return apiKeysMap;
}
const API_KEYS = parseApiKeys();
function authenticate(req, res, next) {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
        res.status(401).json({ error: "Unauthorized: API key is missing." });
        return;
    }
    const isValid = Object.values(API_KEYS).includes(apiKey);
    if (!isValid) {
        res.status(401).json({ error: "Unauthorized: Invalid API key." });
        return;
    }
    next();
}
;
//# sourceMappingURL=auth.js.map