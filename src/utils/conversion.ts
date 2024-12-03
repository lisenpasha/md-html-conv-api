import MarkdownIt from "markdown-it";
import validateHtml from "html-validator";
import axios from "axios";

// Helper: Generates a replace call for headings incrementally based on the desired output format (markdown or html)
const processHeadings = (content: string, type: "toMarkdown" | "toHtml"): string => {
  for (let i = 1; i <= 4; i++) {
    if (type === "toMarkdown") {
      const regex = new RegExp(`<h${i}>(.+?)</h${i}>`, "g");
      content = content.replace(regex, `${"#".repeat(i)} $1\n\n`);
    } else if (type === "toHtml") {
      const regex = new RegExp(`^${"#".repeat(i)} (.+)$`, "gm");
      content = content.replace(regex, `<h${i}>$1</h${i}>`);
    }
  }
  return content;
};

// Helper: Process Code Blocks
const processCodeBlocks = (content: string, type: "toMarkdown" | "toHtml"): string => {
  if (type === "toMarkdown") {
    // Convert <pre><code>...</code></pre> to ```bash ... ```
    return content.replace(/<pre><code.*?>([\s\S]+?)<\/code><\/pre>/gi, "```\n$1\n```");
  } else if (type === "toHtml") {
    // Convert ```bash ... ``` to <pre><code>...</code></pre>
    return content.replace(/```([\s\S]+?)```/g, "<pre><code>$1</code></pre>");
  }
  return content;
};



// Convert Markdown to HTML using regex
export const markdownToHtml = (markdown: string): string => {
  let html = markdown;

  // Convert Headings
  html = processHeadings(html, "toHtml");

  // Convert Code Blocks
  html = processCodeBlocks(html, "toHtml");

  // Convert Bold (**bold**)
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  
  // Convert Italic (*italic*)
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Convert Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

  // Convert Horizontal Rules
  html = html.replace(/^---$/gm, "<hr>");

  // Wrap remaining lines in <p>
  html = html.replace(/^(?!<(?:h1|h2|h3|strong|em|a|li|ul)>)(.+)$/gm, "<p>$1</p>");

  // Remove any newlines introduced between tags
  html = html.replace(/>\n</g, "><");

  return html.trim();
};

// Convert HTML to Markdown using regex
export const htmlToMarkdown = (html: string): string => {
  let markdown = html;

  // Convert Headings
  markdown = processHeadings(markdown, "toMarkdown");

  // Convert Code Blocks
  markdown = processCodeBlocks(markdown, "toMarkdown");

  // Bold
  markdown = markdown.replace(/<strong>(.+?)<\/strong>/g, "**$1**");
  // Italic
  markdown = markdown.replace(/<em>(.+?)<\/em>/g, "*$1*");

  // Convert Blockquotes
  markdown = markdown.replace(/<blockquote>(.+?)<\/blockquote>/gi, "> $1");

  // Convert Horizontal Rules
  markdown = markdown.replace(/<hr>/gi, "---");
  
  // Links
  markdown = markdown.replace(/<a href="(.+?)">(.+?)<\/a>/g, "[$2]($1)");
  // Lists
  markdown = markdown.replace(/<li>(.+?)<\/li>/g, "* $1");
  // Remove extra HTML tags
  markdown = markdown.replace(/<[^>]+>/g, "");

  return markdown.trim();
};

// Fetch remote content and validate format
export const fetchRemoteContent = async (url: string, expectedType: "html" | "markdown"): Promise<string> => {
  try {

    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      validateStatus: () => true // Allow all HTTP statuses to pass through
    });
    
    const content = response.data; // Get the response content
    if (expectedType === "html" && !isValidHtml(content)) {
      throw new Error("Content is not valid HTML.");
    }
    if (expectedType === "markdown" && !isValidMarkdown(content)) {
      throw new Error("Content is not valid Markdown.");
    }

    return content
  } catch (error:any) {
    throw new Error(`Error fetching content: ${error.message}`);
  }
};

// Check if content is valid Markdown
export const isValidMarkdown = (markdown: string): boolean => {
  try {
    const md = new MarkdownIt();
    md.render(markdown);
    return true;
  } catch {
    return false;
  }
};

// Check if content is valid HTML
export const isValidHtml = async (html: string): Promise<boolean> => {
  try {
    await validateHtml({ data: html });
    return true;
  } catch {
    return false;
  }
};
