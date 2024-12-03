import { Request, Response } from "express";
import { markdownToHtml,isValidMarkdown } from "../utils/conversion";
import { convertHtmlToPdf } from "../utils/pdf";
import { sendPdfResponse } from "./helper";

export async function convertMarkdownToPdf(req: Request, res: Response): Promise<void> {
  const { content } = req.body;

  try {
    if (!content) {
      res.status(400).json({ error: "'content' must be provided." });
      return;
    }

    if (!isValidMarkdown(content)) {
      res.status(400).json({ error: "Invalid Markdown content." });
      return;
  }

    // Step 1: Convert Markdown to HTML
    const html = markdownToHtml(content);

    // Step 2: Convert HTML to PDF
    const pdfBuffer = await convertHtmlToPdf(html);

    // Step 3: Send the PDF file as a response
    sendPdfResponse(res, pdfBuffer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


