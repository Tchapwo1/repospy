import * as cheerio from 'cheerio';
import { detectFrameworks } from './sniffers/frameworks.js';
import { extractDesignTokens } from './sniffers/designTokens.js';
import { detectEndpointsAndServices } from './sniffers/endpoints.js';
import { generateClonePrompt } from './generator.js';

export async function analyzeUrl(rawUrl, options = {}) {
  let targetUrl = rawUrl.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  const startTime = Date.now();

  // 1. Fetch HTML with modern desktop User-Agent
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(targetUrl, {
    signal: controller.signal,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 RepoSpy/1.0',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`Target responded with HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // 2. Extract script bundles for deep code analysis (first 4 scripts)
  const scriptUrls = [];
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.startsWith('data:')) {
      try {
        const fullUrl = new URL(src, targetUrl).href;
        scriptUrls.push(fullUrl);
      } catch (e) {}
    }
  });

  let jsBundlesText = '';
  const candidateScripts = scriptUrls.slice(0, 4);

  await Promise.allSettled(
    candidateScripts.map(async (url) => {
      try {
        const jsRes = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (jsRes.ok) {
          const text = await jsRes.text();
          jsBundlesText += ' ' + text.slice(0, 50000); // sample 50kb per bundle
        }
      } catch (e) {}
    })
  );

  // 3. Run Sniffers
  const tech_stack = detectFrameworks(html, jsBundlesText);
  const design_tokens = extractDesignTokens(html);
  const apis_and_services = detectEndpointsAndServices(html, jsBundlesText);

  const scanDuration = Date.now() - startTime;

  const report = {
    target_url: targetUrl,
    scan_timestamp: new Date().toISOString(),
    scan_duration_ms: scanDuration,
    tech_stack,
    design_tokens,
    apis_and_services,
  };

  const { promptPath, jsonPath } = generateClonePrompt(report, options.targetDir || process.cwd());

  return { report, promptPath, jsonPath };
}
