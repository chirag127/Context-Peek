<div align="center">

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/main/.github/assets/banner-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/main/.github/assets/banner-light.png">
    <img alt="PeekInsight Banner" src="https://raw.githubusercontent.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/main/.github/assets/banner-light.png">
  </picture>

  <br/>

  <div>
    <a href="https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/actions/workflows/ci.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/ci.yml?branch=main&style=flat-square" alt="Build Status">
    </a>
    <a href="https://codecov.io/gh/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension">
      <img src="https://img.shields.io/codecov/c/github/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?style=flat-square" alt="Code Coverage">
    </a>
    <img src="https://img.shields.io/badge/tech-TypeScript%20%7C%20Vite%20%7C%20WXT-blue?style=flat-square" alt="Tech Stack">
    <a href="https://biomejs.dev">
      <img src="https://img.shields.io/badge/lint-Biome-blueviolet?style=flat-square" alt="Linting & Formatting">
    </a>
    <a href="https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square" alt="License">
    </a>
    <a href="https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/stargazers">
      <img src="https://img.shields.io/github/stars/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?style=flat-square&logo=github" alt="GitHub Stars">
    </a>
  </div>

  <a href="https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/stargazers">
    <img src="https://img.shields.io/badge/star%20this%20repo-%E2%98%85-yellow?style=flat-square" alt="Star this repo">
  </a>

</div>

# PeekInsight: AI-Powered Link Preview Browser Extension

PeekInsight is an AI-powered browser extension that provides instant, intelligent link previews on hover. Get concise AI-generated summaries, estimated read times, and credibility scores without ever leaving your current page, dramatically accelerating research and browsing.

Stop wasting time clicking through countless tabs. PeekInsight delivers the context you need, right when you need it, transforming how you navigate the web and consume information.

## ✨ Core Features

*   **🤖 AI-Powered Summaries:** Instantly understand the core message of any linked article, powered by the Google Gemini API.
*   **⏱️ Estimated Read Time:** Quickly gauge the time commitment required for any piece of content.
*   **🛡️ Credibility Score:** (Coming Soon) Heuristic-based analysis to flag potential misinformation or low-quality sources.
*   **🚀 Zero-Context Switching:** Preview links without opening new tabs, keeping your workflow focused and efficient.
*   **🎨 Non-Intrusive UI:** A clean, modern tooltip that appears on hover and disappears when you're done.
*   **🌐 Universal Compatibility:** Works on most websites, from news articles and blogs to academic papers.

## 🏛️ Architectural Overview

This project follows the **Feature-Sliced Design (FSD)** methodology, ensuring a scalable, maintainable, and decoupled codebase. The architecture promotes a clear separation of concerns, making it easy to develop, test, and manage individual features.

sh
src/
├── app/                 # Global styles, providers, and app-level logic
├── pages/               # Entry points for extension UI (e.g., popup, options)
│   └── popup/
├── widgets/             # Compositional UI blocks (e.g., the complete preview card)
│   └── link-preview-card/
├── features/            # Business logic features
│   ├── summarize-link/  # AI summarization logic
│   └── get-read-time/   # Reading time calculation
├── entities/            # Business entities and their components
│   └── link/
├── shared/              # Reusable, framework-agnostic modules
│   ├── api/             # API clients (e.g., gemini-client.ts)
│   ├── ui/              # Primitive UI components (buttons, spinners, etc.)
│   └── lib/             # Utility functions
└── entrypoints/         # Browser extension manifest entry points
    ├── background.ts    # Service worker / background script
    ├── content.ts       # Content script injected into pages
    └── popup.html       # The main popup UI file


---

## 📖 Table of Contents

- [✨ Core Features](#-core-features)
- [🏛️ Architectural Overview](#️-architectural-overview)
- [🤖 AI Agent Directives](#-ai-agent-directives)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [🛠️ Development Standards](#️-development-standards)
  - [Available Scripts](#available-scripts)
  - [Core Principles](#core-principles)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🤖 AI Agent Directives

<details>
<summary><strong>click to expand:</strong> System & Agent Protocol (December 2025 Standard)</summary>

### SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

#### 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

#### 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat this `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

#### 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**. This repository, `PeekInsight-AI-Link-Preview-Browser-Extension`, is a modern TypeScript-based browser extension.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript)**
    *   **Stack:** This project leverages **TypeScript 6.x (Strict Mode)** for robust type safety. It uses **WXT (Web Extension Toolkit)**, a Vite-powered framework that simplifies cross-browser development (Chrome, Firefox, Edge) and provides modern features like HMR.
    *   **Architecture:** Adheres to **Feature-Sliced Design (FSD)**, promoting a highly modular and scalable structure. This is critical for managing the complexity of content scripts, background services, and UI components.
    *   **AI Integration:** Deeply integrated with the **Google Gemini API** (`gemini-3-pro` by default) for all summarization and analysis tasks. Communication is handled securely through the background service worker to protect API keys and manage requests.
    *   **Linting & Formatting:** **Biome** is the single, unified tool for linting, formatting, and import sorting, ensuring maximum performance and code consistency.
    *   **Testing:**
        *   **Unit/Integration:** **Vitest** for fast, in-source testing of individual components and features.
        *   **End-to-End (E2E):** **Playwright** for comprehensive, browser-level testing of the extension's behavior in a real-world environment.

*   **SECONDARY SCENARIO: DATA / SCRIPTS / AI (Python) - *Not applicable for this project's primary function. Reference only for potential future data analysis scripts.***
    *   **Stack:** **Python 3.10+** with **uv** (package management), **Ruff** (linting), and **Pytest** (testing).

</details>

## 🚀 Getting Started

Follow these instructions to get the development environment up and running on your local machine.

### Prerequisites

*   **Node.js**: `v20.x` or higher
*   **pnpm**: `v9.x` or higher

### Installation & Setup

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    cd PeekInsight-AI-Link-Preview-Browser-Extension
    

2.  **Install dependencies:**
    bash
    pnpm install
    

3.  **Create environment file:**
    Copy the example environment file and add your Google Gemini API key.
    bash
    cp .env.example .env
    
    Then edit `.env`:
    
    VITE_GEMINI_API_KEY="YOUR_API_KEY_HERE"
    

4.  **Run the development server:**
    This will start a Vite-based dev server with Hot Module Replacement (HMR).
    bash
    pnpm dev
    

5.  **Load the extension in your browser:**
    *   **Chrome/Edge:** Navigate to `chrome://extensions`, enable "Developer mode", click "Load unpacked", and select the `dist/` directory.
    *   **Firefox:** Navigate to `about:debugging`, click "This Firefox", click "Load Temporary Add-on...", and select the `dist/manifest.json` file.

## 🛠️ Development Standards

### Available Scripts

This project uses `pnpm` as the package manager. Key scripts are defined in `package.json`:

| Command          | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `pnpm dev`       | Starts the development server with HMR for immediate feedback.              |
| `pnpm build`     | Compiles and bundles the extension for production into the `/dist` folder.  |
| `pnpm test`      | Runs unit and integration tests using Vitest.                               |
| `pnpm test:e2e`  | Runs end-to-end tests using Playwright.                                     |
| `pnpm lint`      | Lints and formats the entire codebase using Biome.                          |
| `pnpm lint:check`| Checks for linting and formatting errors without applying changes (for CI). |

### Core Principles

*   **SOLID:** Code is structured to be understandable, flexible, and maintainable.
*   **DRY (Don't Repeat Yourself):** Reusable logic is abstracted into shared modules.
*   **YAGNI (You Ain't Gonna Need It):** Features are built as they are required, avoiding premature optimization.

## 🤝 Contributing

Contributions are welcome! Please read our [**Contributing Guidelines**](.github/CONTRIBUTING.md) to get started. We use GitHub Issues for bug reports and feature requests.

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License** - see the [LICENSE](LICENSE) file for details.
