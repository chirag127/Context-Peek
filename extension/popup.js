/**
 * Context Peek - Popup Script
 * Handles popup UI and user settings
 */

// DOM elements
const enableToggle = document.getElementById('enableToggle');

// Initialize popup
document.addEventListener('DOMContentLoaded', initialize);

/**
 * Initialize the popup
 */
function initialize() {
  // Load saved settings
  loadSettings();
  
  // Add event listeners
  enableToggle.addEventListener('change', handleToggleChange);
}

/**
 * Load settings from storage
 */
function loadSettings() {
  chrome.storage.sync.get({ enabled: true }, (items) => {
    enableToggle.checked = items.enabled;
  });
}

/**
 * Handle toggle change
 */
function handleToggleChange() {
  const enabled = enableToggle.checked;
  
  // Save setting
  chrome.storage.sync.set({ enabled });
  
  // Notify content scripts about the change
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { 
        action: 'settingsChanged',
        settings: { enabled }
      });
    }
  });
}

// Add version info
const versionElement = document.createElement('div');
versionElement.className = 'footer';
versionElement.innerHTML = `<p>Version ${chrome.runtime.getManifest().version}</p>`;
document.body.appendChild(versionElement);
