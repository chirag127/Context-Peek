/**
 * Utility functions for content extraction and processing
 */

/**
 * Extracts the main content from HTML
 * Focuses on article, main content areas and removes navigation, ads, etc.
 *
 * @param {string} html - The HTML content of the page
 * @returns {string} - The extracted main content
 */
function extractMainContent(html) {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Try to find the main content container
    // Priority: article > main > div with content-related class/id > body
    const mainSelectors = [
        "article",
        "main",
        ".content",
        "#content",
        ".post-content",
        ".article-content",
        ".entry-content",
        '[role="main"]',
    ];

    let mainContent = null;

    // Try each selector until we find content
    for (const selector of mainSelectors) {
        const element = doc.querySelector(selector);
        if (element && element.textContent.trim().length > 100) {
            mainContent = element;
            break;
        }
    }

    // If no main content found, use body
    if (!mainContent) {
        mainContent = doc.body;
    }

    // Remove unwanted elements
    const unwantedSelectors = [
        "nav",
        "header",
        "footer",
        "aside",
        ".sidebar",
        ".navigation",
        ".menu",
        ".ad",
        ".ads",
        ".advertisement",
        ".banner",
        ".comment",
        ".comments",
        "script",
        "style",
        "iframe",
        "noscript",
    ];

    unwantedSelectors.forEach((selector) => {
        const elements = mainContent.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
    });

    return mainContent.textContent.trim();
}

/**
 * Estimates reading time based on content length
 *
 * @param {string} content - The text content
 * @returns {string} - Estimated read time in minutes
 */
function estimateReadTime(content) {
    // Average reading speed: 200-250 words per minute
    const wordsPerMinute = 225;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} min`;
}

module.exports = {
    extractMainContent,
    estimateReadTime,
};
