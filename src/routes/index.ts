import express from "express";
import { Request, Response } from "express";
import { convertMarkdownToPdf} from "../controllers/convertMarkdownToPdf";
import { convertMarkdownToHtml } from "../controllers/convertMarkdownToHtml";
import { convertHtmlToMarkdown } from "../controllers/convertHtmlToMarkdown";
import { convertHtmlToPdfEndpoint } from "../controllers/convertHtmlToPdf";
import { authenticate } from "../middleware/auth";
import { validateAndSanitizeInput } from "../middleware/validateInput";


const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to md-html-conv-api!" });
});

// Apply authentication and input validation middleware to all routes below
router.use(authenticate);
router.use(validateAndSanitizeInput);

// Markdown to HTML
router.post("/convert/html", convertMarkdownToHtml);

// HTML to Markdown
router.post("/convert/markdown", convertHtmlToMarkdown);

// Markdown to PDF
router.post("/convert/markdown/pdf", convertMarkdownToPdf);

// HTML to PDF
router.post("/convert/html/pdf", convertHtmlToPdfEndpoint);

export default router;
