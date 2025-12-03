# Contributing to PeekInsight-AI-Link-Preview-Browser-Extension

Thank you for considering contributing to PeekInsight! We aim to foster a collaborative environment where developers can help improve this AI-powered browser extension.

## 1. Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct, version 2.1. Please review the full [CODE_OF_CONDUCT.md](https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension/blob/main/CODE_OF_CONDUCT.md) to understand the expected behavior.

## 2. Prerequisites

Before you start contributing, ensure you have the following installed:

*   **Node.js:** Version 18.x or higher (for development and extension building).
*   **npm or Yarn:** Package manager for Node.js.
*   **Git:** For version control.

## 3. Getting Started

1.  **Fork the Repository:** Create your own fork of the `chirag127/PeekInsight-AI-Link-Preview-Browser-Extension` repository.
2.  **Clone Your Fork:** Clone your forked repository to your local machine:
    bash
    git clone https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    cd PeekInsight-AI-Link-Preview-Browser-Extension
    
3.  **Set Upstream Remote:** Add the original repository as an upstream remote:
    bash
    git remote add upstream https://github.com/chirag127/PeekInsight-AI-Link-Preview-Browser-Extension.git
    
4.  **Create a New Branch:** Start your work on a new branch:
    bash
    git checkout -b feature/your-feature-name
    

## 4. Development Workflow

### 4.1. Installation

Install project dependencies:

bash
npm install
# or
yarn install


### 4.2. Running the Extension Locally

Follow the browser-specific instructions for loading an unpacked extension. This typically involves:

1.  Building the extension (if applicable).
2.  Navigating to the browser's extension management page (e.g., `chrome://extensions/` for Chrome).
3.  Enabling 'Developer mode'.
4.  Clicking 'Load unpacked' and selecting the `dist` or `build` directory of your local project.

### 4.3. Linting and Formatting

We use Biome for fast linting and formatting.

*   **Check Code Quality:**
    bash
    npm run lint
    # or
    yarn lint
    
*   **Format Code:**
    bash
    npm run format
    # or
    yarn format
    

It's recommended to run these commands before committing your changes.

### 4.4. Testing

We use Vitest for unit tests and Playwright for end-to-end tests.

*   **Run Unit Tests:**
    bash
    npm run test:unit
    # or
    yarn test:unit
    
*   **Run End-to-End Tests:**
    bash
    npm run test:e2e
    # or
    yarn test:e2e
    

## 5. Making a Contribution

### 5.1. Types of Contributions

We welcome contributions in the form of bug fixes, new features, documentation improvements, and more. Common contribution types include:

*   **Bug Reports:** If you find a bug, please file an issue with a clear description and steps to reproduce.
*   **Feature Requests:** Suggest new features by opening an issue.
*   **Code Contributions:** Submit pull requests for bug fixes or new features.

### 5.2. Pull Request Process

1.  Ensure your code is linted and formatted (`npm run format`).
2.  Ensure all tests are passing (`npm run test:unit`, `npm run test:e2e`).
3.  Commit your changes with clear and concise messages.
4.  Push your branch to your fork:
    bash
    git push origin feature/your-feature-name
    
5.  Open a Pull Request against the `main` branch of the `chirag127/PeekInsight-AI-Link-Preview-Browser-Extension` repository.
6.  Your PR will be reviewed by the maintainers.

### 5.3. AI Agent Directives

This project adheres to the Apex Technical Authority's AI Agent Directives. Ensure your contributions align with the architectural principles outlined in `.github/AGENTS.md`.

## 6. Reporting Security Vulnerabilities

If you find a security vulnerability, please follow the instructions in `.github/SECURITY.md`.

## 7. Questions

If you have any questions, feel free to open an issue.

Thank you for helping to make PeekInsight better!