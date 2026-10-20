export function extractDesignTokens(html) {
  const tokens = {
    color_palette: {
      background: '#090A0F',
      surface: '#12151D',
      accent: '#38BDF8',
      foreground: '#F3F4F6',
      muted: '#9CA3AF',
    },
    typography: {
      primary_font: 'system-ui, -apple-system, sans-serif',
      heading_font: 'Inter, system-ui, sans-serif',
      is_google_font: false,
    },
    border_radius: '8px',
  };

  // 1. Color Extraction via Hex RegEx
  const hexMatches = html.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
  const uniqueHex = [...new Set(hexMatches.map((h) => h.toLowerCase()))];

  if (uniqueHex.length > 0) {
    // Find dark backgrounds
    const darks = uniqueHex.filter((h) => {
      if (h.length === 7) {
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return r < 30 && g < 30 && b < 35;
      }
      return false;
    });

    if (darks.length > 0) tokens.color_palette.background = darks[0];
    if (darks.length > 1) tokens.color_palette.surface = darks[1];

    // Find vibrant accent colors
    const accents = uniqueHex.filter((h) => {
      if (h.length === 7) {
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        const isVibrant = Math.max(r, g, b) > 150 && Math.abs(r - b) > 40;
        return isVibrant;
      }
      return false;
    });

    if (accents.length > 0) tokens.color_palette.accent = accents[0];
  }

  // 2. CSS Custom Properties Extraction
  if (html.includes('--radius:')) {
    const match = html.match(/--radius:\s*([^;}\s]+)/);
    if (match) tokens.border_radius = match[1];
  } else if (html.includes('rounded-2xl')) {
    tokens.border_radius = '16px';
  } else if (html.includes('rounded-xl')) {
    tokens.border_radius = '12px';
  } else if (html.includes('rounded-lg')) {
    tokens.border_radius = '8px';
  }

  // 3. Typography & Google Fonts Extraction
  if (html.includes('fonts.googleapis.com') || html.includes('fonts.gstatic.com')) {
    tokens.typography.is_google_font = true;
    const fontMatch = html.match(/family=([^&:]+)/);
    if (fontMatch) {
      const fontName = decodeURIComponent(fontMatch[1].replace(/\+/g, ' '));
      tokens.typography.heading_font = fontName;
      tokens.typography.primary_font = `${fontName}, sans-serif`;
    }
  } else if (html.includes('Geist') || html.includes('geist')) {
    tokens.typography.heading_font = 'Geist, sans-serif';
    tokens.typography.primary_font = 'Geist Sans, sans-serif';
  } else if (html.includes('Inter') || html.includes('inter')) {
    tokens.typography.heading_font = 'Inter, sans-serif';
    tokens.typography.primary_font = 'Inter, sans-serif';
  }

  return tokens;
}
