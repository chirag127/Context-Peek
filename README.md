# PeekInsight-AI-Link-Preview-Browser-Extension

![PeekInsight Hero Banner Placeholder](https://via.placeholder.com/1200x300/1E3A8A/FFFFFF?text=PeekInsight+-+AI-Powered+Link+Intelligence)

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/ci.yml?label=Build&style=flat-square)](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?label=Coverage&style=flat-square)](https://codecov.io/gh/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension)
[![Top Language](https://img.shields.io/github/languages/top/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?style=flat-square)](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension)
[![License](https://img.shields.io/github/license/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?style=flat-square)](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension)

<p align="center">
  <a href="https://stars.github.com/users/chirag127/" target="_blank">
    <img src="https://img.shields.io/badge/⭐-Star%20this%20Repo-blue?style=flat-square" alt="Star this Repo">
  </a>
</p>

---

## 💡 Blurb: The Value Proposition

**PeekInsight** is an advanced, AI-driven browser extension designed to eliminate context-switching by providing instant, intelligent link previews. Hover over any hyperlink to immediately receive concise, credible summaries and estimated reading times directly in your workflow.

## 🗺️ Architecture Overview

This extension adheres to a highly decoupled **Micro-Frontend/Service** architecture, separating the browser logic (DOM manipulation/UI) from the intensive AI processing (Node.js/Gemini API gateway).

mermaid
graph TD
    A[User Hover/Click] --> B{Browser Extension Layer (JS/HTML/CSS)};
    B -- Request URL/Content --> C[Background Service Worker];
    C -- API Call (HTTPS) --> D(Node.js/Serverless Gateway);
    D -- LLM Request --> E[Google Gemini API];
    E -- Structured JSON Response --> D;
    D -- Formatted Preview Data --> C;
    C -- Inject DOM Overlay --> B;
    B --> F[Intelligent Link Preview Display];

    subgraph Client Side
        B
        F
    end

    subgraph Server Side / AI Processing
        D
        E
    end


## 📑 Table of Contents

1.  [💡 Blurb: The Value Proposition](#-blurb-the-value-proposition)
2.  [🗺️ Architecture Overview](#-architecture-overview)
3.  [📑 Table of Contents](#-table-of-contents)
4.  [⚙️ Technical Stack (2026 Standard)](#-technical-stack-2026-standard)
5.  [🤖 AI Agent Directives](#-ai-agent-directives)
6.  [🚀 Getting Started](#-getting-started)
7.  [✅ Development Standards](#-development-standards)
8.  [📜 License](#-license)

## ⚙️ Technical Stack (2026 Standard)

This project utilizes modern, high-performance web technologies tailored for extensions and real-time API interaction.

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend/UI** | HTML5, Vanilla JavaScript (ES Modules) | Core extension logic, DOM injection, popup rendering. |
| **AI Backend** | Node.js (Serverless Target) | Securely proxying requests and managing Gemini API interactions. |
| **AI Engine** | Google Gemini API (Pro Model) | Summarization, entity extraction, and credibility scoring. |
| **Web Scraping** | Puppeteer/Playwright (Server-side dependency) | Fetching inaccessible content for deep analysis. |
| **Manifest** | Manifest V3 | Compatibility with modern browser security standards. |

## 🤖 AI Agent Directives

<details>
<summary>Click to view Apex Architecture & Verification Commands (Essential for Future Maintenance)</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs. Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript/JavaScript)**
    *   **Stack:** This project leverages **HTML/JS (Manifest V3)**. Key tools are **Vite 7** (for build tooling, if bundled), **Biome** (for linting/formatting standardization), and **Vitest/Playwright** (for testing).
    *   **Architecture:** Adheres to a **Feature-Sliced Design (FSD)** approach within the extension structure (Shared -> Entities -> Features -> App).
    *   **API Contracts:** All communication between the content script and background service worker MUST use structured messages adhering to TypeScript interfaces to ensure type safety across boundaries.

---

## 4. ARCHITECTURAL PRINCIPLES MANDATE
*   **SOLID Compliance:** Especially Dependency Inversion (D) for the AI Layer, ensuring the UI does not directly instantiate the Gemini client.
*   **DRY:** Logic for URL parsing and validation must be centralized.
*   **YAGNI:** Avoid feature creep; focus purely on high-quality link preview generation.

## 5. VERIFICATION AND BUILD
To ensure architectural integrity and deployment readiness, execute the following local verification sequence:

1.  **Format & Lint Check (Biome):**
    `npx @biomejs/biome check --apply .`
2.  **Unit Testing (Vitest - Mocked API Calls):**
    `npm test` (or equivalent script for Vitest execution)
3.  **Static Manifest Validation:**
    Manual check or tool to confirm Manifest V3 compliance.
4.  **E2E Test Execution (Playwright):**
    `npx playwright test` (Verify DOM injection succeeds across major sites like Wikipedia/Medium).

</details>

## 🚀 Getting Started

### Prerequisites

*   Node.js (LTS version, recommended 20+)
*   `npm` or `yarn` (Package Manager)
*   Google Gemini API Key (Required for server-side proxy testing)

### Installation

1.  **Clone the Repository:**
    bash
    git clone https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    cd PeekInsight-AI-Link-Preview-Browser-Extension
    

2.  **Install Dependencies:**
    *(Assuming standard npm setup based on extension development patterns)*
    bash
    npm install
    

3.  **Configure Environment Variables:**
    Create a `.env` file in the root to store your secure API key (used by the local proxy/testing environment).
    
    GEMINI_API_KEY="YOUR_SECRET_KEY_HERE"
    NODE_ENV=development
    

### Running Locally (Development Mode)

For testing the extension logic and UI:

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles and bundles the extension assets for deployment. |
| `npm run dev` | Starts a local server for component testing/hot reloading (if using Vite dev server). |
| `npm test` | Runs Vitest unit tests against core logic. |

To use it, load the `/dist` folder as an unpacked extension in Chrome/Firefox Developer Mode.

## ✅ Development Standards

We rigorously adhere to established architectural best practices:

*   **SOLID:** Especially the Dependency Inversion Principle (D) to decouple the UI from the specific AI provider.
*   **DRY (Don't Repeat Yourself):** URL fetching and parsing utilities are centralized in the `shared/utils` module.
*   **YAGNI (You Ain't Gonna Need It):** Features are implemented strictly against current requirements; future complexity is deferred until necessary.

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.

See the [LICENSE](LICENSE) file for full details.
