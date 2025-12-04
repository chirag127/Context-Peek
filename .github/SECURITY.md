# Security Policy for PeekInsight-AI-Link-Preview-Browser-Extension

As an Apex Technical Authority project, **PeekInsight-AI-Link-Preview-Browser-Extension** adheres to a **Zero-Trust, Proactive Security Posture** aligned with 2026 best practices. We prioritize the integrity of user data and the robustness of the extension against malicious input or compromised external services.

## 1. Supported Versions

This repository actively supports the latest stable release of the browser extension stack (Chromium/Firefox based) and the current major version of Node.js/TypeScript. Security patches are prioritized for the main branch.

| Version | Status | Security Support | 
| :--- | :--- | :--- |
| Latest Stable (vX.Y.Z) | Maintained | Immediate Patching | 
| Previous Major (vX.Y-1) | Supported | Monthly Patching | 
| Older Versions | Not Supported | None | 

## 2. Reporting a Security Vulnerability

We highly value community contributions to security. Please follow this process for responsible disclosure.

If you discover a security vulnerability, please **DO NOT** open a public issue immediately.

### Responsible Disclosure Steps

1.  **Isolate & Document:** Document the vulnerability with clear, minimal reproduction steps. **Do not** include sensitive data or large proof-of-concept files.
2.  **Private Email Contact:** Send a detailed report via email to the primary maintainer:
    *   **Email:** `security@chirag127.dev` (Note: This is a placeholder; users must use the established contact method)
3.  **Wait for Acknowledgment:** Wait for a confirmation receipt from the maintenance team, usually within 48 hours.
4.  **Coordinated Disclosure:** We will work with you to determine a public disclosure date after a fix has been implemented, tested, and deployed to a pre-release channel.

### Security Vulnerability Contact

*   **Primary Email:** `security@chirag127.dev`
*   **Alternative:** Encrypted message via GitHub `chirag127` profile if email fails.

## 3. Security Architecture Principles (Apex Mandates)

This project employs specific architectural constraints to mitigate common risks:

### A. Data Handling & Privacy

*   **No PII Collection:** The extension is designed to collect zero Personally Identifiable Information (PII). Data processed for link summarization is transient and handled via secure API gateways (Gemini).
*   **Content Security Policy (CSP):** Strict CSP headers are enforced within the extension's service worker and content scripts to prevent XSS attacks.
*   **API Key Management:** All secrets, including the Gemini API Key, are never hardcoded. They are managed via secure environment variables during the build process (via `.env.production` or CI/CD secrets) and are **never** exposed client-side or committed to the repository.

### B. Third-Party Dependencies

*   **Dependency Scanning:** Automated scanning using tools integrated into the CI/CD pipeline (`.github/workflows/ci.yml`) will run **Snyk** or **Dependabot** on every push to detect known CVEs in `package.json` dependencies.
*   **Vetting:** All new dependencies must pass a rigorous vetting process, ensuring they adhere to the MIT/ISC/Apache license standards and do not introduce excessive attack surface.

### C. Extension Integrity

*   **Code Signing:** Production builds are signed according to official Chromium/Mozilla standards.
*   **Immutable Build Artifacts:** The CI/CD pipeline ensures that the artifacts uploaded for release are built directly from verified source code, preventing supply chain injection.

## 4. Bug Bounty Program

We do not currently run a formal public bug bounty program. However, we recognize the value of vulnerability reports and will reward significant, previously unknown security issues with **lifetime premium access** or an equivalent tangible acknowledgment upon successful remediation and coordinated disclosure.