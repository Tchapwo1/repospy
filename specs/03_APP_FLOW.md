# 🔄 Pillar 3: Application Flow & Execution Logic (APP_FLOW) — RepoSpy

## 1. End-to-End Execution Flow

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / User
    participant CLI as RepoSpy CLI
    participant Fetcher as Parallel Fetcher
    participant Parser as Heuristic Sniffer
    participant Gen as Prompt Synthesizer
    participant Disk as Local File Output

    Dev->>CLI: npx repospy https://linear.app
    Note over CLI: URL Validation & Protocol Check
    CLI->>Fetcher: Fetch HTML & Linked Script Bundles
    
    alt Target Unreachable / 404 / Blocked
        Fetcher-->>CLI: Network Timeout or Anti-Bot Challenge
        CLI-->>Dev: Display graceful error + fallback suggestion (--browser mode)
    else Successful Ingestion
        Fetcher-->>Parser: Raw HTML + CSS + JS Bundles
        
        par Parallel Analysis
            Parser->>Parser: Sniff Frameworks & UI Libraries
            Parser->>Parser: Deconstruct Design Tokens (Colors/Fonts/Radii)
            Parser->>Parser: Discover Public APIs & Third-Party SaaS
        end
        
        Parser-->>Gen: Aggregated Forensic Report Data
        Gen->>Disk: Write repospy-report.json
        Gen->>Disk: Write clone_prompt.md (Cursor-Ready)
        Gen-->>CLI: Render Cyber Terminal Cards
        CLI-->>Dev: Complete in 4.8s! Outputs prompt link
    end
```

---

## 2. Mandatory Error, Edge-Case & Fallback States

| Error Condition | Trigger Scenario | Automated CLI Response |
| :--- | :--- | :--- |
| **Invalid URL** | User inputs `linear` instead of `https://linear.app`. | Auto-prepends `https://` and tests connectivity before erroring. |
| **Cloudflare CAPTCHA / 403** | Target site enforces strict Cloudflare Bot Management. | Switches User-Agent to standard modern Chrome desktop; if still blocked, provides clear manual copy-paste instructions for the HTML. |
| **Single-Page App (SPA) Empty Root** | Target app renders purely via client-side JS with blank initial HTML. | Scans referenced script tags and webpack manifests directly to extract bundle identifiers and state stores. |
| **Timeout (>10s)** | Slow target server or massive 50MB bundle payload. | Gracefully halts further chunk downloads, operates on gathered primary assets, and flags `"Partial Scan Completed"`. |
