import chalk from 'chalk';
import boxen from 'boxen';

export function renderResults(report, promptPath) {
  const { target_url, scan_duration_ms, tech_stack, design_tokens, apis_and_services } = report;

  const content = `
${chalk.bold.hex('#A3E635')('⚡ REPOSPY FORENSIC SCAN COMPLETE')}
${chalk.gray('Target:')} ${chalk.bold.white(target_url)}  ${chalk.dim(`[${(scan_duration_ms / 1000).toFixed(2)}s]`)}

${chalk.bold.cyan('🛠️ TECH STACK DETECTED:')}
${chalk.white('• Framework:     ')} ${chalk.hex('#A3E635').bold(tech_stack.framework)} ${chalk.dim(`(${tech_stack.router})`)}
${chalk.white('• Styling:       ')} ${chalk.white(tech_stack.styling.join(', '))}
${chalk.white('• UI Components: ')} ${chalk.white(tech_stack.ui_components.join(', '))}
${chalk.white('• Animation:     ')} ${chalk.white(tech_stack.animation)}
${chalk.white('• Hosting/CDN:   ')} ${chalk.hex('#38BDF8')(tech_stack.hosting)}

${chalk.bold.hex('#F43F5E')('🎨 DESIGN TOKENS EXTRACTED:')}
${chalk.white('• Canvas/Bg:     ')} ${chalk.hex(design_tokens.color_palette.background)('██')} ${chalk.dim(design_tokens.color_palette.background)}
${chalk.white('• Surface Panel: ')} ${chalk.hex(design_tokens.color_palette.surface)('██')} ${chalk.dim(design_tokens.color_palette.surface)}
${chalk.white('• Brand Accent:  ')} ${chalk.hex(design_tokens.color_palette.accent)('██')} ${chalk.bold.hex(design_tokens.color_palette.accent)(design_tokens.color_palette.accent)}
${chalk.white('• Typography:    ')} ${chalk.white(design_tokens.typography.heading_font)}
${chalk.white('• Border Radius: ')} ${chalk.dim(design_tokens.border_radius)}

${chalk.bold.yellow('🔌 DISCOVERED APIS & SERVICES:')}
${chalk.white('• APIs/Routes:   ')} ${chalk.dim(apis_and_services.graphql_endpoints.concat(apis_and_services.rest_endpoints).join(', ') || 'Standard Next.js API Routes')}
${chalk.white('• Services:      ')} ${chalk.dim(apis_and_services.third_party_saas.concat(apis_and_services.analytics).join(', ') || 'No public third-party scripts detected')}

${chalk.dim('─'.repeat(60))}
${chalk.bold.hex('#A3E635')('✨ CLONE PROMPT WRITTEN TO:')} ${chalk.underline.white(promptPath)}
${chalk.dim('👉 Drop clone_prompt.md into Cursor / Claude to scaffold this frontend!')}
`;

  console.log(
    boxen(content.trim(), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: '#A3E635',
      backgroundColor: '#080A0D',
    })
  );
}
