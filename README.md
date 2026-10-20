# ⚡ RepoSpy

<div align="center">

```
  ____                      ____  _____  __   __
 |  _ \  ___  _ __    ___  / ___||  __ \ \ \ / /
 | |_) |/ _ \| '_ \  / _ \ \___ \| |__) | \ V / 
 |  _ <|  __/| |_) || (_) | ___) |  ___/   | |  
 |_| \_\\___|| .__/  \___/ |____/|_|       |_|  
             |_|                                
```

**Reverse-engineer any SaaS or website in 10 seconds.**  
*Extracts tech stack, design tokens, public APIs, and generates a prompt to clone it in Cursor.*

[![Live Playground](https://img.shields.io/badge/Live_Playground-vernedaily.xyz%2Fspy-A855F7?style=for-the-badge&logo=cloudflare&logoColor=white)](https://vernedaily.xyz/spy)
[![License: MIT](https://img.shields.io/badge/License-MIT-lime.svg)](https://opensource.org/licenses/MIT)
[![Node: >=18](https://img.shields.io/badge/node->=18.0.0-blue.svg)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Tchapwo1/repospy)

</div>

---

## 🌐 Instant Web Playground (No Terminal Required)

On your phone or browser? Sniff any URL immediately at:  
👉 **[vernedaily.xyz/spy](https://vernedaily.xyz/spy)**

---

## ⚡ What is RepoSpy?

Never start a web project from a blank screen again. 

**RepoSpy** is an open-source CLI that performs a high-speed forensic analysis of any public website or SaaS URL in under 10 seconds:
1. **Tech Stack & Frameworks:** Identifies Next.js (App vs Pages), Remix, Astro, Tailwind CSS, Radix UI, Framer Motion, and hosting providers.
2. **Design Tokens & Palette:** Extracts exact computed canvas colors (`#08090a`), surface cards, brand accent hex codes, typography, and border radiuses.
3. **APIs & Cloud Services:** Discovers public GraphQL endpoints, internal `/api/` routes, PostHog, Stripe, and third-party SaaS integrations.
4. **The "Clone-in-Cursor" Blueprint (`clone_prompt.md`):** Automatically generates a prompt-engineered Markdown file ready to drop directly into **Cursor**, **Claude**, or **Windsurf** to instantly scaffold an identical frontend!

---

## 🚀 Quickstart (Zero Install Required)

Run RepoSpy directly via `npx` on any target website:

```bash
npx repospy https://linear.app
```

Or on other popular apps:
```bash
npx repospy https://stripe.com
npx repospy https://supabase.com
```

### Options:
```bash
# Output raw JSON payload for pipelines
npx repospy https://linear.app --json
```

---

## 🖥️ Live Output Sample

```
╭─────────────────────────────────────────────────────────────────────────────╮
│                                                                             │
│   ⚡ REPOSPY FORENSIC SCAN COMPLETE                                         │
│   Target: https://linear.app  [0.81s]                                       │
│                                                                             │
│   🛠️ TECH STACK DETECTED:                                                   │
│   • Framework:      Next.js (React) (Pages Router)                          │
│   • Styling:        Tailwind CSS, Styled Components                         │
│   • UI Components:  Custom Handcrafted Components                           │
│   • Animation:      CSS Transitions                                         │
│   • Hosting/CDN:    Vercel Edge Network                                     │
│                                                                             │
│   🎨 DESIGN TOKENS EXTRACTED:                                               │
│   • Canvas/Bg:      ██ #08090a                                              │
│   • Surface Panel:  ██ #191d20                                              │
│   • Brand Accent:   ██ #f2c94c                                              │
│   • Typography:     Inter, sans-serif                                       │
│   • Border Radius:  8px                                                     │
│                                                                             │
│   🔌 DISCOVERED APIS & SERVICES:                                            │
│   • APIs/Routes:    /api/og/main, /api/rss/, /api/health/, /api/llms         │
│   • Services:       PostHog Product Analytics, Stripe Payments              │
│                                                                             │
│   ────────────────────────────────────────────────────────────              │
│   ✨ CLONE PROMPT WRITTEN TO: ./clone_prompt.md                             │
│   👉 Drop clone_prompt.md into Cursor / Claude to scaffold this frontend!   │
│                                                                             │
╰─────────────────────────────────────────────────────────────────────────────╯
```

---

## 📋 The 6-Pillar Spec Blueprint

RepoSpy adheres strictly to our enterprise architectural specifications in [`./specs/`](specs/):
* `01_PRD.md`: Scope, features, and zero-exploit white-hat boundaries.
* `02_TRD.md`: Runtime architecture, cheerio/regex heuristics, and bundle fetchers.
* `03_APP_FLOW.md`: Execution state machine and edge-case recovery.
* `04_UI_UX.md`: Terminal styling contracts and Cursor prompt format.
* `05_SCHEMA.md`: `RepoSpyReport.json` specification.
* `06_IMPLEMENTATION_PLAN.md`: Chronological milestone roadmap.

---

## 🤝 Contributing

Contributions, bug reports, and new framework sniffers are warmly welcomed!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewSniffer`)
3. Commit your Changes (`git commit -m 'feat: add SvelteKit sniffer'`)
4. Push to the Branch (`git push origin feature/NewSniffer`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.  
Built by **[Tchapwo1](https://github.com/Tchapwo1)**.
