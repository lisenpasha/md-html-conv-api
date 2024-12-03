"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const generalSecurity_1 = require("./middleware/generalSecurity");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerConfig_1 = __importDefault(require("./swaggerDocs/swaggerConfig"));
const PORT = process.env.PORT || 12345;
const app = (0, express_1.default)();
// Swagger setup
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerConfig_1.default);
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Apply general security middleware
(0, generalSecurity_1.applyGeneralSecurityMiddleware)(app);
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use("/api", routes_1.default);
app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map