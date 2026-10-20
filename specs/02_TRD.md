# 🛠️ Pillar 2: Technical Requirements Document (TRD) — RepoSpy

## 1. System Architecture & Tech Stack

RepoSpy is built as an ultra-fast, zero-dependency-friction Node.js CLI tool with an optional standalone web dashboard.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            REPOSPY RUNTIME ARCHITECTURE                     │
│                                                                             │
│  CLI Command: npx repospy <target-url>                                      │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     URL NORMALIZER & FETCH ENGINE                     │  │
│  │   • Validates URL protocol & handles HTTP/HTTPS redirects             │  │
│  │   • User-Agent spoofing (Bypasses naive anti-bot blocks)             │  │
│  │   • Parallel chunk fetcher with 10s strict timeout                    │  │
│  └──────────────────────────────────┬────────────────────────────────────┘  │
│                                     │                                       │
│             ┌───────────────────────┼───────────────────────┐               │
│             ▼                       ▼                       ▼               │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │ Framework Sniffer   │  │ Design Token Engine │  │ API & Endpoint Map  │  │
│  │ (Next, Vite, Nuxt,  │  │ (CSS vars, Colors,  │  │ (REST, GraphQL,     │  │
│  │  Tailwind, Radix)   │  │  Fonts, Radii)      │  │  SaaS Services)     │  │
│  └──────────┬──────────┘  └──────────┬──────────┘  └──────────┬──────────┘  │
│             │                        │                        │             │
│             └────────────────────────┼────────────────────────┘             │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                   SYNTHESIZER & GENERATOR ENGINE                      │  │
│  │   • Synthesizes findings into structured JSON manifest                │  │
│  │   • Generates 'clone_prompt.md' optimized for Cursor/Claude           │  │
│  │   • Renders Cyber-Terminal CLI cards via Chalk/Boxen                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Dependencies & Runtime Specifications
- **Runtime:** Node.js $\ge 18.0.0$ (ESM native).
- **Core Libraries:**
  - `cheerio`: Ultra-fast HTML parsing and DOM querying without heavy headless browser overhead.
  - `chalk`: High-contrast, vibrant terminal colorization (Obsidian, Cyan, Signal Lime).
  - `boxen`: Clean terminal card borders and scannable visual boxes.
  - `ora`: Smooth terminal progress spinners during network scans.
  - `commander`: Ergonomic CLI argument parsing and help menus.
- **Execution Speed Budget:** Complete scan and prompt generation must finish in **$< 8$ seconds** on standard broadband.

---

## 3. Fingerprinting & Heuristic Algorithms

### A. Framework Detection Engine
| Target Framework | Detection Heuristics |
| :--- | :--- |
| **Next.js (App / Pages)** | `__NEXT_DATA__` script tag, `/_next/static/` chunks, `next/font` CSS rules. |
| **Remix / React Router v7**| `window.__remixContext`, `/__remix/` manifests. |
| **Astro** | `astro-island` custom elements, `data-astro-cid` attributes. |
| **Vue / Nuxt** | `__NUXT__` payload, `data-v-` scoped CSS attributes. |
| **Tailwind CSS** | Common utility classes (`flex`, `items-center`, `bg-`, `text-`, `rounded-`) and CSS root custom properties. |
| **shadcn/ui & Radix** | `data-radix-collection-item`, `data-state="open/closed"`, Lucide SVG icon paths. |

### B. Visual Design Token Extraction
1. **Computed Color Palettes**: Scans inline styles and stylesheet link tags for hex (`#000000`), rgb, and hsl variables. Clusters dominant colors into:
   - Background / Canvas
   - Surface / Card Panels
   - Primary Accent / Brand Color
   - Foreground / Headline Text
   - Muted / Secondary Text
2. **Typography Scale**: Extracts Google Fonts / custom WebFont `@import` URLs, `font-family` declarations, and header sizing.
3. **Corner Radius Scale**: Extracts `--radius` or dominant `border-radius` values (e.g. `8px`, `12px`, `16px`).

---

## 4. File Tree Contract
```
repospy/
├── bin/
│   └── repospy.js             # Executable CLI entrypoint (#!/usr/bin/env node)
├── src/
│   ├── analyzer.js            # Core orchestration scanner
│   ├── sniffers/
│   │   ├── frameworks.js      # Tech stack heuristics
│   │   ├── designTokens.js    # Colors, fonts, and CSS variables
│   │   └── endpoints.js       # APIs, GraphQL, and SaaS services
│   ├── generator.js           # Generates clone_prompt.md & JSON
│   └── ui.js                  # Terminal rendering, spinners & styling
├── specs/                     # The 6-Pillar Spec Blueprint
│   ├── 01_PRD.md
│   ├── 02_TRD.md
│   ├── 03_APP_FLOW.md
│   ├── 04_UI_UX.md
│   ├── 05_SCHEMA.md
│   └── 06_IMPLEMENTATION_PLAN.md
├── package.json               # NPM package configuration
├── README.md                  # Viral GitHub README with animated previews
└── LICENSE                    # MIT Open-Source License
```
