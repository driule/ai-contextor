#!/usr/bin/env node

/**
 * AI Contextor CLI
 * 
 * Entry point for the contextor command
 */

const { Contextor } = require('../src/index.js');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  force: args.includes('--force') || args.includes('-f'),
  quiet: args.includes('--quiet') || args.includes('-q'),
  format: args.includes('--format') ? args[args.indexOf('--format') + 1] : 'console',
};

// Run checker
async function main() {
  try {
    const contextor = new Contextor();
    const result = await contextor.check(options);

    if (result.errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

