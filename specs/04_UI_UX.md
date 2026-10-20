# 🖥️ Pillar 4: UI / UX & Output Specifications (UI_UX) — RepoSpy

## 1. Visual Design Philosophy: Cyberpunk Terminal Dopamine

RepoSpy's terminal interface is designed to evoke the atmosphere of an elite hacker terminal—ultra-fast, high-contrast, and deeply satisfying:
* **Background Canvas:** Pure Black / Terminal Dark (`#000000`).
* **Primary Accents:** Signal Lime (`#A3E635`), Electric Cyan (`#38BDF8`), and Hot Magenta (`#F43F5E`).
* **Typography:** Clean monospaced layout with boxen borders, clear dividers, and unicode status indicators.

---

## 2. CLI Terminal Output Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⚡ REPOSPY v1.0.0 — REVERSE-ENGINEER ANY SAAS IN SECONDS                   │
│  Target: https://linear.app  [Scanned in 4.2s]                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🛠️ TECH STACK DETECTED:                                                   │
│  • Framework:      Next.js 15.1 (App Router, Server Components)             │
│  • Styling:        Tailwind CSS + Custom CSS Variables                      │
│  • UI Primitives:  Radix UI + Lucide Icons                                  │
│  • Animations:     Framer Motion (spring physics detected)                  │
│  • Hosting/CDN:    Vercel Edge Network                                      │
│                                                                             │
│  🎨 DESIGN TOKENS EXTRACTED:                                               │
│  • Background:     #08090A (Obsidian Dark)                                  │
│  • Surface:        #12151A (Card Elevation)                                 │
│  • Primary Accent: #5E6AD2 (Electric Purple)                                │
│  • Text Primary:   #F7F8F8 | Text Muted: #8A8F98                            │
│  • Border Radius:  8px (Base) | 12px (Cards)                                │
│  • Typography:     Inter, -apple-system, sans-serif                         │
│                                                                             │
│  🔌 DISCOVERED APIS & SERVICES:                                            │
│  • Public API:     https://api.linear.app/graphql (GraphQL Schema detected) │
│  • Analytics:      PostHog Analytics                                        │
│  • CDN Assets:     https://static.linear.app/assets/                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✨ CLONE PROMPT GENERATED: ./clone_prompt.md                               │
│  👉 Copy and paste into Cursor / Claude to scaffold this frontend now!     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The Generated "Clone-in-Cursor" Master Prompt Format

When `clone_prompt.md` is generated, it contains an engineered specification ready for LLMs:

```markdown
# 🚀 Clone Architecture Blueprint: [Target Website]
You are a senior full-stack design engineer. Scaffold an identical, production-ready frontend for this application using the extracted specifications below.

### 1. Recommended Tech Stack
* **Framework:** Next.js (App Router, TypeScript)
* **Styling:** Tailwind CSS
* **Components:** shadcn/ui (Radix UI primitives)
* **Icons:** Lucide React
* **Motion:** Framer Motion

### 2. Design System Tokens (Tailwind Configuration)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#08090A',
        surface: '#12151A',
        accent: '#5E6AD2',
        foreground: '#F7F8F8',
        muted: '#8A8F98',
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '12px',
      }
    }
  }
}
```

### 3. Layout & Component Architecture
* Header with sticky blur, subtle border (`#1F242D`), and logo mark.
* Hero section featuring dark-mode gradient canvas, bold headline, and interactive terminal card.
* 3-column feature bento-grid with micro-elevations and hover glow effects.
```
