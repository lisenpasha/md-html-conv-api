"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Markdown-HTML Converter API",
            version: "1.0.0",
            description: `
        An API to convert Markdown to HTML and HTML to Markdown.
        \n\n
        Note: Requests to undefined endpoints will result in a 404 Not Found error.
      `,
        },
        servers: [
            {
                url: "http://localhost:12345/api",
                description: "Development Server",
            },
        ],
    },
    apis: ["./src/swaggerDocs/*.ts"],
};
exports.default = swaggerConfig;
//# sourceMappingURL=swaggerConfig.js.map