# 📋 Pillar 1: Product Requirements Document (PRD) — RepoSpy

## 1. Executive Summary & Value Proposition
**RepoSpy** is an open-source, viral developer tool and AI agent that reverse-engineers any public website or web application URL in under 10 seconds. It autonomously extracts:
1. **Frontend & Backend Tech Stack**: Frameworks (Next.js, Remix, Astro, Vue), styling libraries (Tailwind, Radix, Framer Motion), hosting (Vercel, Cloudflare, AWS), and runtime libraries.
2. **Design Tokens & UI DNA**: Exact computed color palette (hex/hsl), typography scale (font families, sizes, line heights), border radiuses, and surface elevations.
3. **Public APIs & Network Endpoints**: Discovered GraphQL schemas, REST API routes, third-party CDNs, and tracking scripts.
4. **The "Clone-in-Cursor" Master Prompt (`clone_prompt.md`)**: A ready-to-use, prompt-engineered Markdown blueprint that developers can immediately paste into Cursor, Claude, or Windsurf to scaffold an identical, production-ready frontend architecture without starting from a blank page.

---

## 2. Target Persona & Viral Market Positioning
- **Target Persona**: Indie hackers, frontend engineers, full-stack builders, design engineers, and AI coding enthusiasts (Cursor/Windsurf users).
- **Core Pain Point**: Developers see a stunning, high-converting web app (e.g., Linear, Supabase, Stripe, Perplexity) and spend hours manually inspecting DevTools, guessing font sizes, digging through minified JavaScript chunks, and trying to reconstruct the tech stack.
- **Viral "Cheat Code" Promise**: Instant X-ray vision for any website. Type `npx repospy <url>` and get the complete architectural blueprint and clone prompt in seconds.

---

## 3. Scope & MVP Core Features

### Feature 1: Automated Client-Side Bundle & Script Sniffer
- Fetches HTML, inline scripts, link tags, and referenced JavaScript bundle chunks.
- Identifies framework fingerprints (`__NEXT_DATA__`, React hydration roots, Vite hashes, Webpack chunks, Nuxt payload, Svelte markers).
- Detects UI component libraries (shadcn/ui, Radix UI, Lucide icons, Framer Motion).
- Detects analytics & third-party SaaS tools (PostHog, Segment, Stripe.js, Supabase, Cloudflare Turnstile).

### Feature 2: Visual Design Token Deconstructor
- Extracts CSS Custom Properties (`--primary`, `--background`, `--radius`).
- Identifies the core 5-color aesthetic palette (Background, Surface, Accent, Primary Text, Muted Text).
- Extracts typography hierarchy (Font family, display headings, body font, optical sizes).

### Feature 3: Public API & Endpoint Discovery
- Scans script bundles for public API base URLs, GraphQL query definitions, WebSocket endpoints, and REST routes.
- Maps external CDN assets and image loader domains.

### Feature 4: "Clone-in-Cursor" Prompt Synthesizer
- Synthesizes the extracted findings into a structured `clone_prompt.md` document formatted specifically for modern LLM code generators (Cursor, Claude 3.7 Sonnet, Windsurf).
- Specifies exact Tailwind config, component hierarchy, dependency package list, and page layouts.

### Feature 5: Cyber Terminal CLI & Web Viewer
- **CLI Mode (`npx repospy <url>`)**: Fast, colorized terminal output with neon progress spinners, formatted metric boxes, and zero-configuration execution.
- **Web Export (`--export`)**: Exports structured `repospy-report.json` and `clone_prompt.md`.

---

## 4. Guardrails & Out-of-Scope (Non-Goals)
- **Zero Exploitation / Pure White-Hat**: Strictly analyzes publicly accessible HTML, CSS, JavaScript, and network calls sent to the client browser. No unauthorized penetration testing, credential stuffing, or server-side exploits.
- **No Copyright Infringement**: Generates architectural specifications and functional prompts; does not copy proprietary copyrighted graphics, trademarks, or customer data.
