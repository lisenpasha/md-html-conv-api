import { Request, Response } from "express";
import { convertHtmlToPdf } from "../utils/pdf";
import { isValidHtml } from "../utils/conversion";
import { sendPdfResponse } from "./helper";

export async function convertHtmlToPdfEndpoint(req: Request, res: Response): Promise<void> {
    const { content } = req.body;
  
    try {
      
      if (!content) {
        res.status(400).json({ error: "'content' must be provided." });
        return;
      }
  
      if (!isValidHtml(content)) {
        res.status(400).json({ error: "Invalid Html content." });
        return;
      }
  
      // Step 1: Convert HTML to PDF
      const pdfBuffer = await convertHtmlToPdf(content);
  
      // Step 2: Send the PDF file as a response
      sendPdfResponse(res, pdfBuffer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }