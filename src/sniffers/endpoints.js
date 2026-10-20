export function detectEndpointsAndServices(html, jsBundlesText = '') {
  const combined = html + ' ' + jsBundlesText;

  const services = {
    graphql_endpoints: [],
    rest_endpoints: [],
    analytics: [],
    third_party_saas: [],
  };

  // GraphQL Detection
  const gqlMatches = combined.match(/(https?:\/\/[^\s"']+\/graphql)/gi) || [];
  services.graphql_endpoints = [...new Set(gqlMatches)];
  if (services.graphql_endpoints.length === 0 && combined.includes('graphql')) {
    services.graphql_endpoints.push('/api/graphql (Internal)');
  }

  // REST API routes
  const apiMatches = combined.match(/(\/api\/[a-zA-Z0-9_\-\/]+)/g) || [];
  services.rest_endpoints = [...new Set(apiMatches)].slice(0, 5);

  // Analytics
  if (combined.includes('posthog') || combined.includes('app.posthog.com')) {
    services.analytics.push('PostHog Product Analytics');
  }
  if (combined.includes('googletagmanager.com') || combined.includes('google-analytics.com')) {
    services.analytics.push('Google Analytics (GA4)');
  }
  if (combined.includes('segment.com') || combined.includes('cdn.segment.com')) {
    services.analytics.push('Segment CDP');
  }
  if (combined.includes('plausible.io')) {
    services.analytics.push('Plausible Privacy Analytics');
  }

  // Third-Party SaaS Integrations
  if (combined.includes('stripe.com') || combined.includes('js.stripe.com')) {
    services.third_party_saas.push('Stripe Checkout / Payments');
  }
  if (combined.includes('supabase.co')) {
    services.third_party_saas.push('Supabase Database & Auth');
  }
  if (combined.includes('clerk.dev') || combined.includes('clerk.com')) {
    services.third_party_saas.push('Clerk User Authentication');
  }
  if (combined.includes('resend.com')) {
    services.third_party_saas.push('Resend Transactional Email');
  }
  if (combined.includes('intercom.io')) {
    services.third_party_saas.push('Intercom Customer Support');
  }

  return services;
}
