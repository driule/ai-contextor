#!/usr/bin/env node

/**
 * AI Contextor CLI
 * 
 * Entry point for the contextor command
 */

const { Contextor } = require('../src/index.js');
const { DocumentationGenerator } = require('../src/generator.js');
const { TaskGenerator } = require('../src/task.js');
const { TaskIntegrator } = require('../src/integrator.js');

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
  contextor [task-list]  Integrate task documentation (e.g., task-0,task-1 or 0,1)

COMMANDS:
  init                    Initialize documentation structure
  init --force            Initialize and overwrite existing INIT.md
  task:new <description>  Create a new development task directory
  <task-list>              Integrate task docs into main documentation
  check                   Check documentation freshness (default)
  --help, -h              Show this help message
  --version, -v           Show version number

OPTIONS:
  --force, -f             Force mode (overwrite INIT.md or ignore cache)
  --quiet, -q             Quiet mode (minimal output)

EXAMPLES:
  npx contextor init                              Initialize documentation
  npx contextor task:new "Add user authentication" Create new task
  npx contextor 0                                 Generate drafts for task-0 (default)
  npx contextor 0 --integrate                     Integrate improved drafts
  npx contextor task-0,task-1                     Generate drafts for multiple tasks
  npx contextor                                   Check documentation
  npx contextor --force                           Force check
  npx contextor --quiet                           Quiet mode

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
      const options = {
        force: args.includes('--force') || args.includes('-f')
      };
      
      console.log('🔍 Analyzing project structure...\n');
      
      const generator = new DocumentationGenerator(process.cwd());
      const result = await generator.generate(options);
      
      console.log('✅ Documentation initialized!\n');
      
      if (result.initSkipped) {
        console.log(`⏭️  INIT.md already exists and was skipped (use --force to overwrite)`);
      } else {
        console.log(`📄 Created: ${result.path}`);
        if (result.initExisted) {
          console.log(`⚠️  INIT.md was overwritten (existing file replaced)`);
        }
      }
      
      console.log(`\n📊 Project Type: ${result.analysis.type}`);
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
      
      console.log('\n💡 Review and customize .ai/ directory as needed.');
      console.log('📖 See .ai/INIT.md for project context and guidelines.');
      if (result.initSkipped) {
        console.log('💡 Use `npx contextor init --force` to regenerate INIT.md.\n');
      } else {
        console.log('');
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      if (error.stack) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }
  
  init();
} else if (command === 'task:new' || command === 'task-new') {
  // Handle task:new command
  async function createTask() {
    try {
      const description = args.slice(1).join(' ').trim();
      
      if (!description || description === '') {
        console.error('❌ Error: Task description is required');
        console.log('\nUsage: contextor task:new "Task description"');
        console.log('Example: contextor task:new "Add user authentication"');
        process.exit(1);
      }

      console.log(`📋 Creating new task: "${description}"\n`);
      
      const taskGen = new TaskGenerator(process.cwd());
      const result = taskGen.createTask(description);
      
      console.log('✅ Task created!\n');
      console.log(`📁 Task Directory: ${result.taskDir.replace(process.cwd() + '/', '')}`);
      console.log(`📝 Task Number: ${result.taskNumber}\n`);
      console.log('📄 Created files:');
      result.files.forEach(file => {
        if (file.endsWith('.md')) {
          console.log(`   - ${file.replace(process.cwd() + '/', '')}`);
        }
      });
      console.log('\n💡 Next steps:');
      console.log('   1. Fill in requirements.md with task requirements');
      console.log('   2. Use notes.md for development notes');
      console.log('   3. Document implementation in implementation.md');
      console.log('   4. Clean up task directory when task is complete\n');
    } catch (error) {
      console.error('❌ Error:', error.message);
      if (error.stack) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }
  
  createTask();
} else {
  // Check if first argument looks like task list (task-0,task-1 or 0,1)
  const firstArg = args[0];
  const isTaskList = firstArg && (
    firstArg.includes(',') || 
    firstArg.startsWith('task-') || 
    /^\d+$/.test(firstArg)
  );

  if (isTaskList && !firstArg.startsWith('--')) {
    // Integrate task documentation
    async function integrateTasks() {
      try {
        const tasks = firstArg.split(',').map(t => t.trim());
        const options = {
          force: args.includes('--force') || args.includes('-f'),
          quiet: args.includes('--quiet') || args.includes('-q'),
          draft: args.includes('--draft') || args.includes('-d'),
          integrate: args.includes('--integrate') || args.includes('-i'),
        };

        const contextor = new Contextor();
        // Load config properly
        const config = contextor.config || {};
        const integrator = new TaskIntegrator(process.cwd(), config);

        if (options.draft || !options.integrate) {
          // Generate drafts by default
          if (!options.quiet) {
            console.log('📝 Generating documentation drafts...\n');
          }
          
          const result = await integrator.integrate(tasks, { draft: true });
          
          if (!options.quiet) {
            if (result.drafts && result.drafts.length > 0) {
              console.log(`✅ Generated ${result.drafts.length} draft files:`);
              result.drafts.forEach(file => {
                console.log(`   - ${file.replace(process.cwd() + '/', '')}`);
              });
              console.log('\n💡 Review and improve drafts, then use --integrate to integrate.');
              console.log('📖 See DOC-INTEGRATION.md in task folder for instructions.\n');
            } else {
              console.log('ℹ️  No drafts generated.\n');
            }
          }
        } else {
          // Integrate directly
          if (!options.quiet) {
            console.log('🔄 Integrating task documentation...\n');
          }
          
          const result = await integrator.integrate(tasks, { draft: false });

          if (!options.quiet) {
            if (result.updated.length > 0) {
              console.log(`✅ Updated ${result.updated.length} documentation files:`);
              result.updated.forEach(file => {
                console.log(`   - ${file.replace(process.cwd() + '/', '')}`);
              });
            }

            if (result.created.length > 0) {
              console.log(`\n📄 Created ${result.created.length} documentation files:`);
              result.created.forEach(file => {
                console.log(`   - ${file.replace(process.cwd() + '/', '')}`);
              });
            }

            if (result.updated.length === 0 && result.created.length === 0) {
              console.log('ℹ️  No documentation updates needed.');
            }

            console.log('\n💡 Review and commit updated documentation.\n');
          }
        }

        // Also run checker to verify everything is up to date
        const checkResult = await contextor.check({ ...options, quiet: true });
        
        if (checkResult.errors > 0 && !options.quiet) {
          console.log('⚠️  Some documentation checks failed. Review the output above.\n');
        }
      } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.stack) {
          console.error(error.stack);
        }
        process.exit(1);
      }
    }

    integrateTasks();
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
}

