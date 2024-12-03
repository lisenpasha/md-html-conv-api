import { Request, Response } from "express";
import { fetchRemoteContent, isValidMarkdown, markdownToHtml } from "../utils/conversion";
import { validateInput } from "./helper";

export const convertMarkdownToHtml = async (req: Request, res: Response): Promise<void> => {
    const { content, url } = req.body;
  
    try {
      if (!validateInput(res, content, url)) return;
      
      const markdown = content || (await fetchRemoteContent(url, "markdown"));
      if (!isValidMarkdown(markdown)) {
          res.status(400).json({ error: "Invalid Markdown content." });
          return;
      }
      
      const html = markdownToHtml(markdown);
      res.status(200).json({ html });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };