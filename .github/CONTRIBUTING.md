# Contributing to PeekInsight-AI-Link-Preview-Browser-Extension

Thank you for considering contributing to PeekInsight! We welcome your ideas, contributions, and efforts to make this AI-powered browser extension even better.

## 1. Our Guiding Principles

As per the **SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)**, we adhere to the following core principles:

*   **Zero-Defect, High-Velocity, Future-Proof:** Aim for high-quality, robust code that can be delivered quickly and maintained long-term.
*   **FAANG-Level Standards:** Maintain exceptional code quality, rigorous testing, and comprehensive documentation.
*   **Managing the Unmanageable:** Strive for clarity, maintainability, and extensibility in all aspects of the project.
*   **Professional Archival:** Even retired or experimental code should be treated with dignity and clarity.

## 2. How to Contribute

We accept contributions in various forms:

*   **Reporting Bugs:** If you find a bug, please report it using the issue template. Provide clear steps to reproduce.
*   **Suggesting Features:** Have an idea for a new feature? Open an issue and describe your suggestion.
*   **Submitting Pull Requests:** The most direct way to contribute is by submitting code.

## 3. Development Workflow

Follow these steps to set up your development environment and submit changes:

### 3.1. Prerequisites

*   **Node.js:** Version 18 or higher recommended.
*   **npm/Yarn/pnpm:** A package manager.
*   **Browser:** Modern browser (Chrome, Firefox, Edge) for testing.

### 3.2. Setup

1.  **Fork the Repository:** Create your own fork of `https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension`.
2.  **Clone Your Fork:**
    bash
    git clone https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    cd PeekInsight-AI-Link-Preview-Browser-Extension
    
3.  **Set Upstream Remote:**
    bash
    git remote add upstream https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    
4.  **Install Dependencies:**
    bash
    npm install
    # or yarn install / pnpm install
    

### 3.3. Branching Strategy

*   Create a new branch for every feature or bug fix. Use a descriptive name (e.g., `feat/add-credibility-score`, `fix/incorrect-summary-length`).
*   Your branch name should follow the pattern: `<type>/<description>` where type is one of `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`.

### 3.4. Making Changes

*   **Coding Standards:** Adhere to the established linting and formatting rules. The project uses Ruff and Biome (if applicable to frontend aspects), or standard linters for Node.js/JavaScript. Run linters locally before committing.
*   **Testing:** Write comprehensive tests for your changes. Ensure all existing tests pass.
*   **Commit Messages:** Write clear and concise commit messages. Follow the Conventional Commits specification (e.g., `feat: Add AI summarization capability`).

### 3.5. Submitting a Pull Request

1.  **Ensure Your Branch is Up-to-Date:**
    bash
    git fetch upstream
    git rebase upstream/main
    
2.  **Run Tests and Linters:** Make sure everything passes.
3.  **Push Your Branch:**
    bash
    git push origin <your-branch-name>
    
4.  **Open a Pull Request:** Navigate to the repository on GitHub and open a pull request from your branch to `main`.
5.  **Describe Your Changes:** Provide a clear description of your PR, including the problem it solves and the approach taken.

## 4. Code of Conduct

This project adheres to a strict Code of Conduct. Please read and abide by it to ensure a welcoming and inclusive environment for everyone.

## 5. AI Agent Directives & Architectural Adherence

All contributions must align with the project's AI Agent Directives and architectural patterns as defined in `AGENTS.md` and `README.md`. This includes:

*   **Technology Stack:** Adherence to Node.js, JavaScript, HTML, CSS, and relevant AI APIs (e.g., Gemini API).
*   **Architectural Patterns:** Maintaining principles like DRY, SOLID, and modular design.
*   **Verification:** Ensuring changes integrate seamlessly with AI processing and browser extension functionalities.

## 6. Resources

*   **Repository:** [PeekInsight-AI-Link-Preview-Browser-Extension](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension)
*   **Issue Tracker:** [Issues](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/issues)

We look forward to your contributions!
