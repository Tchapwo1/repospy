export function detectFrameworks(html, jsBundlesText = '') {
  const stack = {
    framework: 'Vanilla / Custom',
    router: 'Static / Traditional',
    styling: [],
    ui_components: [],
    animation: 'CSS Transitions',
    hosting: 'Unknown / CDN',
  };

  const combined = html + ' ' + jsBundlesText;

  // Framework Detection
  if (html.includes('__NEXT_DATA__') || html.includes('/_next/static') || combined.includes('next/router') || combined.includes('next/navigation')) {
    stack.framework = 'Next.js (React)';
    stack.router = html.includes('/_next/static/chunks/app') ? 'App Router (Server Components)' : 'Pages Router';
  } else if (html.includes('__remixContext') || html.includes('/build/manifest') || combined.includes('remix-run')) {
    stack.framework = 'Remix / React Router v7';
    stack.router = 'Remix Data Router';
  } else if (html.includes('astro-island') || html.includes('data-astro-cid')) {
    stack.framework = 'Astro (Islands Architecture)';
    stack.router = 'Astro File Router';
  } else if (html.includes('__NUXT__') || html.includes('id="__nuxt"') || combined.includes('vue-router')) {
    stack.framework = 'Nuxt / Vue.js';
    stack.router = 'Nuxt Router';
  } else if (html.includes('svelte-') || combined.includes('__svelte')) {
    stack.framework = 'Svelte / SvelteKit';
    stack.router = 'SvelteKit Router';
  } else if (html.includes('id="root"') || html.includes('id="app"') || combined.includes('react.production.min')) {
    stack.framework = 'React.js (SPA / Vite)';
    stack.router = 'Client Router';
  }

  // Styling Detection
  if (
    html.includes('class="') &&
    (html.includes('flex') || html.includes('items-center') || html.includes('justify-between') || html.includes('grid-cols') || html.includes('bg-'))
  ) {
    stack.styling.push('Tailwind CSS');
  }
  if (combined.includes('styled-components') || html.includes('data-styled')) {
    stack.styling.push('Styled Components');
  }
  if (combined.includes('emotion/react') || html.includes('data-emotion')) {
    stack.styling.push('Emotion CSS');
  }
  if (html.includes('--background') || html.includes('--primary') || html.includes(':root {')) {
    stack.styling.push('CSS Custom Properties (Tokens)');
  }
  if (stack.styling.length === 0) {
    stack.styling.push('Custom CSS / Vanilla');
  }

  // UI Primitives
  if (html.includes('data-radix-') || combined.includes('@radix-ui')) {
    stack.ui_components.push('Radix UI');
    stack.ui_components.push('shadcn/ui Pattern');
  }
  if (combined.includes('lucide') || html.includes('lucide-')) {
    stack.ui_components.push('Lucide Icons');
  }
  if (combined.includes('@heroicons') || html.includes('heroicon')) {
    stack.ui_components.push('Heroicons');
  }
  if (combined.includes('@headlessui')) {
    stack.ui_components.push('Headless UI');
  }
  if (stack.ui_components.length === 0) {
    stack.ui_components.push('Custom Handcrafted Components');
  }

  // Animation Engine
  if (combined.includes('framer-motion') || combined.includes('motion/react')) {
    stack.animation = 'Framer Motion (Spring Physics)';
  } else if (combined.includes('gsap') || combined.includes('TweenMax')) {
    stack.animation = 'GSAP (GreenSock)';
  } else if (combined.includes('three.js') || combined.includes('THREE.')) {
    stack.animation = 'Three.js (WebGL 3D)';
  }

  // Hosting / Infrastructure Fingerprint
  if (html.includes('vercel') || combined.includes('_vercel')) {
    stack.hosting = 'Vercel Edge Network';
  } else if (html.includes('cloudflare') || combined.includes('cdnjs.cloudflare.com')) {
    stack.hosting = 'Cloudflare Pages / Workers';
  } else if (html.includes('amplify') || combined.includes('amazonaws.com')) {
    stack.hosting = 'AWS CloudFront / S3';
  } else if (html.includes('netlify')) {
    stack.hosting = 'Netlify Edge';
  }

  return stack;
}
