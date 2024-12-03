import { Response } from "express";
/**
 * Validate input parameters.
 * Ensures either `content` or `url` is provided, but not both.
 */
export const validateInput = (
  res: Response,
  content: string | undefined,
  url: string | undefined
): boolean => {
  if (!content && !url) {
    res.status(400).json({ error: "Either 'content' or 'url' must be provided." });
    return false;
  }
  if (content && url) {
    res.status(400).json({ error: "'content' and 'url' cannot be provided together." });
    return false;
  }
  return true
}


/**
 * Send a PDF response with proper headers.
 */
export const sendPdfResponse = (res: Response, pdfBuffer: Buffer): void => {
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=converted.pdf",
    });
    res.status(200).send(pdfBuffer);
  };