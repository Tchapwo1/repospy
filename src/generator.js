import fs from 'fs';
import path from 'path';

export function generateClonePrompt(report, targetDir = process.cwd()) {
  const { target_url, tech_stack, design_tokens, apis_and_services } = report;

  const promptContent = `# 🚀 Clone Architecture Blueprint for ${target_url}
> Generated autonomously by RepoSpy (https://github.com/Tchapwo1/repospy)

You are an expert full-stack design engineer specializing in Next.js, Tailwind CSS, and shadcn/ui.
Scaffold an identical, production-ready frontend architecture cloning the design, layout, and component hierarchy of **${target_url}** using the forensic specifications below.

---

## 1. Primary Tech Stack to Scaffold
- **Framework:** ${tech_stack.framework} (${tech_stack.router})
- **Styling:** ${tech_stack.styling.join(', ')}
- **UI Components:** ${tech_stack.ui_components.join(', ')}
- **Animation:** ${tech_stack.animation}
- **Hosting Target:** ${tech_stack.hosting}

---

## 2. Design System Tokens (Tailwind CSS Configuration)
Add these exact extracted colors and radii to your \`tailwind.config.js\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "${design_tokens.color_palette.background}",
        surface: "${design_tokens.color_palette.surface}",
        accent: "${design_tokens.color_palette.accent}",
        foreground: "${design_tokens.color_palette.foreground}",
        muted: "${design_tokens.color_palette.muted}",
      },
      borderRadius: {
        DEFAULT: "${design_tokens.border_radius}",
        lg: "calc(${design_tokens.border_radius} + 4px)",
        sm: "calc(${design_tokens.border_radius} - 2px)",
      },
      fontFamily: {
        sans: ["${design_tokens.typography.heading_font}"],
      }
    }
  }
}
\`\`\`

---

## 3. Discovered Services & API Architecture
- **Public APIs / Routes:** ${apis_and_services.graphql_endpoints.concat(apis_and_services.rest_endpoints).join(', ') || 'Standard Next.js API Routes'}
- **Integrations:** ${apis_and_services.third_party_saas.concat(apis_and_services.analytics).join(', ') || 'Self-contained'}

---

## 4. Execution Directives for Cursor / Claude
1. Initialize project with \`npx create-next-app@latest clone-app --typescript --tailwind --app\`.
2. Install shadcn primitives: \`npx shadcn@latest init\`.
3. Build the primary landing hero section matching the exact background (\`${design_tokens.color_palette.background}\`) and surface panels (\`${design_tokens.color_palette.surface}\`).
4. Recreate the primary call-to-action button with accent color \`${design_tokens.color_palette.accent}\` and smooth spring hover physics.
`;

  const promptPath = path.join(targetDir, 'clone_prompt.md');
  const jsonPath = path.join(targetDir, 'repospy-report.json');

  fs.writeFileSync(promptPath, promptContent, 'utf-8');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf-8');

  return { promptPath, jsonPath };
}
