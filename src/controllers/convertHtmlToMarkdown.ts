import { Request, Response } from "express";
import { isValidHtml, fetchRemoteContent, htmlToMarkdown } from "../utils/conversion";
import * as cheerio from "cheerio";
import { validateInput } from "./helper";

export const convertHtmlToMarkdown = async (req: Request, res: Response): Promise<void> => {
  const { content, url, selector } = req.body;

  try {
    if (!validateInput(res, content, url)) return;

    let html = content || (await fetchRemoteContent(url, "html"));

    if (!isValidHtml(html)) {
      res.status(400).json({ error: "Invalid Html content." });
      return;
    }

    if (selector && url) {
      const selectors = Array.isArray(selector) ? selector : [selector]
      const extractedContent = extractContentWithSelectors(html, selectors, res);
      html = extractedContent;
    }

    const markdown = htmlToMarkdown(html);

    res.status(200).json({ markdown });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


/**
* Validate and extract content using CSS selectors.
* @param html - The HTML content to search within.
* @param selectors - The CSS selectors to use for extracting content.
* @param res - The Express response object for error handling.
* @returns The concatenated content extracted from the selectors.
*/
export const extractContentWithSelectors = (
  html: string,
  selectors: string[],
  res: Response
): string | null => {
  const selectorPattern = /^[\w\-\.\#]+$/; // Simplified regex for valid CSS selectors
  const $ = cheerio.load(html);
  let concatenatedHtml = "";

  for (const sel of selectors) {
    if (!selectorPattern.test(sel)) {
      res.status(400).json({ error: "Invalid CSS selector." });
      return null;
    }

    const selectedContent = $(sel).html() || "";

    if (!selectedContent) {
      console.log({ error: `No content found for selector: '${sel}'` });
    }

    concatenatedHtml += selectedContent;
  }

  return concatenatedHtml;
};