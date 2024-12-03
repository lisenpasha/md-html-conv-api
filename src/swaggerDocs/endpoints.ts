export const swaggerEndpoints = () => {
    /**
     * @swagger
     * /convert/html:
     *   post:
     *     summary: Convert Markdown to HTML
     *     description: Converts Markdown content or a remote Markdown file into HTML.
     *     tags:
     *       - Conversion
     *     parameters:
     *       - name: x-api-key
     *         in: header
     *         required: true
     *         schema:
     *           type: string
     *         description: API key for authentication.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *                 description: The Markdown content to convert to HTML.
     *                 example: "# Welcome\n\nThis is **bold** text."
     *               url:
     *                 type: string
     *                 description: The URL pointing to a remote Markdown file to convert.
     *                 example: "https://example.com/sample.md"
     *             required:
     *               - content
     *               - url
     *     responses:
     *       200:
     *         description: Successfully converted Markdown to HTML.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 html:
     *                   type: string
     *                   description: The converted HTML content.
     *                   example: "<h1>Welcome</h1><p>This is <strong>bold</strong> text.</p>"
     *       400:
     *         description: Invalid input (e.g., missing content or URL).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Either 'content' or 'url' must be provided."
     *       401:
     *         description: Missing or invalid API key.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Unauthorized: Missing or invalid API key."
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Internal server error."
     */
  
    /**
     * @swagger
     * /convert/markdown:
     *   post:
     *     summary: Convert HTML to Markdown
     *     description: Converts HTML content or a remote HTML file into Markdown. Optionally, CSS selectors can be used to extract specific parts of the HTML.
     *     tags:
     *       - Conversion
     *     parameters:
     *       - name: x-api-key
     *         in: header
     *         required: true
     *         schema:
     *           type: string
     *         description: API key for authentication.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *                 description: The HTML content to convert to Markdown.
     *                 example: "<h1>Welcome</h1><p>This is <strong>bold</strong> text.</p>"
     *               url:
     *                 type: string
     *                 description: The URL pointing to a remote HTML file to convert.
     *                 example: "https://example.com/sample.html"
     *               selector:
     *                 oneOf:
     *                   - type: string
     *                     description: A single CSS selector to extract specific HTML elements when using a URL.
     *                     example: "p"
     *                   - type: array
     *                     items:
     *                       type: string
     *                     description: An array of CSS selectors to extract multiple HTML elements when using a URL.
     *                     example: ["p", ".content"]
     *             required:
     *               - content
     *               - url
     *     responses:
     *       200:
     *         description: Successfully converted HTML to Markdown.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 markdown:
     *                   type: string
     *                   description: The converted Markdown content.
     *                   example: "# Welcome\n\nThis is **bold** text."
     *       400:
     *         description: Invalid input (e.g., missing content, URL, or invalid CSS selector).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Either 'content' or 'url' must be provided."
     *       401:
     *         description: Missing or invalid API key.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Unauthorized: Missing or invalid API key."
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Internal server error."
     */
  
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Welcome message
     *     description: Returns a welcome message for the API.
     *     tags:
     *       - General
     *     responses:
     *       200:
     *         description: Successfully returns a welcome message.
     */

    /**
 * @swagger
 * /convert/markdown/pdf:
 *   post:
 *     summary: Convert Markdown to PDF
 *     description: Converts Markdown content to PDF by first converting it to HTML and then to PDF.
 *     tags:
 *       - Conversion
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: API key for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The Markdown content to convert to PDF.
 *                 example: "# Welcome\n\nThis is **bold** text."
 *     responses:
 *       200:
 *         description: Successfully converted Markdown to PDF.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid input (e.g., missing content).
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /convert/html/pdf:
 *   post:
 *     summary: Convert HTML to PDF
 *     description: Converts HTML content to PDF.
 *     tags:
 *       - Conversion
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: API key for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The HTML content to convert to PDF.
 *                 example: "<h1>Welcome</h1><p>This is <strong>bold</strong> text.</p>"
 *     responses:
 *       200:
 *         description: Successfully converted HTML to PDF.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid input (e.g., missing content).
 *       500:
 *         description: Internal server error.
 */
  };
  