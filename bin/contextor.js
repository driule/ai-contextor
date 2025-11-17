#!/usr/bin/env node

/**
 * AI Contextor CLI
 * 
 * Entry point for the contextor command
 */

const { Contextor } = require('../src/index.js');
const { DocumentationGenerator } = require('../src/generator.js');

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Handle help command
if (command === '--help' || command === '-h' || command === 'help') {
  const pkg = require('../package.json');
  console.log(`
${pkg.name} v${pkg.version}

${pkg.description}

USAGE:
  contextor [command] [options]

COMMANDS:
  init                    Initialize documentation structure
  check                   Check documentation freshness (default)
  --help, -h              Show this help message
  --version, -v           Show version number

OPTIONS:
  --force, -f             Force check (ignore cache)
  --quiet, -q             Quiet mode (minimal output)

EXAMPLES:
  npx contextor init                    Initialize documentation
  npx contextor                         Check documentation
  npx contextor --force                 Force check
  npx contextor --quiet                 Quiet mode

For more information, visit: ${pkg.homepage}
`);
  process.exit(0);
}

// Handle version command
if (command === '--version' || command === '-v' || command === 'version') {
  const pkg = require('../package.json');
  console.log(pkg.version);
  process.exit(0);
}

// Handle init command
if (command === 'init') {
  async function init() {
    try {
      console.log('🔍 Analyzing project structure...\n');
      
      const generator = new DocumentationGenerator(process.cwd());
      const result = await generator.generate();
      
      console.log('✅ Documentation initialized!\n');
      console.log(`📄 Created: ${result.path}\n`);
      console.log(`📊 Project Type: ${result.analysis.type}`);
      if (result.analysis.frameworks.length > 0) {
        console.log(`🛠️  Frameworks: ${result.analysis.frameworks.join(', ')}`);
      }
      if (result.analysis.languages.length > 0) {
        console.log(`💻 Languages: ${result.analysis.languages.join(', ')}`);
      }
      
      if (result.structureFiles && result.structureFiles.length > 0) {
        const path = require('path');
        const mdFiles = result.structureFiles.filter(f => f.endsWith('.md'));
        const dirs = result.structureFiles.filter(f => !f.endsWith('.md'));
        
        console.log(`\n📁 Created ${mdFiles.length} documentation files`);
        if (dirs.length > 0) {
          console.log(`📂 Created ${dirs.length} directories`);
        }
        
        // Show first 10 files
        const relativeFiles = mdFiles
          .map(f => path.relative(process.cwd(), f))
          .slice(0, 10);
        
        relativeFiles.forEach(file => {
          console.log(`   - ${file}`);
        });
        
        if (mdFiles.length > 10) {
          console.log(`   ... and ${mdFiles.length - 10} more files`);
        }
      }
      
      if (result.skippedFiles && result.skippedFiles.length > 0) {
        const path = require('path');
        const skippedMd = result.skippedFiles.filter(f => f.endsWith('.md'));
        if (skippedMd.length > 0) {
          console.log(`\n⏭️  Skipped ${skippedMd.length} existing files (not overwritten)`);
        }
      }
      
      if (result.initExisted) {
        console.log(`\n⚠️  INIT.md already existed and was overwritten`);
      }
      
      console.log('\n💡 Review and customize .ai/ directory as needed.');
      console.log('📖 See .ai/INIT.md for project context and guidelines.\n');
    } catch (error) {
      console.error('❌ Error:', error.message);
      if (error.stack) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }
  
  init();
} else {
  // Default: run checker
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
}

