# PeekInsight: AI-Powered Link Preview Browser Extension

A cutting-edge browser extension developed with **TypeScript** and **Tauri v2**, leveraging **Gemini API** for intelligent link previews. PeekInsight delivers concise summaries, estimated read times, and credibility scores directly within your browsing experience, enhancing productivity without context switching.

## 🚀 Live Demo

**(Placeholder for Live Demo Link/GIF)**

## ✨ Features

*   **Instant Link Previews:** Hover over any link to see an intelligent preview.
*   **AI-Powered Summarization:** Get concise, context-aware summaries of web page content.
*   **Estimated Read Time:** Understand the content length at a glance.
*   **Credibility Scoring:** AI-driven assessment of source reliability.
*   **Seamless Integration:** Works across all major websites without disruption.
*   **Customizable Settings:** Tailor the preview experience to your preferences.

## 📊 Badges

[![Build Status](https://img.shields.io/github/actions/workflow/user/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/ci.yml?style=flat-square)](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension?style=flat-square)](https://codecov.io/github/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue?style=flat-square&logo=tauri)](https://tauri.app/)
[![Gemini API](https://img.shields.io/badge/Gemini%20API-Google-green?style=flat-square&logo=google-gemini)](https://ai.google.dev/models/gemini)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-orange?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.svg?style=flat-square)](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/stargazers)

## ⭐ Star ⭐ this Repo

Your support is invaluable! Please consider starring this repository if you find it useful.

## 🏗️ Architecture

mermaid
graph TD
    A[Browser Tab]
    B(PeekInsight Extension)
    C{Web Scraping Module}
    D{AI Analysis Module (Gemini API)}
    E{UI Rendering Module}
    F[Content Script]
    G[Background Script]

    A --> B
    B --> F
    F --> C
    C --> D
    D --> E
    E --> B
    B --> G

    subgraph Backend Services
        D
    end

    subgraph Extension Core
        B
        F
        G
    end

    subgraph Frontend Components
        C
        E
    end


## 📋 Table of Contents

*   [🚀 Live Demo](#-live-demo)
*   [✨ Features](#-features)
*   [📊 Badges](#-badges)
*   [⭐ Star ⭐ this Repo](#-star--this-repo)
*   [🏗️ Architecture](#-architecture)
*   [📋 Table of Contents](#-table-of-contents)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [🛠️ Development Setup](#-development-setup)
*   [⚙️ Scripts](#-scripts)
*   [⭐ Core Principles](#-core-principles)
*   [⚖️ License](#-license)
*   [🤝 Contributing](#-contributing)
*   [🐞 Bug Report](#-bug-report)
*   [🔒 Security](#-security)

---

## 🤖 AI Agent Directives

<details>
<summary>Expand to view AI Agent Directives</summary>

### 1. Identity & Prime Directive
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

### 2. Input Processing & Cognition
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs. Use `docfork` to verify *every* external API signature.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

### 3. Context-Aware Apex Tech Stacks (Late 2025 Standards)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript) - *Applies to this project.***
    *   **Stack:** This project leverages **TypeScript 6.x** with strict type checking enabled. It utilizes **Vite 7** (with Rolldown engine) for lightning-fast development builds and optimization, and **Tauri v2.x** for cross-platform desktop application packaging. For extension development, **WXT (Web Extension Tooling)** is the standard.
    *   **State Management:** Adopts standardized Signals for efficient and predictable UI updates.
    *   **UI Framework:** Tailwind CSS v4 for rapid, utility-first UI development.
    *   **Linting & Formatting:** **Biome** is used for its unparalleled speed in linting and formatting across JavaScript, TypeScript, and CSS.
    *   **Testing:** **Vitest** for lightning-fast unit and component tests, integrated seamlessly with Vite. **Playwright** for robust end-to-end (E2E) testing across major browsers.
    *   **Architecture:** Follows the **Feature-Sliced Design (FSD)** pattern for a scalable and maintainable frontend architecture.
    *   **AI Integration:** Deeply integrated with **Google Gemini API** (`gemini-3-pro` by default) for intelligent link preview generation, summarization, and credibility analysis. Prioritize modular design, clear API contracts, and robust error handling for all AI model interactions.

### 4. Apex Naming Convention
A high-performing name must instantly communicate **Product**, **Function**, **Platform**, and **Type**.
**Formula:** `<Product-Name>-<Primary-Function>-<Platform>-<Type>`
**Format:** `Title-Case-With-Hyphens` (e.g., `PeekInsight-AI-Link-Preview-Browser-Extension`)
**Rules:**
1.  **Length:** 3 to 10 words.
2.  **Keywords:** MUST include high-volume terms.
3.  **Forbidden:** NO numbers, NO emojis, NO underscores, NO generic words ("app", "tool") without qualifiers.

### 5. Professional Archival (The "Retired Product" Standard)
Archived repositories are **NOT** junk. They are "Retired Products." Even when archiving, you **MUST** elevate the metadata (Name, Description, Topics) to the highest professional standard. The tone must be dignified, historical, and valuable.

### 6. Dynamic URL & Badge Protocol
*   **Base URL:** `https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension`
*   **Badge URLs:** All Shields.io badges must point to this Base URL or its specific workflows (e.g., `/actions/workflows/ci.yml`).
*   **Consistency:** Never use the old/original repository name in links. Always use the new "Apex" name.

</details>

---

## 🛠️ Development Setup

This project is built using **TypeScript** with **Vite** for development and bundled with **Tauri v2** for cross-platform compatibility.

### Prerequisites

*   **Node.js:** Version 18+ recommended.
*   **npm:** Version 9+ recommended.
*   **Rust:** Version 1.70+ (for Tauri).
    *   Install Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
*   **Tauri CLI:** Install globally: `npm install -g @tauri-apps/cli`

### Installation

1.  **Clone the Repository:**
    bash
    git clone https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    cd PeekInsight-AI-Link-Preview-Browser-Extension
    

2.  **Install Dependencies:**
    bash
    npm install
    

3.  **Configure Environment Variables (if applicable):**
    Create a `.env` file in the root directory and add your API keys, e.g.:
    env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    

---

## ⚙️ Scripts

| Script        | Description                                                               |
| :------------ | :------------------------------------------------------------------------ |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR).     |
| `npm run build` | Builds the production-ready application for Tauri.                      |
| `npm run preview` | Locally previews the Vite production build.                               |
| `npm run lint`  | Runs Biome to check and fix code style and potential errors.              |
| `npm run test`  | Executes Vitest unit and component tests.                                 |
| `npm run test:e2e` | Runs Playwright end-to-end tests.                                       |
| `npm run tauri:dev` | Runs the Tauri application in development mode.                           |
| `npm run tauri:build` | Builds the Tauri application for release.                                 |

---

## ⭐ Core Principles

This project adheres to the following software development principles:

*   **SOLID:** Ensures maintainable and scalable object-oriented design.
*   **DRY (Don't Repeat Yourself):** Minimizes redundancy in code.
*   **YAGNI (You Ain't Gonna Need It):** Focuses on current requirements, avoiding unnecessary complexity.
*   **KISS (Keep It Simple, Stupid):** Favors straightforward solutions.

---

## ⚖️ License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license. See the `LICENSE` file for more details.

*   **Attribution:** You must give appropriate credit.
*   **NonCommercial:** You may not use the material for commercial purposes.

---

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/blob/main/.github/CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

---

## 🐞 Bug Report

If you encounter any bugs, please file a detailed bug report using our [Issue Template](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/issues/new?template=bug_report.md). Include steps to reproduce, expected vs. actual behavior, and relevant environment details.

---

## 🔒 Security

Security is paramount. Please refer to our [SECURITY.md](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/blob/main/.github/SECURITY.md) file for information on reporting security vulnerabilities.
