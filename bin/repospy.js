#!/usr/bin/env node

import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { analyzeUrl } from '../src/analyzer.js';
import { renderResults } from '../src/ui.js';

const program = new Command();

program
  .name('repospy')
  .description('⚡ Reverse-engineer any SaaS or website into tech stack, design tokens, and a Cursor clone prompt in seconds.')
  .version('1.0.0')
  .argument('[url]', 'Target website or SaaS URL to analyze (e.g. https://linear.app)')
  .option('-j, --json', 'Output raw JSON without terminal boxes')
  .action(async (url, options) => {
    if (!url) {
      console.log(
        chalk.hex('#A3E635')(`
⚡ REPOSPY — Reverse-Engineer any SaaS in seconds.
Usage: npx repospy <target-url>
Example: npx repospy https://linear.app
`)
      );
      process.exit(0);
    }

    const spinner = ora({
      text: chalk.cyan(`Infiltrating & scanning ${chalk.bold.white(url)}...`),
      color: 'green',
    }).start();

    try {
      const { report, promptPath } = await analyzeUrl(url);
      spinner.succeed(chalk.hex('#A3E635')(`Target decompiled in ${(report.scan_duration_ms / 1000).toFixed(2)}s!`));

      if (options.json) {
        console.log(JSON.stringify(report, null, 2));
      } else {
        renderResults(report, promptPath);
      }
    } catch (err) {
      spinner.fail(chalk.red(`Scan failed: ${err.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
