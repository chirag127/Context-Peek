/**
 * Context Peek - Content Script
 * Handles link hover detection and tooltip display
 */

// Configuration
const CONFIG = {
    hoverDelay: 500, // ms to wait before triggering preview
    tooltipOffset: 10, // px offset from the cursor
    minTooltipWidth: 300, // px
    maxTooltipWidth: 350, // px
    minDisplayTime: 300, // ms minimum time to show loading state
};

// State
let tooltipElement = null;
let currentLink = null;
let hoverTimer = null;
let isTooltipVisible = false;
let lastFetchedUrl = null;
let cachedPreviews = {};
let isEnabled = true; // Extension enabled by default
let isMouseOverTooltip = false; // Track if mouse is over tooltip

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initialize);

/**
 * Initialize the content script
 */
function initialize() {
    // Load settings
    loadSettings();

    // Create tooltip element
    createTooltipElement();

    // Add event listeners to all links
    addLinkEventListeners();

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(handleBackgroundMessages);
}

/**
 * Load settings from storage
 */
function loadSettings() {
    chrome.storage.sync.get({ enabled: true }, (items) => {
        isEnabled = items.enabled;
    });
}

/**
 * Create the tooltip element and add it to the DOM
 */
function createTooltipElement() {
    tooltipElement = document.createElement("div");
    tooltipElement.className = "context-peek-tooltip";
    tooltipElement.innerHTML = `
    <div class="context-peek-tooltip-header">
      <span class="context-peek-tooltip-title">Context Peek</span>
      <span class="context-peek-tooltip-close">×</span>
    </div>
    <div class="context-peek-tooltip-content"></div>
  `;

    // Add close button event listener
    tooltipElement
        .querySelector(".context-peek-tooltip-close")
        .addEventListener("click", hideTooltip);

    // Add mouse enter/leave events to the tooltip itself
    tooltipElement.addEventListener("mouseenter", () => {
        isMouseOverTooltip = true;
    });

    tooltipElement.addEventListener("mouseleave", () => {
        isMouseOverTooltip = false;
        // Hide tooltip after leaving it
        setTimeout(hideTooltip, 100);
    });

    // Add tooltip to the DOM
    document.body.appendChild(tooltipElement);
}

/**
 * Add event listeners to all links on the page
 */
function addLinkEventListeners() {
    // Initial link setup
    setupLinkListeners(document.querySelectorAll("a[href]"));

    // Use MutationObserver to detect new links added to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                const newLinks = [];
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === "A" && node.hasAttribute("href")) {
                            newLinks.push(node);
                        } else {
                            node.querySelectorAll("a[href]").forEach((link) =>
                                newLinks.push(link)
                            );
                        }
                    }
                });
                if (newLinks.length > 0) {
                    setupLinkListeners(newLinks);
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Set up event listeners for a collection of links
 * @param {NodeList|Array} links - Collection of link elements
 */
function setupLinkListeners(links) {
    links.forEach((link) => {
        // Skip links that already have listeners
        if (link.dataset.contextPeekInitialized) return;

        // Mark as initialized
        link.dataset.contextPeekInitialized = "true";

        // Add event listeners
        link.addEventListener("mouseenter", handleLinkMouseEnter);
        link.addEventListener("mouseleave", handleLinkMouseLeave);
        link.addEventListener("mousemove", handleLinkMouseMove);
    });
}

/**
 * Handle mouse enter event on links
 * @param {MouseEvent} event - Mouse event
 */
function handleLinkMouseEnter(event) {
    // Skip if extension is disabled
    if (!isEnabled) return;

    const link = event.target.closest("a");
    if (!link || !link.href) return;

    // Clear any existing timer
    clearTimeout(hoverTimer);

    // Set current link
    currentLink = link;

    // Start timer for hover delay
    hoverTimer = setTimeout(() => {
        // Check if we're still hovering the same link
        if (currentLink === link) {
            showTooltipForLink(link);
        }
    }, CONFIG.hoverDelay);
}

/**
 * Handle mouse leave event on links
 */
function handleLinkMouseLeave() {
    // Clear hover timer
    clearTimeout(hoverTimer);
    currentLink = null;

    // Hide tooltip with a small delay to allow moving to the tooltip
    setTimeout(() => {
        if (!currentLink && !isMouseOverTooltip) {
            hideTooltip();
        }
    }, 100);
}

/**
 * Handle mouse move event on links to position tooltip
 * @param {MouseEvent} event - Mouse event
 */
function handleLinkMouseMove(event) {
    if (isTooltipVisible && currentLink) {
        positionTooltip(event);
    }
}

/**
 * Show tooltip for a specific link
 * @param {HTMLAnchorElement} link - The link element
 */
function showTooltipForLink(link) {
    const url = link.href;

    // Skip invalid URLs or same-page anchors
    if (
        !url ||
        url.startsWith("javascript:") ||
        url === window.location.href ||
        url.startsWith("#")
    ) {
        return;
    }

    // Position tooltip near the link
    positionTooltip({ target: link });

    // Show tooltip with loading state
    showTooltip();
    setTooltipContent(getLoadingContent());

    // Check if we have a cached preview
    if (cachedPreviews[url]) {
        // Still show loading for a minimum time to avoid flickering
        setTimeout(() => {
            setTooltipContent(getPreviewContent(cachedPreviews[url]));
        }, CONFIG.minDisplayTime);
        return;
    }

    // Request preview from background script
    lastFetchedUrl = url;
    chrome.runtime.sendMessage({ action: "getPreview", url }, (response) => {
        // Check if we're still showing the tooltip for the same URL
        if (lastFetchedUrl !== url) return;

        if (response && response.success) {
            // Cache the preview
            cachedPreviews[url] = response.data;

            // Update tooltip content
            setTooltipContent(getPreviewContent(response.data));
        } else {
            // Show error
            setTooltipContent(
                getErrorContent(response?.error || "Failed to load preview")
            );
        }
    });
}

/**
 * Show the tooltip
 */
function showTooltip() {
    tooltipElement.classList.add("visible");
    isTooltipVisible = true;
}

/**
 * Hide the tooltip
 */
function hideTooltip() {
    tooltipElement.classList.remove("visible");
    isTooltipVisible = false;
    lastFetchedUrl = null;
}

/**
 * Position the tooltip near the target element or mouse event
 * @param {MouseEvent|Object} event - Mouse event or object with target property
 */
function positionTooltip(event) {
    const link = event.target.closest("a");
    if (!link) return;

    const linkRect = link.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    // Default position below the link
    let top = linkRect.bottom + CONFIG.tooltipOffset;
    let left = linkRect.left;

    // Check if tooltip would go off the bottom of the viewport
    if (top + tooltipRect.height > window.innerHeight) {
        // Position above the link instead
        top = linkRect.top - tooltipRect.height - CONFIG.tooltipOffset;
    }

    // Check if tooltip would go off the right of the viewport
    if (left + tooltipRect.width > window.innerWidth) {
        // Align right edge with viewport
        left = window.innerWidth - tooltipRect.width - CONFIG.tooltipOffset;
    }

    // Ensure tooltip doesn't go off the left of the viewport
    left = Math.max(CONFIG.tooltipOffset, left);

    // Apply position
    tooltipElement.style.top = `${top + window.scrollY}px`;
    tooltipElement.style.left = `${left}px`;
}

/**
 * Set the content of the tooltip
 * @param {string} html - HTML content
 */
function setTooltipContent(html) {
    const contentElement = tooltipElement.querySelector(
        ".context-peek-tooltip-content"
    );
    contentElement.innerHTML = html;

    // Add event listener to speak button if it exists
    const speakButton = tooltipElement.querySelector(
        ".context-peek-tooltip-speak"
    );
    if (speakButton) {
        speakButton.addEventListener("click", handleSpeakButtonClick);
    }
}

/**
 * Handle speak button click
 */
function handleSpeakButtonClick() {
    // Get the summary text
    const summaryElement = tooltipElement.querySelector(
        ".context-peek-tooltip-summary"
    );
    if (summaryElement && summaryElement.textContent) {
        // Use the Web Speech API to read the text aloud
        const utterance = new SpeechSynthesisUtterance(
            summaryElement.textContent.trim()
        );
        window.speechSynthesis.speak(utterance);
    }
}

/**
 * Get loading content HTML
 * @returns {string} HTML for loading state
 */
function getLoadingContent() {
    return `
    <div class="context-peek-tooltip-loading">
      <div class="context-peek-tooltip-spinner"></div>
    </div>
  `;
}

/**
 * Get error content HTML
 * @param {string} message - Error message
 * @returns {string} HTML for error state
 */
function getErrorContent(message) {
    return `
    <div class="context-peek-tooltip-error">
      ${message}
    </div>
  `;
}

/**
 * Get preview content HTML
 * @param {Object} data - Preview data
 * @param {string} data.summary - Summary text
 * @param {string} data.readTime - Read time
 * @param {number} data.credibilityScore - Credibility score
 * @returns {string} HTML for preview content
 */
function getPreviewContent(data) {
    // Determine score class
    let scoreClass = "score-medium";
    if (data.credibilityScore >= 80) {
        scoreClass = "score-high";
    } else if (data.credibilityScore < 50) {
        scoreClass = "score-low";
    }

    return `
    <div class="context-peek-tooltip-summary">
      ${data.summary}
    </div>
    <div class="context-peek-tooltip-actions">
      <button class="context-peek-tooltip-speak" title="Read aloud">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      </button>
    </div>
    <div class="context-peek-tooltip-footer">
      <div class="context-peek-tooltip-readtime">
        ${data.readTime}
      </div>
      <div class="context-peek-tooltip-score ${scoreClass}">
        Score: ${data.credibilityScore}/100
      </div>
    </div>
  `;
}

/**
 * Handle messages from the background script
 * @param {Object} message - Message object
 * @param {Object} sender - Sender information
 * @param {Function} sendResponse - Function to send response
 */
function handleBackgroundMessages(message, sender, sendResponse) {
    if (message.action === "previewReady" && message.url === lastFetchedUrl) {
        cachedPreviews[message.url] = message.data;
        setTooltipContent(getPreviewContent(message.data));
    } else if (message.action === "settingsChanged") {
        // Update enabled state
        isEnabled = message.settings.enabled;

        // If disabled, hide any visible tooltip
        if (!isEnabled && isTooltipVisible) {
            hideTooltip();
        }
    }
    return true; // Keep the message channel open for async responses
}

// Initialize immediately if document is already loaded
if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
) {
    initialize();
}
