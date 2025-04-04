/**
 * Context Peek - Background Script
 * Handles URL fetching, content extraction, and API communication
 */

// Configuration
const CONFIG = {
    backendUrl: "http://localhost:3000/analyze",
    cacheExpiration: 30 * 60 * 1000, // 30 minutes in milliseconds
    fetchTimeout: 10000, // 10 seconds timeout for fetching URLs
    maxContentLength: 50000, // Maximum content length to send to API
};

// State
let isEnabled = true; // Extension enabled by default

// Cache for storing previews
const previewCache = {};

// Load settings when extension starts
chrome.storage.sync.get({ enabled: true }, (items) => {
    isEnabled = items.enabled;
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.enabled) {
        isEnabled = changes.enabled.newValue;
    }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getPreview") {
        // Check if extension is enabled
        if (!isEnabled) {
            sendResponse({ success: false, error: "Extension is disabled" });
            return true;
        }

        getPreview(message.url)
            .then((data) => {
                sendResponse({ success: true, data });
            })
            .catch((error) => {
                console.error("Error getting preview:", error);
                sendResponse({ success: false, error: error.message });
            });

        // Return true to indicate we'll respond asynchronously
        return true;
    }
});

/**
 * Get preview for a URL
 * @param {string} url - The URL to get a preview for
 * @returns {Promise<Object>} - Preview data
 */
async function getPreview(url) {
    // Check cache first
    const cachedPreview = getCachedPreview(url);
    if (cachedPreview) {
        return cachedPreview;
    }

    try {
        // Fetch and extract content
        const content = await fetchAndExtractContent(url);

        // Send to backend API
        const previewData = await getPreviewFromBackend(url, content);

        // Cache the result
        cachePreview(url, previewData);

        return previewData;
    } catch (error) {
        console.error("Error in getPreview:", error);
        throw new Error("Failed to generate preview");
    }
}

/**
 * Fetch a URL and extract its main content
 * @param {string} url - The URL to fetch
 * @returns {Promise<string>} - Extracted content
 */
async function fetchAndExtractContent(url) {
    try {
        // Fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () => controller.abort(),
            CONFIG.fetchTimeout
        );

        const response = await fetch(url, {
            signal: controller.signal,
            credentials: "omit", // Don't send cookies for security
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch URL: ${response.status} ${response.statusText}`
            );
        }

        const html = await response.text();

        // Extract main content
        return extractMainContent(html);
    } catch (error) {
        console.error("Error fetching URL:", error);
        throw new Error("Failed to fetch page content");
    }
}

/**
 * Extract main content from HTML
 * @param {string} html - HTML content
 * @returns {string} - Extracted main content
 */
function extractMainContent(html) {
    // In background script, we can't use DOMParser directly
    // Instead, we'll use a simple regex-based approach to extract content

    // Remove script and style tags and their content
    let content = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
    );
    content = content.replace(
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        ""
    );

    // Try to find main content areas
    let mainContent = "";

    // Try to extract content from article or main tags
    const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const contentDivMatch = content.match(
        /<div[^>]*class=["'].*?(?:content|article)["'][^>]*>([\s\S]*?)<\/div>/i
    );

    if (articleMatch) {
        mainContent = articleMatch[1];
    } else if (mainMatch) {
        mainContent = mainMatch[1];
    } else if (contentDivMatch) {
        mainContent = contentDivMatch[1];
    } else {
        // Extract content from body if no specific content area found
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
            mainContent = bodyMatch[1];
        } else {
            mainContent = content;
        }
    }

    // Remove all HTML tags
    mainContent = mainContent.replace(/<[^>]*>/g, " ");

    // Remove extra whitespace
    mainContent = mainContent.replace(/\s+/g, " ").trim();

    // Decode HTML entities
    mainContent = decodeHTMLEntities(mainContent);

    // Limit content length
    if (mainContent.length > CONFIG.maxContentLength) {
        mainContent = mainContent.substring(0, CONFIG.maxContentLength);
    }

    return mainContent;
}

/**
 * Decode HTML entities in a string
 * @param {string} html - String with HTML entities
 * @returns {string} - Decoded string
 */
function decodeHTMLEntities(html) {
    // Simple entity decoding for common entities
    return html
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, " ");
}

/**
 * Get preview from backend API
 * @param {string} url - The URL being previewed
 * @param {string} content - The extracted content
 * @returns {Promise<Object>} - Preview data
 */
async function getPreviewFromBackend(url, content) {
    try {
        const response = await fetch(CONFIG.backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, content }),
        });

        if (!response.ok) {
            throw new Error(
                `Backend API error: ${response.status} ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error calling backend API:", error);
        throw new Error("Failed to generate preview from backend");
    }
}

/**
 * Get cached preview if available and not expired
 * @param {string} url - The URL
 * @returns {Object|null} - Cached preview or null
 */
function getCachedPreview(url) {
    const cached = previewCache[url];
    if (cached && Date.now() - cached.timestamp < CONFIG.cacheExpiration) {
        return cached.data;
    }
    return null;
}

/**
 * Cache a preview
 * @param {string} url - The URL
 * @param {Object} data - Preview data
 */
function cachePreview(url, data) {
    previewCache[url] = {
        data,
        timestamp: Date.now(),
    };
}

// Log when the background script loads
console.log("Context Peek background script loaded");
