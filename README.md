# 🔍 Context Peek – Inline Link Preview with AI

<https://chirag127.github.io/Context-Peek/>

**Context Peek** is a browser extension that provides instant AI-powered link previews when hovering over hyperlinks. It scrapes the content of the linked page in the background and sends it to a backend API, which returns:

-   📝 A concise summary
-   ⏱ An estimated read time
-   🛡 A credibility score (based on bias, tone, and source trust)

Built for researchers, journalists, and information seekers, Context Peek adds context without leaving the page.

## 🧩 Features

-   **Instant Previews**: Hover over a link to see what's on the other side without clicking
-   **AI-Powered Summaries**: Get the gist of articles in 2-3 sentences
-   **Read Time Estimates**: Know how long an article will take to read
-   **Credibility Scoring**: Quickly assess the reliability of content
-   **Lightweight**: Minimal impact on browsing performance

## 🚀 Installation

### Backend Setup

1. Navigate to the backend directory:

    ```
    cd backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file based on `.env.example`:

    ```
    cp .env.example .env
    ```

4. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and add it to your `.env` file.

5. Start the backend server:
    ```
    npm start
    ```

### Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top-right corner)
3. Click "Load unpacked" and select the `extension` directory
4. The Context Peek extension should now be installed and active

## 🧑‍💻 Project Structure

```
project-root/
├── extension/          # Chrome extension code
│   ├── content.js      # Handles link hover detection and tooltip display
│   ├── background.js   # Fetches and processes link content
│   ├── popup.html     # Extension popup UI
│   ├── popup.js       # Popup functionality
│   ├── tooltip.css    # Tooltip styling
│   └── manifest.json   # Extension configuration
└── backend/           # Node.js Express backend with Gemini integration
    ├── index.js       # Main server file
    ├── scrape.js      # Content extraction utilities
    └── .env           # Environment variables (API keys, etc.)
```

## 🛠️ Development

### Backend

For development with auto-reload:

```
cd backend
npm run dev
```

### Extension

After making changes to the extension:

1. Go to `chrome://extensions/`
2. Find Context Peek and click the refresh icon
3. Reload any open tabs to apply the changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by [Chirag Singhal](https://github.com/chirag127)
