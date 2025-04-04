/**
 * Context Peek - Popup Script
 * Handles popup UI and user settings
 */

// DOM elements
const enableToggle = document.getElementById("enableToggle");
const speechSettingsHeader = document.getElementById("speechSettingsHeader");
const speechSettingsContent = document.getElementById("speechSettingsContent");
const speechRateInput = document.getElementById("speechRate");
const speechRateValue = document.getElementById("speechRateValue");
const speechPitchInput = document.getElementById("speechPitch");
const speechPitchValue = document.getElementById("speechPitchValue");
const speechVoiceSelect = document.getElementById("speechVoice");
const testSpeechButton = document.getElementById("testSpeech");
const saveSpeechSettingsButton = document.getElementById("saveSpeechSettings");

// Default speech settings
const defaultSpeechSettings = {
    rate: 1,
    pitch: 1,
    voice: "",
};

// Available voices
let availableVoices = [];

// Initialize popup
document.addEventListener("DOMContentLoaded", initialize);

/**
 * Initialize the popup
 */
function initialize() {
    // Load saved settings
    loadSettings();

    // Initialize speech synthesis
    initSpeechSynthesis();

    // Add event listeners
    enableToggle.addEventListener("change", handleToggleChange);
    speechSettingsHeader.addEventListener("click", toggleSpeechSettings);
    speechRateInput.addEventListener("input", updateSpeechRateValue);
    speechPitchInput.addEventListener("input", updateSpeechPitchValue);
    testSpeechButton.addEventListener("click", testSpeech);
    saveSpeechSettingsButton.addEventListener("click", saveSpeechSettings);
}

/**
 * Load settings from storage
 */
function loadSettings() {
    chrome.storage.sync.get(
        {
            enabled: true,
            speechSettings: defaultSpeechSettings,
        },
        (items) => {
            // Set enabled toggle
            enableToggle.checked = items.enabled;

            // Set speech settings
            const speechSettings = items.speechSettings;
            speechRateInput.value = speechSettings.rate;
            speechPitchInput.value = speechSettings.pitch;
            updateSpeechRateValue();
            updateSpeechPitchValue();

            // Voice will be set after voices are loaded
            window.savedVoice = speechSettings.voice;
        }
    );
}

/**
 * Initialize speech synthesis and populate voice options
 */
function initSpeechSynthesis() {
    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
        console.error("Speech synthesis not supported");
        return;
    }

    // Get available voices
    function loadVoices() {
        availableVoices = window.speechSynthesis.getVoices();

        // Clear existing options
        while (speechVoiceSelect.options.length > 1) {
            speechVoiceSelect.options.remove(1);
        }

        // Add voice options
        availableVoices.forEach((voice) => {
            const option = document.createElement("option");
            option.value = voice.voiceURI;
            option.textContent = `${voice.name} (${voice.lang})`;
            speechVoiceSelect.appendChild(option);

            // Select saved voice if available
            if (window.savedVoice && voice.voiceURI === window.savedVoice) {
                option.selected = true;
            }
        });
    }

    // Load voices when available
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Initial load of voices
    loadVoices();
}

/**
 * Toggle speech settings panel
 */
function toggleSpeechSettings() {
    speechSettingsHeader.classList.toggle("active");
    speechSettingsContent.classList.toggle("active");
}

/**
 * Update speech rate value display
 */
function updateSpeechRateValue() {
    speechRateValue.textContent = `${speechRateInput.value}x`;
}

/**
 * Update speech pitch value display
 */
function updateSpeechPitchValue() {
    speechPitchValue.textContent = speechPitchInput.value;
}

/**
 * Test speech with current settings
 */
function testSpeech() {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create test utterance
    const utterance = new SpeechSynthesisUtterance(
        "This is a test of the Context Peek speech settings."
    );

    // Apply current settings
    utterance.rate = parseFloat(speechRateInput.value);
    utterance.pitch = parseFloat(speechPitchInput.value);

    // Set voice if selected
    if (speechVoiceSelect.value) {
        const selectedVoice = availableVoices.find(
            (voice) => voice.voiceURI === speechVoiceSelect.value
        );
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
    }

    // Speak the test text
    window.speechSynthesis.speak(utterance);
}

/**
 * Save speech settings
 */
function saveSpeechSettings() {
    const speechSettings = {
        rate: parseFloat(speechRateInput.value),
        pitch: parseFloat(speechPitchInput.value),
        voice: speechVoiceSelect.value,
    };

    // Save to storage
    chrome.storage.sync.set({ speechSettings }, () => {
        // Notify content scripts about the change
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "speechSettingsChanged",
                    settings: speechSettings,
                });
            }
        });

        // Show saved confirmation
        const saveButton = document.getElementById("saveSpeechSettings");
        const originalText = saveButton.textContent;
        saveButton.textContent = "Saved!";
        setTimeout(() => {
            saveButton.textContent = originalText;
        }, 1500);
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
                action: "settingsChanged",
                settings: { enabled },
            });
        }
    });
}

// Add version info
const versionElement = document.createElement("div");
versionElement.className = "footer";
versionElement.innerHTML = `<p>Version ${
    chrome.runtime.getManifest().version
}</p>`;
document.body.appendChild(versionElement);
